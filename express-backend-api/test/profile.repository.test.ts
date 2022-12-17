
import {ProfileRepository} from "../repository/profile.repository";
import {TYPES} from "../config/types.config";
import {container} from "../config/container.config";
import {faker} from "@faker-js/faker";
import {ObjectId} from "mongodb";
import {create} from "domain";
import {Profile} from "../model/profile";

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

test('Read all Profile positive test', async () => {
  let createdProfile = await profileRepository.create(validProfile);

  let readProfile = await profileRepository.readAll();
  expect(readProfile).toContainEqual(createdProfile);
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
  await expect(profileRepository.delete("nullptr")).rejects.toBeUndefined();
  // @ts-ignore
  await expect(profileRepository.delete(createdUser._id)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(profileRepository.delete(createdUser._id)).rejects.toBeUndefined();
});
