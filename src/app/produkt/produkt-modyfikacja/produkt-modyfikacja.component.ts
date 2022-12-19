import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Product} from "../../../../express-backend-api/model/product";

@Component({
  selector: 'app-produkt-modyfikacja',
  templateUrl: './produkt-modyfikacja.component.html',
  styleUrls: ['./produkt-modyfikacja.component.css']
})

export class ProduktModyfikacjaComponent implements OnInit {
  _id = '';
  name = '';
  description = '';
  tag: string[];
  categoryName = '';
  image = '';
  product!: Product;
  productId!: number;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.productId = +params['id'];
    });

    fetch(`http://localhost:3000/api/v1/produkt/product/${this.productId}`, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
    }).then(async response => {
      this.product = await response.json();
    }).catch(err => {
      console.error(err);
    });
  }

  redirectToMainPage() {
    this.router.navigateByUrl('/');
  }

  redirectToProductList() {
    this.router.navigateByUrl("/produkt/produkt-lista");
  }

  onModifyPressed() {
    this.product.name = this.name;
    this.product.description = this.description;
    this.product.categoryName = this.categoryName;
    this.product.tag = this.tag;
    this.product.image = this.image;

    fetch(`http://localhost:3000/api/v1/produkt/product/${this.productId}`, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.product)
    }).then(async response => {
      this.product = await response.json();
    }).catch(err => {
      console.error(err);
    });
  }
}
