import {SessionRepository} from "../repository/session.repository";
import {TYPES} from "../config/types.config";
import {container} from "../config/container.config";
import {Session} from "../model/session";
import {ObjectId} from "mongodb";
const sessionRepository = container.get<SessionRepository>(TYPES.SessionRepository);

let validSession: Session;
let sessionWithId: Session;
let sessionWithWrongDates: Session;

beforeAll(async () => {
  await sessionRepository.setup();
});

beforeEach(async () => {
  validSession = {
    startDate: new Date("2019-01-16"),
    expireDate: new Date("2019-01-17"),
    invalidated: false,
    userId: new ObjectId()
  };

  sessionWithId = {
    _id: new ObjectId(),
    startDate: new Date("2019-01-16"),
    expireDate: new Date("2019-01-17"),
    invalidated: false,
    userId: new ObjectId()
  };

  sessionWithWrongDates = {
    startDate: new Date("2019-01-16"),
    expireDate: new Date("2019-01-15"),
    invalidated: false,
    userId: new ObjectId()
  };
});

test('Create Session positive test', async () => {
  const createdSession = await sessionRepository.create(validSession);
  expect(createdSession._id).not.toBeNaN();
});

test('Create Session with id negative test', async () => {
  await expect(sessionRepository.create(sessionWithId)).rejects.toBeUndefined();
});

test('Create Session with expireDate before startDate negative test', async () => {
  await expect(sessionRepository.create(sessionWithWrongDates)).rejects.toBeUndefined();
})

test('Read Session positive test', async () => {
  let createdSession = await sessionRepository.create(validSession);

  // @ts-ignore
  let readSession = await sessionRepository.read(createdSession._id);
  expect(readSession).toEqual(createdSession);
});

test('Update Session positive test', async () => {
  let createdSession = await sessionRepository.create(validSession);
  createdSession.invalidated = true;
  await expect(sessionRepository.update(createdSession)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(sessionRepository.read(createdSession._id)).resolves.toEqual(createdSession);
});

test('Delete Session positive test', async () => {
  let createdSession = await sessionRepository.create(validSession);
  // @ts-ignore
  await expect(sessionRepository.delete(createdSession._id)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(sessionRepository.read(createdSession._id)).rejects.toBeUndefined();
});

test('Delete Session positive test', async () => {
  let createdSession = await sessionRepository.create(validSession);
  await expect(sessionRepository.delete(new ObjectId().toString())).rejects.toBeUndefined();
  // @ts-ignore
  await expect(sessionRepository.delete(createdSession._id)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(sessionRepository.delete(createdSession._id)).rejects.toBeUndefined();
});


