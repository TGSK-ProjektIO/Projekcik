import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProduktComponent} from '../produkt.component';

@Component({
  selector: 'app-kategoria-dodanie',
  templateUrl: './kategoria-dodanie.component.html',
  styleUrls: ['./kategoria-dodanie.component.css']
})

export class KategoriaDodanieComponent implements OnInit {

  name = '';
  attribute: Array<Object>;


  modifyPath: string = '';

  constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    redirectToCategoryList() {
      this.modifyPath = "/produkt/kategoria-lista";
      this.router.navigateByUrl(this.modifyPath);
    }

  
    onSavePressed() {
      fetch('http://localhost:3000/api/v1/produkt/category', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": this.name,
        })
      }).then(async response => {
        if (response.status === 201) {
          await this.router.navigateByUrl('/');
        }
        if (response.status === 404) {
        }
      }).catch(err => {
        console.error(err);
      });
    }

}
