import {AfterViewInit, Component, Injectable, NgModule, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Product} from "../../../express-backend-api/model/product";
import {ProductSearch} from "./wyszukaj-produkt-lub-profil/ProductSearch";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {Profile} from "../../../express-backend-api/model/profile";
import {ProfileSearch} from "./wyszukaj-produkt-lub-profil/ProfileSearch";
import {WyszukiwanieService} from "./services/wyszukiwanie.service";
import {Router} from "@angular/router";

@Injectable()
export class PolishPaginatorIntl extends MatPaginatorIntl{
  constructor(){
    super();
    this.nextPageLabel = 'Następna strona';
    this.previousPageLabel = 'Poprzednia strona';
    this.itemsPerPageLabel = 'Produkty na stronie';
    this.lastPageLabel = 'Ostatnia strona';
    this.firstPageLabel = 'Pierwsza strona';
  }
}
@Component({
  selector: 'app-wyszukiwanie',
  templateUrl: './wyszukiwanie.component.html',
  styleUrls: ['./wyszukiwanie.component.css']
})
export class WyszukiwanieComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
