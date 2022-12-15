import {OpinionRepository} from "../repository/opinion.repository";
import {TYPES} from "../config/types.config";
import {container} from "../config/container.config";
import {Opinion} from "../model/opinion";
import {ObjectId} from "mongodb";

const opinionRepository = container.get<OpinionRepository>(TYPES.OpinionRepository);

let validOpinion: Opinion;
let validOpinionRating: Opinion;
let validOpinionRating2: Opinion;
let validOpinionToDelete: Opinion;
let invalidOpinion: Opinion;

beforeAll(async () => {
  await opinionRepository.setup();
});

beforeEach(async () => {
  validOpinion = {
    userId: "121",
    productId: "2",
    opinionRatings: [{userID: "122", like: 1, dislike: 0}, {userID: "121", like: 1, dislike: 0},
      {userID: "120", like: 1, dislike: 0}, {userID: "121", like: 0, dislike: 1}, {userID: "121", like: 0, dislike: 1}],
    review: {userID: "122", text: "skrrt skiri papa tutu"},
    ratings: [{userID: "152", name: "skrrt", rating: 5}, {userID: "1253", name: "skrrt", rating: 5}]
  };

  validOpinionRating = {
    userId: "128",
    productId: "2",
    opinionRatings: [{userID: "121", like: 0, dislike: 1}],
    review: {userID: "122", text: "skrrt skiri papa tutu"},
    ratings: [{userID: "152", name: "skrrt", rating: 5}, {userID: "1253", name: "skrrt", rating: 5}]
  };

  validOpinionRating2 = {
    userId: "128",
    productId: "2",
    opinionRatings: [{userID: "121", like: 0, dislike: 1}, {userID: "128", like: 1, dislike: 0}],
    review: {userID: "122", text: "skrrt skiri papa tutu"},
    ratings: [{userID: "152", name: "skrrt", rating: 5}, {userID: "1253", name: "skrrt", rating: 5}]
  };

  validOpinionToDelete = {
    userId: "119",
    productId: "2",
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

test('Create And Read Opinion positive test', async () => {
  const opinionRep = await opinionRepository.create(validOpinion);
  expect(opinionRep._id).not.toBeNaN();
  // @ts-ignore
  let readOpinion = await opinionRepository.read(opinionRep._id);
  expect(readOpinion).toEqual(opinionRep);
});

test('Delete Opinion positive test', async () => {
  let opinionRep = await opinionRepository.create(validOpinionToDelete);
  // @ts-ignore
  await expect(opinionRepository.delete(opinionRep._id)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(opinionRepository.read(opinionRep._id)).rejects.toBeUndefined();
});

test('Update opinion positive test', async () => {
  let opinionRep = await opinionRepository.create(validOpinionRating);
  opinionRep.opinionRatings.push({userID: "128", like: 1, dislike: 0});
  // @ts-ignore
  await expect(opinionRepository.update(opinionRep)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(opinionRepository.read(opinionRep._id)).resolves.toEqual(opinionRep);
});
