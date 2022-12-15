import request from "supertest";
import {UserPartial} from "../model/user.partial";
import {faker} from "@faker-js/faker";
import {container} from "../config/container.config";
import {UserRepository} from "../repository/user.repository";
import {TYPES} from "../config/types.config";
import app from "../app";

const userRepository = container.get<UserRepository>(TYPES.UserRepository);

let validUserPartial: UserPartial;

beforeEach(async () => {
  validUserPartial = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email()
  };
});

describe('Get user', () => {
  it('Should get created user', async () => {
    const createdUser = await userRepository.create(validUserPartial);
    const response = await request(app)
      .get('/api/v1/logowanie-i-rejestracja/user/' + createdUser._id.toString());

    expect(response.status).toEqual(200);
  });
});
