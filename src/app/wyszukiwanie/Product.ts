export class Product {
  constructor(
    public productId: number,
    public productName: string,
    public description: string,
    public tags: Array<string>,
    public categoryID: number,
    public numberOfOpinions: number
  ) { }
}
