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
    startDate: new Date("2019-01-16"),
    userId: user._id
  };
  session = await sessionRepository.create(validSessionParams);
});

describe('login', () => {
  it('should return status 400, email is missing', async () => {
    const res = await request(app)
      .post(API_URI_LIR + '/session/login')
      .send({password: faker.internet.password()})

    expect(res.status).toEqual(400);
  });
  it('should return status 400, password is missing', async () => {
    const res = await request(app)
      .post(API_URI_LIR + '/session/login')
      .send({email: faker.internet.email()})

    expect(res.status).toEqual(400);
  });
  it('should return status 201, session created successfully', async () => {
    const res = await request(app)
      .post(API_URI_LIR + '/session/login')
      .send({email: user.email,
      password: user.password})

    expect(res.status).toEqual(201);
  });
  it('should return status 401, wrong password', async () => {
    const res = await request(app)
      .post(API_URI_LIR + '/session/login')
      .send({email: user.email,
        password: faker.internet.password()})

    expect(res.status).toEqual(401);
  });
  it('should return status 404, user with given email does not exist', async () => {
    const res = await request(app)
      .post(API_URI_LIR + '/session/login')
      .send({email: faker.internet.email(),
        password: user.password})

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

