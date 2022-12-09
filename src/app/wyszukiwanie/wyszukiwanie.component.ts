import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Product} from "./Product";
import {ProductSearch} from "./ProductSearch";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-wyszukiwanie',
  templateUrl: './wyszukiwanie.component.html',
  styleUrls: ['./wyszukiwanie.component.css']
})
export class WyszukiwanieComponent implements AfterViewInit {

  productModel = new Product(0,"", "",[],"",0);
  productSearch = new ProductSearch();
  searchedProducts: Product[] = [];
  selected = 'all';

  displayedColumns: string[] = ['productId', 'productName', 'productTag', 'productDescription', 'categoryID', 'numberOfOpinions' ];
  dataSource : MatTableDataSource<Product> = new MatTableDataSource<Product>(this.searchedProducts);

  constructor() {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit()  {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  }

  searchProducts() {
    this.searchedProducts = this.productSearch.getSearchResults(this.productModel.productName);
    this.dataSource.data = this.searchedProducts;
  }

}
