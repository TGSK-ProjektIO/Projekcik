import {OpinionRepository} from "../repository/opinion.repository";
import {TYPES} from "../config/types.config";
import {container} from "../config/container.config";
import {Opinion} from "../model/opinion";
import {ObjectId} from "mongodb";
import {faker} from "@faker-js/faker";

const opinionRepository = container.get<OpinionRepository>(TYPES.OpinionRepository);

let validOpinion: Opinion;
let invalidOpinion: Opinion;

beforeAll(async () => {
  await opinionRepository.setup();
});

beforeEach(async () => {
  validOpinion = {
    userId: faker.datatype.number().toString(),
    productId: faker.datatype.number().toString(),
    opinionRatings: [{userID: "122", like: 1, dislike: 0}, {userID: "121", like: 1, dislike: 0},
      {userID: "120", like: 1, dislike: 0}, {userID: "121", like: 0, dislike: 1}, {userID: "121", like: 0, dislike: 1}],
    review: {userID: "122", text: "skrrt skiri papa tutu"},
    ratings: [{userID: "152", name: "skrrt", rating: 5}, {userID: "1253", name: "skrrt", rating: 5}]
  };

  invalidOpinion = {
    _id: new ObjectId(),
    userId: "123",
    productId: "1",
    opinionRatings: [{userID: "122", like: 1, dislike: 0}, {userID: "121", like: 1, dislike: 0},
      {userID: "120", like: 1, dislike: 0}, {userID: "121", like: 0, dislike: 1}, {userID: "121", like: 0, dislike: 1}],
    review: {userID: "123", text: "skrrt skiri papa tutu"},
    ratings: [{userID: "123", name: "skrrt", rating: 5}, {userID: "123", name: "skrrt", rating: 5}]
  };
});

test('Create Opinion positive test', async () => {
  const opinionRep = await opinionRepository.create(validOpinion);
  expect(opinionRep._id).not.toBeNaN();
});

test('Create Opinion negative test', async () => {
  await expect(opinionRepository.create(invalidOpinion)).rejects.toBeUndefined();
});

test('Read Opinion positive test', async () => {
  const opinionRep = await opinionRepository.create(validOpinion);
  // @ts-ignore
  let readOpinion = await opinionRepository.read(opinionRep._id);
  expect(readOpinion).toEqual(opinionRep);
});

test('Read Opinion for productID = 2', async () => {
  // @ts-ignore
  let readOpinion = await opinionRepository.readByProduct("2");
  expect(readOpinion).toHaveLength(2);
});

test('Delete Opinion positive test', async () => {
  let opinionRep = await opinionRepository.create(validOpinion);
  // @ts-ignore
  await expect(opinionRepository.delete(opinionRep._id)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(opinionRepository.read(opinionRep._id)).rejects.toBeUndefined();
});

test('Update Opinion positive test', async () => {
  let opinionRep = await opinionRepository.create(validOpinion);
  opinionRep.opinionRatings.push({userID: "128", like: 1, dislike: 0});
  // @ts-ignore
  await expect(opinionRepository.update(opinionRep)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(opinionRepository.read(opinionRep._id)).resolves.toEqual(opinionRep);
});
