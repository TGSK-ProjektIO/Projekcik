class Category {

    categoryId: string;
    name: string;
    attributes: string;
  
    constructor(categoryId: string, name: string, attributes: string) {
      this.categoryId = categoryId;
      this.name = name;
      this.attributes = attributes;
    }
  
    setName(name: string) {this.name = name;}
    setAttributes(attributes: string) {this.attributes = attributes;}
    getID() {return this.categoryId;}
    getName() {return this.name;}
    getAttributes() {return this.attributes;}

}