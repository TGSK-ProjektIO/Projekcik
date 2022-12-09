import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Product} from "./Product";
import {ProductSearch} from "./ProductSearch";
import {MatPaginator} from "@angular/material/paginator";
import {Kategoria} from "./Kategoria";
import {filter} from "rxjs";


@Component({
  selector: 'app-wyszukiwanie',
  templateUrl: './wyszukiwanie.component.html',
  styleUrls: ['./wyszukiwanie.component.css']
})
export class WyszukiwanieComponent implements AfterViewInit {

  productModel = new Product(0,"", "",[],"",0);
  productSearch = new ProductSearch();
  searchedProducts: Product[] = [];
  filteredData: Product[] = [];
  selected = 'all';

  categories: Kategoria[] = [
    {categoryId: 1, categoryName: 'elektronika', attributes: [] },
    {categoryId: 2, categoryName: 'jedzenie', attributes: [] },
    {categoryId: 3, categoryName: 'napoje', attributes: [] }
  ]
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

  applyCategory($event: any) {
    this.filteredData =[];

    for (let i = 0; i < this.searchedProducts.length; i++)
    {
      if (this.searchedProducts[i].categoryID == $event.value.toLowerCase())
      {
        this.filteredData.push(this.searchedProducts[i]);
      }

      if ($event.value.toLowerCase() == "all")
      {
        this.filteredData = this.searchedProducts;
      }
    }
    this.dataSource.data = this.filteredData;
  }

  applyTagFilter(event: Event) {
    const filterValue= (event.target as HTMLInputElement).value.toLowerCase().trim();
      this.filteredData = [];

    for (let i = 0; i < this.searchedProducts.length; i++) {
      for (let j = 0; j < 2; j++) {
        if (this.searchedProducts[i].tags[j] == filterValue)
        {
          this.filteredData.push(this.searchedProducts[i]);
        }
      }
    }
    if (filterValue == "")
    {
      this.dataSource.data = this.searchedProducts;
    }
    else
    {
      this.dataSource.data = this.filteredData;
    }

    //this.dataSource.filter = filterValue.trim().toLowerCase();

  }

}
