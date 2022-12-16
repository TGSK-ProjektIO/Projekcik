
import {ProfileRepository} from "../repository/profile.repository";
import {TYPES} from "../config/types.config";
import {container} from "../config/container.config";
import {faker} from "@faker-js/faker";
import {ObjectId} from "mongodb";
import {create} from "domain";
import {Profile} from "../model/profile";
import test from "node:test";

const profileRepository = container.get<ProfileRepository>(TYPES.ProfileRepository);

let validProfile: Profile;

beforeAll(async () => {
  await profileRepository.setup();
});

beforeEach(async () => {
  validProfile = {
    userId: faker.database.mongodbObjectId(),
    nickname: faker.system.filePath(),
    profilePicture: faker.internet.avatar(),
    description: "",
    isBanned: false
  };
});

test('Create Profile positive test', async () => {
  const createdProfile = await profileRepository.create(validProfile);
  expect(createdProfile._id).not.toBeNaN();
});

test('Create Profile negative test', async () => {
   await expect(profileRepository.create(validProfile)).rejects.toBeUndefined();
});

test('Read Profile positive test', async () => {
  let createdProfile = await profileRepository.create(validProfile);

  // @ts-ignore
  let readProfile = await userRepository.read(createdUser._id);
  expect(readProfile).toEqual(createdProfile);
});

test('Read Profile negative test', async () => {
  await expect(profileRepository.read(new ObjectId().toString())).rejects.toBeUndefined();
});

test('Read Profile by userId positive test', async () => {
  let createdProfile = await profileRepository.create(validProfile);

  // @ts-ignore
  let readProfile = await userRepository.readByUserId(createdUser.userId);
  expect(readProfile).toEqual(createdProfile);
});

test('Read Profile by userId negative test', async () => {
  await expect(profileRepository.readByUserId("nullptr")).rejects.toBeUndefined();
});

test('Read Profile by nickname positive test', async () => {
  let createdProfile = await profileRepository.create(validProfile);

  // @ts-ignore
  let readProfile = await userRepository.readByNickname(createdUser.nickname);
  expect(readProfile).toEqual(createdProfile);
});

test('Read Profile by nickname negative test', async () => {
  await expect(profileRepository.readByNickname("nullptr")).rejects.toBeUndefined();
});

test('Update profile positive test', async () => {
  let createdProfile = await profileRepository.create(validProfile);
  createdProfile.nickname = faker.system.filePath();
  await expect(profileRepository.update(createdProfile)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(profileRepository.read(createdProfile._id)).resolves.toEqual(createdProfile);
});

test('Delete profile positive test', async () => {
  let createdProfile = await profileRepository.create(validProfile);
  // @ts-ignore
  await expect(profileRepository.delete(createdUser._id)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(profileRepository.read(createdUser._id)).rejects.toBeUndefined();
});

test('Delete profile negative test', async () => {
  let createdProfile = await profileRepository.create(validProfile);
  await expect(userRepository.delete(new ObjectId().toString())).rejects.toBeUndefined();
  // @ts-ignore
  await expect(userRepository.delete(createdUser._id)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(userRepository.delete(createdUser._id)).rejects.toBeUndefined();
});

//
// test('Create User positive test', async () => {
//   const createdUser = await userRepository.create(validUser);
//   expect(createdUser._id).not.toBeNaN();
// });
//
// test('Create User with id negative test', async () => {
//   await expect(userRepository.create(userWithId)).rejects.toBeUndefined();
// });
//
//
// test('Create User same email negative test', async () => {
//   await userRepository.create(validUser);
//   await expect(userRepository.create(validUser)).rejects.toBeUndefined();
// });
//
// test('Read User positive test', async () => {
//   let createdUser = await userRepository.create(validUser);
//
//   // @ts-ignore
//   let readUser = await userRepository.read(createdUser._id);
//   expect(readUser).toEqual(createdUser);
// });
//
// test('Read User negative test', async () => {
//   await expect(userRepository.read(new ObjectId().toString())).rejects.toBeUndefined();
// });
//
// test('Read user by email positive test', async () => {
//   let createdUser = await userRepository.create(validUser);
//   await expect(userRepository.readByEmail(createdUser.email)).resolves.toEqual(createdUser);
// });
//
// test('Read user by email negative test', async () => {
//   await expect(userRepository.readByEmail("blabla")).rejects.toBeUndefined();
// });
//
// test('Update user positive test', async () => {
//   let createdUser = await userRepository.create(validUser);
//   createdUser.email = faker.internet.email();
//   await expect(userRepository.update(createdUser)).resolves.toBeUndefined();
//   // @ts-ignore
//   await expect(userRepository.read(createdUser._id)).resolves.toEqual(createdUser);
// });
//
// test('Delete user positive test', async () => {
//   let createdUser = await userRepository.create(validUser);
//   // @ts-ignore
//   await expect(userRepository.delete(createdUser._id)).resolves.toBeUndefined();
//   // @ts-ignore
//   await expect(userRepository.read(createdUser._id)).rejects.toBeUndefined();
// });
//
// test('Delete user negative test', async () => {
//   let createdUser = await userRepository.create(validUser);
//   await expect(userRepository.delete(new ObjectId().toString())).rejects.toBeUndefined();
//   // @ts-ignore
//   await expect(userRepository.delete(createdUser._id)).resolves.toBeUndefined();
//   // @ts-ignore
//   await expect(userRepository.delete(createdUser._id)).rejects.toBeUndefined();
// });
