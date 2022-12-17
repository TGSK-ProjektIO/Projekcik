import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProduktService } from '../services/produkt.service';


@Component({
  selector: 'app-produkt-lista',
  templateUrl: './produkt-lista.component.html',
  styleUrls: ['./produkt-lista.component.css']
})
export class ProduktListaComponent implements OnInit {

  id: string = '';
  name = 'name';
  description = 'description';
  tag = 'tag1, tag2';
  categoryName = 'drzewo';
  image = 'https://images.obi.pl/product/PL/415x415/679553_1.jpg';

  path: string = window.location.href;
  lastPath: string = this.path.substring(this.path.lastIndexOf('/') + 1);
  products: any;
  modifyPath: string = '';

  constructor(private router: Router, private service: ProduktService) {
    }

    ngOnInit(): void {
      this.service.getProducts()
        .subscribe(response => {
          this.products = response;
        });
    }

    redirectToModify() {
      this.modifyPath = "/produkt/produkt-modyfikacja/" + this.lastPath;
      this.router.navigateByUrl(this.modifyPath);
    }

    redirectToWidok(id: string) {
      this.modifyPath = "/produkt/produkt-widok/" + id;
      this.router.navigateByUrl(this.modifyPath);
    }

    redirectToDodanie() {
      this.modifyPath = "/produkt/produkt-dodanie";
      this.router.navigateByUrl(this.modifyPath);
    }

    deleteProduct() {

    }

    getProductName(): string {return this.name}
    getProductDescription(): string {return this.description}
    getProductTags(): string {return this.tag}
    getProductCategoryName(): string {return this.categoryName}
    getProductImage(): string {return this.image}

}
