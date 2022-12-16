import {CategoryRepository} from "../repository/category.repository";
import {TYPES} from "../config/types.config";
import {container} from "../config/container.config";
import {Category} from "../model/category";
import {ObjectId} from "mongodb";
import {faker} from "@faker-js/faker";
import {create} from "domain";

const categoryRepository = container.get<CategoryRepository>(TYPES.CategoryRepository);

let category1: Category;
let category2: Category;
let category3: Category;

beforeAll(async () => {
  await categoryRepository.setup();
});

beforeEach(async () => {
  category1 = {
    name: "mebel",
    attribute: [{wymiary: "example",material: "example"}],
  };

  category2 = {
    _id: new ObjectId(),
    name: "category2",
    attribute: [{at1: "at1", at2: "at2"}],
  };

  category3 = {
    name: "category3",
    attribute: [{at1: "example",at2: "example"}],
  };

});

test('Create Product positive test', async () => {
  const categoryRep = await categoryRepository.create(category1);
  expect(categoryRep._id).not.toBeNaN();
});

test('Create Product negative test', async () => {
  await expect(categoryRepository.create(category2)).rejects.toBeUndefined();
});


test('Get Product positive test', async () => {
  const categoryRep = await categoryRepository.create(category1);
  // @ts-ignore
  let getCategory = await categoryRepository.read(categoryRep._id);
  expect(getCategory).toEqual(categoryRep);
});


jest.setTimeout(10000);
test('Delete Product positive test', async () => {
    const categoryRep = await categoryRepository.create(category3);
  // @ts-ignore
  await expect(categoryRepository.delete(categoryRep._id)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(categoryRepository.read(categoryRep._id)).rejects.toBeUndefined();
});

//dziala?
test('Update Product positive test', async () => {
  let categoryRep = await categoryRepository.create(category3);
  categoryRep.attribute.push({at3: "example"});
  // @ts-ignore
  await expect(categoryRepository.update(categoryRep)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(categoryRepository.read(categoryRep._id)).resolves.toEqual(categoryRep);
});
