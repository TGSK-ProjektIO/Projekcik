import {Product} from "./Product";

export class ProductSearch {
  products: Product[] =  [
    {productId:1, productName:'Telewizor Samsung', tags: ["tv", "42cale"] ,        description: "Genialny telewizor", categoryID: "elektronika",   numberOfOpinions: 3},
    {productId:2, productName:'Odkurzacz Philips', tags: ["odkurzacz", "1400w"] ,  description: "Genialny odkurzacz", categoryID: "elektronika",   numberOfOpinions: 6},
    {productId:3, productName:'Telewizor LG',      tags: ["tv", "32cale"] ,        description: "Genialny telewizor", categoryID: "elektronika",   numberOfOpinions: 12},
    {productId:4, productName:'Mikrofala OK',      tags: ["mikrofala", "800w"] ,   description: "Genialna mikrofala", categoryID: "elektronika",   numberOfOpinions: 1},
    {productId:5, productName:'Lodowka Amica',     tags: ["lodowka", "frost"] ,    description: "Genialna lodowka",   categoryID: "elektronika",   numberOfOpinions: 5},
    {productId:6, productName:'Hamburger',         tags: ["gluten", "mieso"] ,     description: "Pyszny hamburger",   categoryID: "jedzenie",      numberOfOpinions: 30},
    {productId:7, productName:'Chleb',             tags: ["bez glutenu", "mieso"] ,description: "Pyszny chleb",       categoryID: "jedzenie",      numberOfOpinions: 20},
    {productId:8, productName:'Sok jablkowy',      tags: ["cukier", "sok"]               ,description: "Pyszny sok",         categoryID: "napoje",      numberOfOpinions: 60},
    {productId:9, productName:'Tortilla',           tags: ["bez glutenu"]               ,description: "Pyszna tortilla",         categoryID: "jedzenie",      numberOfOpinions: 28},
    {productId:10, productName:'Czekolada',           tags: ["cukier", "orzechy"]               ,description: "Pyszna czekolada",         categoryID: "jedzenie",      numberOfOpinions: 144},
    {productId:10, productName:'Woda',           tags: ["mineralna", "magnez"]               ,description: "Pyszna woda",         categoryID: "napoje",      numberOfOpinions: 88},
    {productId:12, productName:'Ice tea',           tags: ["cukier", "herbata"]               ,description: "Pyszna herbata",         categoryID: "napoje",      numberOfOpinions: 23},

  ];


  getSearchResults(phrase: string): Product[] {
    return this.products.filter(product=>product.productName.toLocaleLowerCase().includes(phrase));
  }
}