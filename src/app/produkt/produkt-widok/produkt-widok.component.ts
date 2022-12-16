import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

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

  constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    redirectToModify() {
      this.router.navigateByUrl('/app-produkt-modyfikacja');
    }

    getProductName(): string {return this.name}
    getProductDescription(): string {return this.description}
    getProductTags(): string {return this.tag}
    getProductCategoryName(): string {return this.categoryName}
    getProductImage(): string {return this.image}

    onSavePressed() {
      console.log("f");
      fetch('http://localhost:3000/api/v1/produkt/product/639ca8f05c9c4496d548877d')
        .then(response => {
          return response.json();
        })
        .then(post=>{
          console.log(post.name);
        })

    }
}
