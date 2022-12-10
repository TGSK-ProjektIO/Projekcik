import { Component, OnInit } from '@angular/core';
import {ProduktModyfikacjaComponent} from './produkt-modyfikacja/produkt-modyfikacja.component';

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
  modyfikacja : ProduktModyfikacjaComponent = new ProduktModyfikacjaComponent;
  
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
    
    update() {
      this.productId = "productID";
      this.name = this.modyfikacja.name;
      this.category = this.modyfikacja.category;
      this.attributes = "attributes";
      this.description = this.modyfikacja.description;
    }

    getProductName(): string {return this.name}
    getProductDescription(): string {return this.description}
    getProductCategory(): string {return this.category}
    getProductAttributes(): string {return this.attributes}
    setProductName(name: string) {this.name = name}
    setProductDescription(description: string) {this.description = description}
    setProductCategory(category: string) {this.category = category}

}
