import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProduktService } from '../services/produkt.service';


@Component({
  selector: 'app-kategoria-lista',
  templateUrl: './kategoria-lista.component.html',
  styleUrls: ['./kategoria-lista.component.css']
})
export class KategoriaListaComponent implements OnInit {

  id: string = '';

  path: string = window.location.href;
  lastPath: string = this.path.substring(this.path.lastIndexOf('/') + 1);
  categories: any;
  modifyPath: string = '';

  constructor(private router: Router, private service: ProduktService) {
    }

    ngOnInit(): void {
      this.service.getCategories()
        .subscribe(response => {
          this.categories = response;
        });
    }

    redirectToModify() {
      this.modifyPath = "/produkt/kategoria-modyfikacja/" + this.lastPath;
      this.router.navigateByUrl(this.modifyPath);
    }

    redirectToWidok(name: string) {
      this.modifyPath = "/produkt/kategoria-widok/" + name;
      this.router.navigateByUrl(this.modifyPath);
    }

    redirectToDodanie() {
      this.modifyPath = "/produkt/kategoria-dodanie";
      this.router.navigateByUrl(this.modifyPath);
    }

    deleteProduct() {

    }


}
