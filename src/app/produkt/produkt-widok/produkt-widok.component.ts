import { Component, OnInit } from '@angular/core';
import {ProduktModyfikacjaComponent} from '../produkt-modyfikacja/produkt-modyfikacja.component';

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
  modyfikacja : ProduktModyfikacjaComponent = new ProduktModyfikacjaComponent;
  
  constructor() {
      this.productId = "productID";
      this.name = "biurko";
      this.category = "meble";
      this.attributes = "wymiar: 160x80cm, materiał: drewno";
      this.description = "drewniane biurko";
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
      this.description = this.modyfikacja.description;;
    }
    
    getProductName(): string {return this.name}
    getProductDescription(): string {return this.description}
    getProductCategory(): string {return this.category}
    getProductAttributes(): string {return this.attributes}
    setProductName(name: string) {this.name = name}
    setProductDescription(description: string) {this.description = description}
    setProductCategory(category: string) {this.category = category}
    
}
