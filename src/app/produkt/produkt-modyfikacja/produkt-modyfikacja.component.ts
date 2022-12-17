import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produkt-modyfikacja',
  templateUrl: './produkt-modyfikacja.component.html',
  styleUrls: ['./produkt-modyfikacja.component.css']
})

export class ProduktModyfikacjaComponent implements OnInit {

  product: any;
  id: string = '';
  error: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
      this.product = {};
      this.id = this.route.snapshot.paramMap.get('id') || '';
      this.getProduct();
    }

    redirectToMainPage() {
      this.router.navigateByUrl('/');
    }
  
    async onSavePressed() {
      try {
        const options = {
          method: 'PUT',
          body: JSON.stringify(this.product),
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(`/api/v1/produkt/product/${this.id}`, options);
        if (response.status === 200) {
          //...
        } else {
          this.error = 'Error updating product';
        }
      } catch (e) {
        this.error = 'An error occurred';
      }
    }

    async getProduct() {
      try {
        const options = {
          method: 'GET',
          body: JSON.stringify(this.product),
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(`/api/v1/produkt/product/${this.id}`, options);
        if (response.status === 200) {
          this.product = await response.json();
        } else {
          this.error = 'Error updating product';
        }
      } catch (e) {
        this.error = 'An error occurred';
      }
    }
}
