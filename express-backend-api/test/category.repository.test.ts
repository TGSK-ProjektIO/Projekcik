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
    attribute: ["wymiary", "material"]
  };

  category2 = {
    name: "category2",
    attribute: ["at1", "at2"],
  };

  category3 = {
    name: "category3",
    attribute: ["example", "example"]
  };

});

test('Create Category positive test', async () => {
  const createdCategory = await categoryRepository.create(category1);
  expect(createdCategory.name).not.toBeNaN();
});

test('Create Category negative test', async () => {
  await expect(categoryRepository.create(category2)).rejects.toBeUndefined();
});


test('Get Category positive test', async () => {
  const createdCategory = await categoryRepository.create(category1);
  // @ts-ignore
  let getCategory = await categoryRepository.read(createdCategory.name);
  expect(getCategory).toEqual(createdCategory);
});


jest.setTimeout(10000);
test('Delete Category positive test', async () => {
    const createdCategory = await categoryRepository.create(category3);
  // @ts-ignore
  await expect(categoryRepository.delete(createdCategory.name)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(categoryRepository.read(createdCategory.name)).rejects.toBeUndefined();
});

//dziala?
test('Update Category positive test', async () => {
  let createdCategory = await categoryRepository.create(category3);
  createdCategory.attribute.push("example");
  // @ts-ignore
  await expect(categoryRepository.update(createdCategory)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(categoryRepository.read(createdCategory.name)).resolves.toEqual(createdCategory);
});

test('Get Categories positive test', async () => {
  await categoryRepository.deleteAll();
  await categoryRepository.create(category1);
  await categoryRepository.create(category3);
  let getCategories = await categoryRepository.readAll();
  await expect(getCategories.length).toEqual(2);
});