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
let product4: Product;
let product5: Product;

beforeAll(async () => {
  await productRepository.setup();
});

beforeEach(async () => {
  product1 = {
    name: "p1",
    description: "this product is a ...",
    tag: ["a","b"],
    categoryName: "12",
    attribute: [{name: "name1",value: "value1"}],
    image: "a",
    isVisible: true
  };

  product2 = {
    _id: new ObjectId(),
    name: "p2",
    description: "this product is a ...",
    tag: ["a","b"],
    categoryName: "12",
    attribute: [{name: "name1",value: "value1"}],
    image: "a",
    isVisible: true
  };

  product3 = {
    name: "p3",
    description: "this product is a ...",
    tag: ["a","b"],
    categoryName: "12",
    attribute: [{name: "name1",value: "value1"}],
    image: "a",
    isVisible: true
  };

  product4 = {
    name: "p4",
    description: "this product is a ...",
    tag: ["a","b", "c","d"],
    categoryName: "12",
    attribute: [{name: "name1",value: "value1"}],
    image: "a",
    isVisible: true
  };

  product5 = {
    name: "p5",
    description: "this product is a ...",
    tag: ["a","b", "c","d"],
    categoryName: "12",
    attribute: [{name: "name1",value: "value1"}],
    image: "a",
    isVisible: true
  };

});

test('Create Product positive test', async () => {
  const createdProduct = await productRepository.create(product1);
  expect(createdProduct._id).not.toBeNaN();
});

test('Create Product negative test', async () => {
  await expect(productRepository.create(product2)).rejects.toBeUndefined();
});


test('Get Product positive test', async () => {
  const createdProduct = await productRepository.create(product3);
  // @ts-ignore
  let getProduct = await productRepository.read(createdProduct._id);
  expect(getProduct).toEqual(createdProduct);
});


jest.setTimeout(10000);
test('Delete Product positive test', async () => {
    const createdProduct = await productRepository.create(product4);
  // @ts-ignore
  await expect(productRepository.delete(createdProduct._id)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(productRepository.read(createdProduct._id)).rejects.toBeUndefined();
});

//dziala?
test('Update Product positive test', async () => {
  let createdProduct = await productRepository.create(product5);
  createdProduct.description = "description hahahaha";
  // @ts-ignore
  await expect(productRepository.update(createdProduct)).resolves.toBeUndefined();
  // @ts-ignore
  await expect(productRepository.read(createdProduct._id)).resolves.toEqual(createdProduct);
});

test('Get Products positive test', async () => {
  await productRepository.deleteAll();
  await productRepository.create(product1);
  await productRepository.create(product3);
  await productRepository.create(product4);
  let getProducts = await productRepository.readAll();
  await expect(getProducts.length).toEqual(3);
});