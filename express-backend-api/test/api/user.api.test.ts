import request from "supertest";
import {UserPartial} from "../../model/user.partial";
import {faker} from "@faker-js/faker";
import {container} from "../../config/container.config";
import {UserRepository} from "../../repository/user.repository";
import {TYPES} from "../../config/types.config";
import app from "../../app";
import {API_URI_LIR} from "../../config/api.config";
import {User} from "../../model/user";
import {randomBytes} from "crypto";
import {ObjectId} from "mongodb";

const userRepository = container.get<UserRepository>(TYPES.UserRepository);

let validUserPartial: UserPartial;

beforeEach(async () => {
  validUserPartial = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    githubToken: null
  };
});

describe('Get user', () => {
  it('Should get created user', async () => {
    const createdUser: any = await userRepository.create(validUserPartial);
    createdUser._id = createdUser._id.toString();
    const response = await request(app)
      .get(`${API_URI_LIR}/user/` + createdUser._id.toString());
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(createdUser);
  });

  it('Should not find user', async () => {
    const response = await request(app)
      .get(`${API_URI_LIR}/user/AS2d32j4397827`);
    expect(response.status).toEqual(404);
  });

  it('Should comply about not giving id param', async () => {
    const response = await request(app)
      .get(`${API_URI_LIR}/user/`);
    expect(response.status).toEqual(404);
  });
});

describe('Register User', () => {
  it('Should register user properly and retrieve it after registration', async () => {
    const response = await request(app)
      .post(`${API_URI_LIR}/user`)
      .send(validUserPartial);
    expect(response.status).toEqual(201);
    expect(response.body).toBeDefined();
    expect(response.body.message).toEqual('created');
    expect(response.body._id).toBeDefined();

    const secondResponse = await request(app)
      .get(`${API_URI_LIR}/user/` + response.body._id);
    expect(secondResponse.status).toEqual(200);
    expect(secondResponse.body._id).toEqual(response.body._id);
  });
  it('Should comply when trying to create user with same email', async () => {
    const response = await request(app)
      .post(`${API_URI_LIR}/user`)
      .send(validUserPartial);
    expect(response.status).toEqual(201);

   const userWithSameEmail = {
     username: faker.internet.userName(),
     password: faker.internet.password(),
     email: response.body.email
   };
    const secondResponse = await request(app)
      .post(`${API_URI_LIR}/user`)
      .send(userWithSameEmail);
    expect(secondResponse.status).toEqual(400);
  });

  it('Should comply about missing username param', async () => {
    const response = await request(app)
      .post(`${API_URI_LIR}/user`)
      .send({
        password: faker.internet.password(),
        email: faker.internet.email()
      });
    expect(response.status).toEqual(400);
  });
  it('Should comply about missing email param', async () => {
    const response = await request(app)
      .post(`${API_URI_LIR}/user`)
      .send({
        username: faker.internet.userName(),
        password: faker.internet.password(),
      });
    expect(response.status).toEqual(400);
  });
});

describe('Confirm email', () => {
  let unconfirmedUser: User;
  beforeEach(async () => {
    unconfirmedUser = await userRepository.create(validUserPartial);
  });

  it('Properly confirms email', async () => {
    const response = await request(app)
      .put(`${API_URI_LIR}/user/confirm-email`)
      .send({
        userId: unconfirmedUser._id.toString(),
        emailToken: unconfirmedUser.emailToken
      });
    expect(response.status).toEqual(200);

    const secondResponse = await request(app)
      .get(`${API_URI_LIR}/user/` + unconfirmedUser._id);
    expect(secondResponse.status).toEqual(200);
    expect(secondResponse.body.isEmailVerified).toBeTruthy();
  });
  it('Tries to confirm email for non existing user', async () => {
    const response = await request(app)
      .put(`${API_URI_LIR}/user/confirm-email`)
      .send({
        userId: new ObjectId().toString(),
        emailToken: randomBytes(64).toString('hex')
      });
    expect(response.status).toEqual(404);
  });
  it('Tries to confirm email with invalid email token', async () => {
    const response = await request(app)
      .put(`${API_URI_LIR}/user/confirm-email`)
      .send({
        userId: unconfirmedUser._id.toString(),
        emailToken: randomBytes(64).toString('hex')
      });
    expect(response.status).toEqual(400);
  });

  it('Tries to confirm email without userId parameter', async () => {
    const response = await request(app)
      .put(`${API_URI_LIR}/user/confirm-email`)
      .send({
        emailToken: randomBytes(64).toString('hex')
      })
    expect(response.status).toEqual(400);
  });
  it('Tries to confirm email without emailToken parameter', async () => {
    const response = await request(app)
      .put(`${API_URI_LIR}/user/confirm-email`)
      .send({
        userId: new ObjectId().toString()
      })
    expect(response.status).toEqual(400);
  });
});
describe('Send reset password email', () => {
  let unconfirmedUser: User;
  let confirmedUser: User;
  let validUserPartial: UserPartial;
  let validUser2Partial: UserPartial;

  beforeEach(async () => {
    validUserPartial = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      githubToken: null
    };
    validUser2Partial = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      githubToken: null
    };
    unconfirmedUser = await userRepository.create(validUserPartial);
    confirmedUser = await userRepository.create(validUser2Partial);
    confirmedUser.isEmailVerified = true;
    await userRepository.update(confirmedUser);
  });

  it('Properly tries to reset password', async () => {
    const response = await request(app)
      .get(`${API_URI_LIR}/user/send-reset-password-email/${confirmedUser.email}`);
    console.log(confirmedUser.isEmailVerified);
    expect(response.status).toEqual(200);
  });
  it('Tries to reset password on unconfirmed account', async () => {
    const response = await request(app)
      .get(`${API_URI_LIR}/user/send-reset-password-email/${unconfirmedUser.email}`);
    expect(response.status).toEqual(403);
  });
  it('Tries to reset password for non registered email', async () => {
    const response = await request(app)
      .get(`${API_URI_LIR}/user/send-reset-password-email/unknown@email.com`);
    expect(response.status).toEqual(404);
  });
});
