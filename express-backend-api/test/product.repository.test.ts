import {ProductRepository} from "../repository/product.repository";
import {TYPES} from "../config/types.config";
import {container} from "../config/container.config";
import {Product} from "../model/product";
import {ObjectId} from "mongodb";
import {faker} from "@faker-js/faker";
import {create} from "domain";

const productRepository = container.get<ProductRepository>(TYPES.ProductRepository);

let product1: Product;
let product2: Product;
let product3: Product;

beforeAll(async () => {
  await productRepository.setup();
});

beforeEach(async () => {
  product1 = {
    name: "product1Name",
    description: "this product is a ...",
    tag: ["a","b"],
    categoryId: "12",
    attribute: [{categoryId: "12",name: "name1",value: "value1"}],
    isVisible: true
  };

  product2 = {
    _id: new ObjectId(),
    name: "product2Name",
    description: "this product is a ...",
    tag: ["a","b"],
    categoryId: "12",
    attribute: [{categoryId: "12",name: "name1",value: "value1"}],
    isVisible: true
  };

  product3 = {
    name: "product3",
    description: "this product is a ...",
    tag: ["a","b"],
    categoryId: "12",
    attribute: [{categoryId: "12",name: "name1",value: "value1"}],
    isVisible: true
  };

});

test('Create Product positive test', async () => {
  const productRep = await productRepository.create(product1);
  expect(productRep._id).not.toBeNaN();
});

test('Create Product negative test', async () => {
  await expect(productRepository.create(product2)).rejects.toBeUndefined();
});


test('Get Product positive test', async () => {
  const productRep = await productRepository.create(product1);
  // @ts-ignore
  let getProduct = await productRepository.read(productRep._id);
  expect(getProduct).toEqual(productRep);
});


jest.setTimeout(10000);
test('Delete Product positive test', async () => {
    const productRep = await productRepository.create(product3);
  // @ts-ignore
  await expect(productRepository.delete(productRep._id)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(productRepository.read(productRep._id)).rejects.toBeUndefined();
});

//dziala?
test('Update Product positive test', async () => {
  let productRep = await productRepository.create(product3);
  productRep.description = "description hahahaha";
  // @ts-ignore
  await expect(productRepository.update(productRep)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(productRepository.read(productRep._id)).resolves.toEqual(productRep);
});
