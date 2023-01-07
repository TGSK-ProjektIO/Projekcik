import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProduktService } from '../services/produkt.service';
import {PageType} from "../../opinie/opinie.component";

@Component({
  selector: 'app-kategoria-widok',
  templateUrl: './kategoria-widok.component.html',
  styleUrls: ['./kategoria-widok.component.css']
})
export class KategoriaWidokComponent implements OnInit {

  pageTypes: PageType = PageType.product;
  id: string = '';
  name = 'name';

  path: string = window.location.href;
  lastPath: string = this.path.substring(this.path.lastIndexOf('/') + 1);
  category: any;
  modifyPath: string = '';
  constructor(private router: Router, private service: ProduktService) {
    }

    ngOnInit(): void {
      this.service.getCategory(this.lastPath)
        .subscribe(response => {
          this.category = response;
        });
    }

    redirectToModify() {
      this.modifyPath = "/produkt/kategoria-modyfikacja/" + this.lastPath;
      this.router.navigateByUrl(this.modifyPath);
    }



    deleteCategory() {
      this.service.deleteCategory(this.lastPath)
      .subscribe(response => {
        this.category = response;
      });
    }

    getCategoryName(): string {return this.category.name}
}