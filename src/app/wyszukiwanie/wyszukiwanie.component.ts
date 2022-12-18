import {Component, Injectable, OnInit} from '@angular/core';
import {MatPaginatorIntl} from "@angular/material/paginator";

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
