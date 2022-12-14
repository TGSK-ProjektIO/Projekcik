import {OpinionRepository} from "../repository/opinion.repository";
import {TYPES} from "../config/types.config";
import {container} from "../config/container.config";
import {Opinion} from "../model/opinion";
import {ObjectId} from "mongodb";

const opinionRepository = container.get<OpinionRepository>(TYPES.OpinionRepository);

let validOpinion: Opinion;
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
