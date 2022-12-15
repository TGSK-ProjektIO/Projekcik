import {SessionRepository} from "../../repository/session.repository";
import {TYPES} from "../../config/types.config";
import {container} from "../../config/container.config";
import {ObjectId} from "mongodb";
import {SessionPartial} from "../../model/session.partial";
import moment from "moment";
import {SESSION_DURATION} from "../../config/session.config";
import {faker} from "@faker-js/faker";
import {UserPartial} from "../../model/user.partial";
import {UserRepository} from "../../repository/user.repository";

const userRepository = container.get<UserRepository>(TYPES.UserRepository);
const sessionRepository = container.get<SessionRepository>(TYPES.SessionRepository);

let validUserPartial: UserPartial;
let validSessionParams: SessionPartial;

beforeAll(async () => {
  await sessionRepository.setup();
});

beforeEach(async () => {
  validUserPartial = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email()
  };
  const createdUser = await userRepository.create(validUserPartial);
  validSessionParams = {
    startDate: new Date("2019-01-16"),
    userId: createdUser._id
  };
});

test('Create Session positive test', async () => {
  const createdSession = await sessionRepository.create(validSessionParams);

  expect(createdSession._id).not.toBeNaN();
  expect(createdSession.startDate).toEqual(validSessionParams.startDate);
  expect(createdSession.expireDate).not.toBeNaN();
  expect(createdSession.expireDate)
    .toEqual(moment(createdSession.startDate)
      .add(SESSION_DURATION, 'm').toDate())
  expect(createdSession.invalidated).toBeFalsy();
  expect(createdSession.userId).toEqual(validSessionParams.userId);
});

test('Create session non existing user negative test', async () => {
  validSessionParams.userId = new ObjectId();
  await expect(sessionRepository.create(validSessionParams)).rejects.toBeUndefined();
});

test('Read Session positive test', async () => {
  const createdSession = await sessionRepository.create(validSessionParams);
  const readSession = await sessionRepository.read(createdSession._id.toString());

  expect(readSession).toEqual(createdSession);
});

test('Read Session non existing id negative test', async () => {
  await expect(sessionRepository.read('')).rejects.toBeUndefined();
  await expect(sessionRepository.read('123123')).rejects.toBeUndefined();
  await expect(sessionRepository.read('03473432')).rejects.toBeUndefined();
  await expect(sessionRepository.read('378412374293')).rejects.toBeUndefined();
  await expect(sessionRepository.read(new ObjectId().toString())).rejects.toBeUndefined();
});

test('Update session positive test', async () => {
  const createdSession = await sessionRepository.create(validSessionParams);
  const updatedSession: any = {
    _id: createdSession._id,
    startDate: moment(createdSession.startDate).add(-1, 'm').toDate(),
    expireDate: moment(createdSession.expireDate).add(1, 'm').toDate(),
    invalidated: true
  };
  await expect(sessionRepository.update(updatedSession)).resolves.toBeUndefined();
  const readSession = await sessionRepository.read(updatedSession._id.toString());
  updatedSession.userId = readSession.userId;

  expect(readSession).toEqual(updatedSession);
});

test('Update session startDate positive test', async () => {
  const createdSession = await sessionRepository.create(validSessionParams);
  const newDate = moment(createdSession.startDate).add(-1, 'm').toDate();
  await expect(sessionRepository.update({
    _id: createdSession._id,
    startDate: newDate
  })).resolves.toBeUndefined();
  createdSession.startDate = newDate;

  await expect(sessionRepository.read(createdSession._id.toString())).resolves.toEqual(createdSession);
});

test('Update session expireDate positive test', async () => {
  const createdSession = await sessionRepository.create(validSessionParams);
  const newExpireDate = new Date();
  await expect(sessionRepository.update({
    _id: createdSession._id,
    expireDate: newExpireDate
  })).resolves.toBeUndefined();
  createdSession.expireDate = newExpireDate;

  await expect(sessionRepository.read(createdSession._id.toString())).resolves.toEqual(createdSession);
});

test('Update session invalidated positive test', async () => {
  const createdSession = await sessionRepository.create(validSessionParams);
  await expect(sessionRepository.update({
    _id: createdSession._id,
    invalidated: true
  })).resolves.toBeUndefined();
  createdSession.invalidated = true;

  await expect(sessionRepository.read(createdSession._id.toString())).resolves.toEqual(createdSession);

  await expect(sessionRepository.update({
    _id: createdSession._id,
    invalidated: false
  })).resolves.toBeUndefined();
  createdSession.invalidated = false;

  await expect(sessionRepository.read(createdSession._id.toString())).resolves.toEqual(createdSession);
});

test('Update session start date after expire date negative test', async () => {
  const createdSession = await sessionRepository.create(validSessionParams);
  await expect(sessionRepository.update({
    _id: createdSession._id,
    startDate: moment(createdSession.expireDate).add(1, 'm').toDate()
  })).rejects.toBeUndefined();
});

test('Update session expire date before start date negative test', async () => {
  const createdSession = await sessionRepository.create(validSessionParams);
  await expect(sessionRepository.update({
    _id: createdSession._id,
    expireDate: moment(createdSession.startDate).add(-1, 'm').toDate()
  })).rejects.toBeUndefined();
});

test('Update session userId negative test', async () => {
  const createdSession = await sessionRepository.create(validSessionParams);
  await expect(sessionRepository.update({
    _id: createdSession._id,
    userId: createdSession.userId
  })).rejects.toBeUndefined();
});

test('Delete session positive test', async () => {
  const createdSession = await sessionRepository.create(validSessionParams);
  await expect(sessionRepository.delete(createdSession._id.toString())).resolves.toBeUndefined();
  await expect(sessionRepository.read(createdSession._id.toString())).rejects.toBeUndefined();
});

test('Delete session non existing id negative test', async () => {
  await expect(sessionRepository.delete(new ObjectId().toString())).rejects.toBeUndefined();
});

test('Delete session already deleted record negative test', async () => {
  const createdSession = await sessionRepository.create(validSessionParams);
  await expect(sessionRepository.delete(createdSession._id.toString())).resolves.toBeUndefined();
  await expect(sessionRepository.delete(createdSession._id.toString())).rejects.toBeUndefined();
});
