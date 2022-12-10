import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produkt-widok',
  templateUrl: './produkt-widok.component.html',
  styleUrls: ['./produkt-widok.component.css']
})

export class ProduktWidokComponent implements OnInit {

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
      this.description = "lalala ksiazka ta";
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
