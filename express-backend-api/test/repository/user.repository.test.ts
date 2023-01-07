import {UserRepository} from "../../repository/user.repository";
import {TYPES} from "../../config/types.config";
import {container} from "../../config/container.config";
import {User} from "../../model/user";
import {faker} from "@faker-js/faker";
import {ObjectId} from "mongodb";
import {create} from "domain";
import {UserPartial} from "../../model/user.partial";
import {randomBytes} from "crypto";

const userRepository = container.get<UserRepository>(TYPES.UserRepository);

let validUserPartial: UserPartial;

beforeAll(async () => {
  await userRepository.setup();
});

beforeEach(async () => {
  validUserPartial = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    githubToken: null
  };
});

describe('Create user', () => {
  it('Properly creates an user', async () => {
    const createdUser = await userRepository.create(validUserPartial);
    expect(createdUser._id).not.toBeNaN();
  });
  it('Tries to create user with missing username parameter', async () => {
    // @ts-ignore
    await expect(userRepository.create({
      password: faker.internet.password(),
      email: faker.internet.email()
    })).rejects.toEqual("User must have username and email");
  });
  it('Tries to create user with missing email parameter', async () => {
    // @ts-ignore
    await expect(userRepository.create({
      username: faker.internet.userName(),
      password: faker.internet.password()
    })).rejects.toEqual("User must have username and email");
  });
  it('Tries to create user with already existing email', async () => {
    await userRepository.create(validUserPartial);
    await expect(userRepository.create(validUserPartial)).rejects.toEqual("User with this email already exists");
  });
});

describe('Read user', () => {
  it('Properly reads user', async () => {
    let createdUser = await userRepository.create(validUserPartial);
    let readUser = await userRepository.read(createdUser._id.toString());
    expect(readUser).toEqual(createdUser);
  });
  it('Tries to read non existing user', async () => {
    await expect(userRepository.read(new ObjectId().toString())).rejects.toBeUndefined();
  });

  it('Properly reads user by email', async () => {
    const createdUser = await userRepository.create(validUserPartial);
    await expect(userRepository.readByEmail(createdUser.email)).resolves.toEqual(createdUser);
  });
  it('Tries to read user by non existing email', async () => {
    await expect(userRepository.readByEmail("blabla")).rejects.toBeUndefined();
  });
});

describe('Update user ', () => {
  it('Properly updates username', async () => {
    let createdUser = await userRepository.create(validUserPartial);
    createdUser.username = faker.internet.userName();
    await expect(userRepository.update({
      _id: createdUser._id,
      username: createdUser.username
    })).resolves.toBeUndefined();
    await expect(userRepository.read(createdUser._id.toString())).resolves.toEqual(createdUser);
  });
  it('Properly updates password', async () => {
    let createdUser = await userRepository.create(validUserPartial);
    createdUser.password = faker.internet.password();
    await expect(userRepository.update({
      _id: createdUser._id,
      password: createdUser.password
    })).resolves.toBeUndefined();
    await expect(userRepository.read(createdUser._id.toString())).resolves.toEqual(createdUser);
  });
  it('Properly updates email', async () => {
    let createdUser = await userRepository.create(validUserPartial);
    createdUser.email = faker.internet.email();
    await expect(userRepository.update({
      _id: createdUser._id,
      email: createdUser.email
    })).resolves.toBeUndefined();
    await expect(userRepository.read(createdUser._id.toString())).resolves.toEqual(createdUser);
  });
  it('Properly updates emailToken', async () => {
    let createdUser = await userRepository.create(validUserPartial);
    createdUser.emailToken = randomBytes(64).toString('hex');
    await expect(userRepository.update({
      _id: createdUser._id,
      emailToken: createdUser.emailToken
    })).resolves.toBeUndefined();
    await expect(userRepository.read(createdUser._id.toString())).resolves.toEqual(createdUser);
  });
  it('Properly updates isAdministrator', async () => {
    let createdUser = await userRepository.create(validUserPartial);
    createdUser.isAdministrator = true;
    await expect(userRepository.update({
      _id: createdUser._id,
      isAdministrator: createdUser.isAdministrator
    })).resolves.toBeUndefined();
    await expect(userRepository.read(createdUser._id.toString())).resolves.toEqual(createdUser);
  });
  it('Properly updates isEmailVerified', async () => {
    let createdUser = await userRepository.create(validUserPartial);
    createdUser.isEmailVerified = true;
    await expect(userRepository.update({
      _id: createdUser._id,
      isEmailVerified: createdUser.isEmailVerified
    })).resolves.toBeUndefined();
    await expect(userRepository.read(createdUser._id.toString())).resolves.toEqual(createdUser);
  });
  it('Tries to update user with non existing id', async () => {
    await expect(userRepository.update({
      _id: new ObjectId()
    })).rejects.toBeUndefined();
  });
});

describe('Delete user', () => {
  it('Properly deletes user', async () => {
    let createdUser = await userRepository.create(validUserPartial);
    await expect(userRepository.delete(createdUser._id.toString())).resolves.toBeUndefined();
    await expect(userRepository.read(createdUser._id.toString())).rejects.toBeUndefined();
  });
  it('Tries to delete user twice', async () => {
    let createdUser = await userRepository.create(validUserPartial);
    await expect(userRepository.delete(new ObjectId().toString())).rejects.toBeUndefined();
    await expect(userRepository.delete(createdUser._id.toString())).resolves.toBeUndefined();
    await expect(userRepository.delete(createdUser._id.toString())).rejects.toBeUndefined();
  });
});

