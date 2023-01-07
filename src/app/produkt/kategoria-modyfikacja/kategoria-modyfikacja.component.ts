import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ProduktService } from '../services/produkt.service';
import { Category } from 'express-backend-api/model/category';

@Component({
  selector: 'app-kategoria-modyfikacja',
  templateUrl: './kategoria-modyfikacja.component.html',
  styleUrls: ['./kategoria-modyfikacja.component.css']
})

export class KategoriaModyfikacjaComponent implements OnInit {

  _id = '';
  name = '';
  description = '';
  tag = '';
  categoryName = '';
  image = '';

  product: any;
  path: string = window.location.href;
  lastPath: string = this.path.substring(this.path.lastIndexOf('/') + 1);
  modifyPath: string = '';

  constructor(private router: Router, private service: ProduktService) {
    }

    ngOnInit(): void {
      this.service.getProduct(this.lastPath)
      .subscribe(response => {
        this.product = response;
      });
    }

    redirectToMainPage() {
      this.router.navigateByUrl('/');
    }

    redirectToProductList() {
      this.modifyPath = "/produkt/produkt-lista";
      this.router.navigateByUrl(this.modifyPath);
    }
  
    onModifyPressed() {
      this.product.id = this.lastPath;
      this.product.name = this.name;
      this.product.description = this.description;
      this.product.categoryName = this.categoryName;
      this.product.tag = this.tag;
      this.product.image = this.image;
      this.service.modifyProduct(this.lastPath, this.product)
      .subscribe(response => {
        this.product = response;
      });

    }


    onSavePressed() {
      this.modifyPath = "http://localhost:3000/api/v1/produkt/product/" + this.lastPath;
      fetch(this.modifyPath, {
        method: 'PUT',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": this.name,
          "description": this.description,
          "categoryName": this.categoryName,
          "tag": this.tag,
          "image": this.image
        })
      }).then(async response => {
        if (response.status === 201) {
          await this.router.navigateByUrl('/');
        }
        if (response.status === 404) {
          console.log("hi");
        }
      }).catch(err => {
        console.error(err);
      });
    }
}
