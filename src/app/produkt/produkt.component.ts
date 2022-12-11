import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-produkt',
  templateUrl: './produkt.component.html',
  styleUrls: ['./produkt.component.css']
})

export class ProduktComponent implements OnInit {

  productId: string;
  name: string;
  description: string;
  category: string;
  attributes: string;
  
  constructor() {
      this.productId = "productID";
      this.name = "name";
      this.category = "category";
      this.attributes = "attributes";
      this.description = "description";
    }

    ngOnInit(): void {
    }

    onClick() {
      window.alert("Clicked")
    }

    getProductName(): string {return this.name}
    getProductDescription(): string {return this.description}
    getProductCategory(): string {return this.category}
    getProductAttributes(): string {return this.attributes}
    setProductName(name: string) {this.name = name}
    setProductDescription(description: string) {this.description = description}
    setProductCategory(category: string) {this.category = category}

}
