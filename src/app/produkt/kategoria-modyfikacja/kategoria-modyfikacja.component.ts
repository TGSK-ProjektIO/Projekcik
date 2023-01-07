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

  category: any;
  path: string = window.location.href;
  lastPath: string = this.path.substring(this.path.lastIndexOf('/') + 1);
  modifyPath: string = '';

  constructor(private router: Router, private service: ProduktService) {
    }

    ngOnInit(): void {
      this.service.getCategory(this.lastPath)
      .subscribe(response => {
        this.category = response;
      });
    }

    redirectToMainPage() {
      this.router.navigateByUrl('/');
    }

    redirectToCategoryList() {
      this.modifyPath = "/produkt/kategoria-lista";
      this.router.navigateByUrl(this.modifyPath);
    }
  
    onModifyPressed() {
      this.category.id = this.lastPath;
      this.category.name = this.name;
      this.service.modifyProduct(this.lastPath, this.category)
      .subscribe(response => {
        this.category = response;
      });

    }


    onSavePressed() {
      this.modifyPath = "http://localhost:3000/api/v1/produkt/category/" + this.lastPath;
      fetch(this.modifyPath, {
        method: 'PUT',
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
          console.log("hi");
        }
      }).catch(err => {
        console.error(err);
      });
    }
}
