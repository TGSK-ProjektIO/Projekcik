import {UserRepository} from "../../repository/user.repository";
import {TYPES} from "../../config/types.config";
import {container} from "../../config/container.config";
import {User} from "../../model/user";
import {faker} from "@faker-js/faker";
import {ObjectId} from "mongodb";
import {create} from "domain";
import {UserPartial} from "../../model/user.partial";

const userRepository = container.get<UserRepository>(TYPES.UserRepository);

let validUserParams: UserPartial;

beforeAll(async () => {
  await userRepository.setup();
});

beforeEach(async () => {
  validUserParams = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email()
  };
});

test('Create User positive test', async () => {
  const createdUser = await userRepository.create(validUserParams);
  expect(createdUser._id).not.toBeNaN();
});


test('Create User same email negative test', async () => {
  await userRepository.create(validUserParams);
  await expect(userRepository.create(validUserParams)).rejects.toBeUndefined();
});

test('Read User positive test', async () => {
  let createdUser = await userRepository.create(validUserParams);

  let readUser = await userRepository.read(createdUser._id.toString());
  expect(readUser).toEqual(createdUser);
});

test('Read User negative test', async () => {
  await expect(userRepository.read(new ObjectId().toString())).rejects.toBeUndefined();
});

test('Read user by email positive test', async () => {
  const createdUser = await userRepository.create(validUserParams);
  await expect(userRepository.readByEmail(createdUser.email)).resolves.toEqual(createdUser);
});

test('Read user by email negative test', async () => {
  await expect(userRepository.readByEmail("blabla")).rejects.toBeUndefined();
});

test('Update user positive test', async () => {
  let createdUser = await userRepository.create(validUserParams);
  createdUser.email = faker.internet.email();
  await expect(userRepository.update(createdUser)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(userRepository.read(createdUser._id)).resolves.toEqual(createdUser);
});

test('Delete user positive test', async () => {
  let createdUser = await userRepository.create(validUserParams);
  // @ts-ignore
  await expect(userRepository.delete(createdUser._id)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(userRepository.read(createdUser._id)).rejects.toBeUndefined();
});

test('Delete user negative test', async () => {
  let createdUser = await userRepository.create(validUserParams);
  await expect(userRepository.delete(new ObjectId().toString())).rejects.toBeUndefined();
  // @ts-ignore
  await expect(userRepository.delete(createdUser._id)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(userRepository.delete(createdUser._id)).rejects.toBeUndefined();
});
