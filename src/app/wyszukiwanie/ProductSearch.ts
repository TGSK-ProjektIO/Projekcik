import {Product} from "./Product";

export class ProductSearch {
  products: Product[] =  [
    {productId:1, productName:'Telewizor Samsung', description: "Genialny telewizor", tags: ["tv", "42cale"] , categoryID:1, numberOfOpinions: 3},
    {productId:2, productName:'Odkurzacz Philips', description: "Genialny odkurzacz", tags: ["odkurzacz", "1400w"] , categoryID:2, numberOfOpinions: 6},
    {productId:3, productName:'Telewizor LG', description: "Genialny telewizor", tags: ["tv", "32cale"] , categoryID:1, numberOfOpinions: 12},
    {productId:4, productName:'Mikrofala OK', description: "Genialna mikrofala", tags: ["mikrofala", "800w"] , categoryID:3, numberOfOpinions: 1},
    {productId:5, productName:'Lodowka Amica', description: "Genialna lodowka", tags: ["lodowka", "frost"] , categoryID:4, numberOfOpinions: 5},
    {productId:6, productName:'Hamburger', description: "Pyszny hamburger", tags: ["gluten", "mieso"] , categoryID:5, numberOfOpinions: 30}
  ];


  getSearchResults(phrase: string): Product[] {
    return this.products.filter(product=>product.productName.toLocaleLowerCase().includes(phrase));
  }
}
