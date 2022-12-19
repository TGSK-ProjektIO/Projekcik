import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Product} from "../../../../express-backend-api/model/product";

@Component({
  selector: 'app-produkt-lista',
  templateUrl: './produkt-lista.component.html',
  styleUrls: ['./produkt-lista.component.css']
})
export class ProduktListaComponent implements OnInit {

  id: string = '';
  name = '';
  description = '';
  tag = ['', ''];
  categoryName = '';
  image = 'https://images.obi.pl/product/PL/415x415/679553_1.jpg';

  products: Product[];

  constructor(private router: Router) {}

    ngOnInit(): void {
      fetch(`http://localhost:3000/api/v1/produkt/product/getAllProducts`, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
      }).then(async response => {
        this.products = await response.json();
      }).catch(err => {
        console.error(err);
      });
    }

    redirectToModify() {
      this.router.navigateByUrl("/produkt/produkt-modyfikacja/" );
    }

    redirectToWidok(id: string) {
      this.router.navigate(['/produkt/produkt-widok/', id]);
    }

    redirectToDodanie() {
      this.router.navigateByUrl("/produkt/produkt-dodanie");
    }

    getProductName(): string {return this.name}
    getProductDescription(): string {return this.description}
    getProductTags(): string[] {return this.tag}
    getProductCategoryName(): string {return this.categoryName}
    getProductImage(): string {return this.image}
}
