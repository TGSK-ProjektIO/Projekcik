import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Product} from "./Product";
import {ProductSearch} from "./ProductSearch";

@Component({
  selector: 'app-wyszukiwanie',
  templateUrl: './wyszukiwanie.component.html',
  styleUrls: ['./wyszukiwanie.component.css']
})
export class WyszukiwanieComponent implements OnInit {

  productModel = new Product(0,"", "",[],0,0);
  productSearch = new ProductSearch();
  searchedProducts: Product[] = [];

  displayedColumns: string[] = ['productID', 'productName', 'productTag', 'productOpinions', 'productDescription'];
  dataSource : MatTableDataSource<Product>;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
  }
  searchProducts() {
    this.searchedProducts = this.productSearch.getSearchResults(this.productModel.productName);
    this.dataSource = new MatTableDataSource(this.searchedProducts);
  }

}
