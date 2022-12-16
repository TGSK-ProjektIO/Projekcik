import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-produkt-modyfikacja',
  templateUrl: './produkt-modyfikacja.component.html',
  styleUrls: ['./produkt-modyfikacja.component.css']
})

export class ProduktModyfikacjaComponent implements OnInit {

  name = '';
  description = '';
  tag = '';
  categoryName = '';
  image = '';

  constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    redirectToMainPage() {
      this.router.navigateByUrl('/');
    }
  
    onSavePressed() {
      fetch('http://localhost:3000//api/v1/produkt/product/:id', {
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
