import {container} from "../../config/container.config";
import {TYPES} from "../../config/types.config";
import request from "supertest";
import {API_URI_LIR} from "../../config/api.config"
import {faker} from "@faker-js/faker";
import app from "../../app";
import {UserPartial} from "../../model/user.partial";
import {UserRepository} from "../../repository/user.repository";
import {User} from "../../model/user";
import {SessionPartial} from "../../model/session.partial";
import {Session} from "../../model/session";
import {SessionRepository} from "../../repository/session.repository";
import {expect} from "@jest/globals";

const userRepository = container.get<UserRepository>(TYPES.UserRepository);
const sessionRepository = container.get<SessionRepository>(TYPES.SessionRepository);

let validUserPartial: UserPartial;
let user : User
let validSessionParams: SessionPartial;
let session : Session

beforeAll(async () => {
  await userRepository.setup();
});

beforeEach(async () => {
  validUserPartial = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email()
  };
  user = await userRepository.create(validUserPartial);
  validSessionParams = {
    startDate: new Date(),
    userId: user._id
  };
  session = await sessionRepository.create(validSessionParams);
});

describe('login', () => {
  it('Tries to login without email parameter', async () => {
    const res = await request(app)
      .post(API_URI_LIR + '/session/login')
      .send({password: faker.internet.password()})

    expect(res.status).toEqual(400);
  });
  it('Tries to login without password parameter', async () => {
    const res = await request(app)
      .post(API_URI_LIR + '/session/login')
      .send({email: faker.internet.email()})

    expect(res.status).toEqual(400);
  });
  it('Properly tries to login', async () => {
    const confirmEmailResponse = await request(app)
      .put(`${API_URI_LIR}/user/confirm-email`)
      .send({
        userId: user._id.toString(),
        emailToken: user.emailToken
      });
    expect(confirmEmailResponse.status).toEqual(200);
    const res = await request(app)
      .post(API_URI_LIR + '/session/login')
      .send({email: user.email,
      password: validUserPartial.password})

    expect(res.status).toEqual(201);
  });
  it('Tries to login with incorrect password', async () => {
    const confirmEmailResponse = await request(app)
      .put(`${API_URI_LIR}/user/confirm-email`)
      .send({
        userId: user._id.toString(),
        emailToken: user.emailToken
      });
    expect(confirmEmailResponse.status).toEqual(200);
    const res = await request(app)
      .post(API_URI_LIR + '/session/login')
      .send({email: user.email,
        password: faker.internet.password()})

    expect(res.status).toEqual(401);
  });
  it('Tries to login to account with no email confirmed', async () => {
    const res = await request(app)
      .post(API_URI_LIR + '/session/login')
      .send({
        email: user.email,
        password: validUserPartial.password
      });
    expect(res.status).toEqual(401);
  });
  it('Tries to login for non existing email', async () => {
    const res = await request(app)
      .post(API_URI_LIR + '/session/login')
      .send({
        email: faker.internet.email(),
        password: validUserPartial.password
      });
    expect(res.status).toEqual(404);
  });
});

describe('Logout', () => {
  it('Properly invalidate session', async () => {
    const res = await request(app)
      .get(API_URI_LIR + '/session/' + session._id.toString() + '/logout')

    expect(res.status).toEqual(200);

    const secondResponse = await request(app)
      .get(`${API_URI_LIR}/session/` + session._id.toString());
    expect(secondResponse.status).toEqual(200);
    expect(secondResponse.body.invalidated).toBeTruthy();
  });
  it('Tries to logout from non existing session', async () => {
    const res = await request(app)
      .get(API_URI_LIR + '/session/nieistnieje/logout')

    expect(res.status).toEqual(404);
  });
  it('Tries to logout from already invalidated session', async () => {
    const response = await request(app)
      .get(API_URI_LIR + '/session/' + session._id.toString() + '/logout')
    expect(response.status).toEqual(200);

    const secondResponse = await request(app)
      .get(API_URI_LIR + '/session/' + session._id.toString() + '/logout')
    expect(secondResponse.status).toEqual(400);
  });
});

describe('Has expired', () => {
  it('Properly tries to retrieve information about not expired session', async () => {
    const response = await request(app)
      .get(`${API_URI_LIR}/session/${session._id.toString()}/has-expired`);
    expect(response.status).toEqual(200);
    expect(response.body.expired).toBeFalsy();
  });
  it('Properly tries to retrieve info about expired session', async () => {
    await sessionRepository.update({
      _id: session._id,
      expireDate: new Date()
    });
    const response = await request(app)
      .get(`${API_URI_LIR}/session/${session._id.toString()}/has-expired`);
    expect(response.status).toEqual(200);
    expect(response.body.expired).toBeTruthy();
  });
  it('Properly tries to retrieve info about invalidated session', async () => {
    await request(app).get(API_URI_LIR + '/session/' + session._id.toString() + '/logout')
    const response = await request(app)
      .get(`${API_URI_LIR}/session/${session._id.toString()}/has-expired`);
    expect(response.status).toEqual(200);
    expect(response.body.expired).toBeFalsy();
  });
});

describe('Change password', () => {
  it('Properly tries to change password', async () => {
    const newPassword = faker.internet.password();
    const oldPassword = (await userRepository.read(session.userId.toString())).password;
    const response = await request(app)
      .put(`${API_URI_LIR}/session/${session._id.toString()}/change-password`)
      .send({newPassword: newPassword});
    expect(response.status).toEqual(200);
    const modifiedUser = await userRepository.read(session.userId.toString());
    expect(modifiedUser.password).not.toEqual(newPassword);
    expect(modifiedUser.password).not.toEqual(oldPassword);
  });
  it('Tries to change password for non existing session', async () => {
    const oldPassword = (await userRepository.read(session.userId.toString())).password;
    const response = await request(app)
      .put(`${API_URI_LIR}/session/nonexisting/change-password`)
      .send({newPassword: faker.internet.password()});
    expect(response.status).toEqual(404);
    const modifiedUser = await userRepository.read(session.userId.toString());
    expect(modifiedUser.password).toEqual(oldPassword);
  });
});

describe('getSession', () => {
  it('should return status 400, invalid id', async () => {
    const res = await request(app)
      .get(API_URI_LIR + '/session/invalid_id')
    expect(res.status).toEqual(404);
  });
  it('should return status 200, session returned successfully', async () => {
    const res = await request(app)
      .get(API_URI_LIR + '/session/' + session._id.toString())
    expect(res.status).toEqual(200);
  });
});
