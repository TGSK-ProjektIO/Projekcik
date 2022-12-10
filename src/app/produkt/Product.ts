class Product {

    productId: string;
    name: string;
    description: string = "";
    tag: string ="";
    category: string;
    attributes: string;
    isVisible: boolean = true;
  
    constructor(productId: string, name: string, category: string, attributes: string) {
      this.productId = productId;
      this.name = name;
      this.category = category;
      this.attributes = attributes;
    }
  
    setName(name: string) {this.name = name;}
    setDescription(description: string) {this.description = description;}
    setTag(tag: string) {this.tag = tag;}
    setCategory(category: string) {this.category = category;}
    setAttributes(attributes: string) {this.attributes = attributes;}
    getID() {return this.productId;}
    getName() {return this.name;}
    getDescription() {return this.description;}
    getTag() {return this.tag;}
    getCategory() {return this.category;}
    getAttributes() {return this.attributes;}
}