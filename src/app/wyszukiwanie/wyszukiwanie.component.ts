import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Product} from "./Product";
import {ProductSearch} from "./ProductSearch";
import {MatPaginator} from "@angular/material/paginator";
import {Kategoria} from "./Kategoria";
import { Profile } from "./Profile";
import {ProfileSearch} from "./ProfileSearch";


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
  productSearchColumnsToDisplay: string[] = ['productId', 'productName', 'productTag', 'productDescription', 'categoryID', 'numberOfOpinions' ];
  productsDataSource : MatTableDataSource<Product> = new MatTableDataSource<Product>(this.searchedProducts);


  profileModel = new Profile(0, "", 0, 0);
  profileSearch = new ProfileSearch();
  searchedProfiles: Profile[] = [];
  profileSearchColumnsToDisplay: string[] = ['userId', 'nickname', 'numberOfOpinions', 'score']
  profilesDataSource: MatTableDataSource<Profile> = new MatTableDataSource<Profile>(this.searchedProfiles);

  constructor() { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit()  {
    this.productsDataSource.paginator = this.paginator;
    this.productsDataSource.sort = this.sort;
  }

  searchProducts() {
    this.searchedProducts = this.productSearch.getSearchResults(this.productModel.productName);
    this.productsDataSource.data = this.searchedProducts;
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
    this.productsDataSource.data = this.filteredData;
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
      this.productsDataSource.data = this.searchedProducts;
    }
    else
    {
      this.productsDataSource.data = this.filteredData;
    }

  }

  searchProfiles() {
    this.searchedProfiles = this.profileSearch.getSearchResults(this.model.nickname);
    this.profilesDataSource.data = this.searchedProfiles;
  }
}
