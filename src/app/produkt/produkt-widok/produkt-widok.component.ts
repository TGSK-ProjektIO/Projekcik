import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PageType} from "../../opinie/opinie.component";
import {Product} from "../../../../express-backend-api/model/product";

@Component({
  selector: 'app-produkt-widok',
  templateUrl: './produkt-widok.component.html',
  styleUrls: ['./produkt-widok.component.css']
})

export class ProduktWidokComponent implements OnInit {

  pageTypes: PageType = PageType.product;
  product: Product = {} as Product;
  productId: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
        this.productId = params['id'];
        console.log(this.productId);
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

    redirectToModify() {
      this.router.navigate(["/produkt/produkt-modyfikacja", this.productId]);
    }

    deleteProduct() {
      fetch(`http://localhost:3000/api/v1/produkt/product/${this.productId}`, {
        method: 'DELETE',
      }).catch(err => {
        console.error(err);
      });
    }

}
