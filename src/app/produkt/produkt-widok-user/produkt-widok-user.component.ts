import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProduktService } from '../services/produkt.service';
import {PageType} from "../../opinie/opinie.component";

@Component({
  selector: 'app-produkt-widok-user',
  templateUrl: './produkt-widok-user.component.html',
  styleUrls: ['./produkt-widok-user.component.css']
})
export class ProduktWidokUserComponent implements OnInit {

  pageTypes: PageType = PageType.product;
  id: string = '';
  name = 'name';
  description = 'description';
  tag = 'tag1, tag2';
  categoryName = 'drzewo';
  image = 'https://images.obi.pl/product/PL/415x415/679553_1.jpg';

  path: string = window.location.href;
  lastPath: string = this.path.substring(this.path.lastIndexOf('/') + 1);
  product: any;
  modifyPath: string = '';
  constructor(private router: Router, private service: ProduktService) {
    }

    ngOnInit(): void {
      this.service.getProduct(this.lastPath)
        .subscribe(response => {
          this.product = response;
        });
    }

  
    getProductName(): string {return this.product.name}
    getProductDescription(): string {return this.product.description}
    getProductTags(): string {return this.product.tag}
    getProductCategoryName(): string {return this.product.categoryName}
    getProductImage(): string {return this.product.image}

}
