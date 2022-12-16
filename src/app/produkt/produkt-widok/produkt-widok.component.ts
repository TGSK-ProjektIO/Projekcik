import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProduktService } from '../services/produkt.service';


@Component({
  selector: 'app-produkt-widok',
  templateUrl: './produkt-widok.component.html',
  styleUrls: ['./produkt-widok.component.css']
})
export class ProduktWidokComponent implements OnInit {

  name = 'name';
  description = 'description';
  tag = 'tag1, tag2';
  categoryName = 'drzewo';
  image = 'https://images.obi.pl/product/PL/415x415/679553_1.jpg';

  product: any;

  private url: string = 'http://localhost:3000/api/v1/produkt/product/639ca9855ad5f7175f21f600';

  constructor(private router: Router, private service: ProduktService) {
    }

    ngOnInit(): void {
      this.service.getProduct()
        .subscribe(response => {
          this.product = response;
        });
    }

    redirectToModify() {
      this.router.navigateByUrl('/produkt-modyfikacja');
    }



    getProductName(): string {return this.product.name}
    getProductDescription(): string {return this.product.description}
    getProductTags(): string {return this.product.tag}
    getProductCategoryName(): string {return this.product.categoryName}
    getProductImage(): string {return this.product.image}


    onSavePressed() {
      console.log("jajajaja");
    }
}
