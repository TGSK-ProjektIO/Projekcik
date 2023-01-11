import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ProduktService } from '../services/produkt.service';
import { Product } from 'express-backend-api/model/product';
import { Category } from 'express-backend-api/model/category';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-produkt-modyfikacja',
  templateUrl: './produkt-modyfikacja.component.html',
  styleUrls: ['./produkt-modyfikacja.component.css']
})

export class ProduktModyfikacjaComponent implements OnInit {

  _id = '';
  name = '';
  description = '';
  tag = '';
  category: Category;
  image = '';

  product: any;
  path: string = window.location.href;
  lastPath: string = this.path.substring(this.path.lastIndexOf('/') + 1);
  modifyPath: string = '';
  categories : Array<Category>;
  attributes : any;

  constructor(private router: Router, private service: ProduktService) {
    }

    ngOnInit(): void {
      this.service.getCategories()
        .subscribe(categories=> {
          this.categories = categories as Category[];
        });
/*
      this.service.getCategory()
      .subscribe(attributes => this.attributes = )*/
      this.service.getProduct(this.lastPath)
      .subscribe(response => {
        this.product = response;
        this.name = this.product.name;
        this.description = this.product.description;
        this.tag = this.product.tag;
        this.service.getCategory(this.product.categoryName)
        .subscribe((category : any)=> {
          this.category = category;
        });
        /*
        this.category = this.categories.find((obj: any) => {
          return obj.name === this.product.categoryName;
        })!*/
        this.image = this.product.image;
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
      this.product.categoryName = this.category.name;
      this.product.tag = this.tag;
      this.product.image = this.image;
      this.service.modifyProduct(this.lastPath, this.product)
      .subscribe(response => {
        this.product = response;
      });

    }
}
