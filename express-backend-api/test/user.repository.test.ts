import {UserRepository} from "../repository/user.repository";
import {TYPES} from "../config/types.config";
import {container} from "../config/container.config";
import {User} from "../model/user";
import {faker} from "@faker-js/faker";
import {ObjectId} from "mongodb";
import {create} from "domain";

const userRepository = container.get<UserRepository>(TYPES.UserRepository);

let validUser: User;
let userWithId: User;

beforeAll(async () => {
  await userRepository.setup();
});

beforeEach(async () => {
  validUser = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    emailToken: 'emailToken',
    isAdministrator: false,
    isEmailVerified: false
  };
  userWithId = {
    _id: new ObjectId(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    emailToken: 'emailToken',
    isAdministrator: false,
    isEmailVerified: false
  };
});

test('Create User positive test', async () => {
  const createdUser = await userRepository.create(validUser);
  expect(createdUser._id).not.toBeNaN();
});

test('Create User with id negative test', async () => {
  await expect(userRepository.create(userWithId)).rejects.toBeUndefined();
});


test('Create User same email negative test', async () => {
  await userRepository.create(validUser);
  await expect(userRepository.create(validUser)).rejects.toBeUndefined();
});

test('Read User positive test', async () => {
  let createdUser = await userRepository.create(validUser);

  // @ts-ignore
  let readUser = await userRepository.read(createdUser._id);
  expect(readUser).toEqual(createdUser);
});

test('Read User negative test', async () => {
  await expect(userRepository.read(new ObjectId().toString())).rejects.toBeUndefined();
});

test('Read user by email positive test', async () => {
  let createdUser = await userRepository.create(validUser);
  await expect(userRepository.readByEmail(createdUser.email)).resolves.toEqual(createdUser);
});

test('Read user by email negative test', async () => {
  await expect(userRepository.readByEmail("blabla")).rejects.toBeUndefined();
});

test('Update user positive test', async () => {
  let createdUser = await userRepository.create(validUser);
  createdUser.email = faker.internet.email();
  await expect(userRepository.update(createdUser)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(userRepository.read(createdUser._id)).resolves.toEqual(createdUser);
});

test('Delete user positive test', async () => {
  let createdUser = await userRepository.create(validUser);
  // @ts-ignore
  await expect(userRepository.delete(createdUser._id)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(userRepository.read(createdUser._id)).rejects.toBeUndefined();
});

test('Delete user negative test', async () => {
  let createdUser = await userRepository.create(validUser);
  await expect(userRepository.delete(new ObjectId().toString())).rejects.toBeUndefined();
  // @ts-ignore
  await expect(userRepository.delete(createdUser._id)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(userRepository.delete(createdUser._id)).rejects.toBeUndefined();
});
