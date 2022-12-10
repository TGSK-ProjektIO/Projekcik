import {AfterViewInit, Component, Injectable, NgModule, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Product} from "./Product";
import {ProductSearch} from "./ProductSearch";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {Kategoria} from "./Kategoria";
import { Profile } from "./Profile";
import {ProfileSearch} from "./ProfileSearch";

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
export class WyszukiwanieComponent implements AfterViewInit {
  productModel = new Product(0,"", "",[],"",0);
  productSearch = new ProductSearch();
  searchedProducts: Product[] = [];
  filteredData: Product[] = [];
  selected = 'all';

  productTags: string[] = [];   //zawiera tagi dla kategorii i wyszukiwania
  productTagsAll: string[] = [];  //zawiera tagi z wyszukiwania
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

  @ViewChild('productPaginator', {static : true}) productPaginator: MatPaginator;
  @ViewChild('profilePaginator', {static : true}) profilePaginator: MatPaginator;
  @ViewChild('productMatSort') productSort: MatSort;
  @ViewChild('profileMatSort') profileSort: MatSort;

  ngAfterViewInit()  {
    this.productsDataSource.paginator = this.productPaginator;
    this.profilesDataSource.paginator = this.profilePaginator;
    this.productsDataSource.sort = this.productSort;
    this.profilesDataSource.sort = this.profileSort;
  }

  searchProducts() {
    this.searchedProducts = this.productSearch.getSearchResults(this.productModel.productName);
    this.productsDataSource.data = this.searchedProducts;
    this.profilesDataSource.data.splice(0);

    this.productTags = [];
    this.productTagsAll = [];
    for (let i = 0; i < this.searchedProducts.length; i++) {
      for (let j = 0; j < this.searchedProducts[i].tags.length; j++) {
        this.productTags.push(this.searchedProducts[i].tags[j]);
        this.productTagsAll.push(this.searchedProducts[i].tags[j]);
      }
    }
  }

  applyCategory($event: any) {
    this.filteredData = [];
    this.productTags = [];

    for (let i = 0; i < this.searchedProducts.length; i++) {

      if (this.searchedProducts[i].categoryID == $event.value.toLowerCase()) {
        this.filteredData.push(this.searchedProducts[i]);

        for (let j = 0; j < this.searchedProducts[i].tags.length; j++) {
          this.productTags.push(this.searchedProducts[i].tags[j]);
        }
      }

      if ($event.value.toLowerCase() == "all") {
        this.filteredData = this.searchedProducts;
        this.productTags = this.productTagsAll;
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
    this.searchedProfiles = this.profileSearch.getSearchResults(this.profileModel.nickname);
    this.profilesDataSource.data = this.searchedProfiles;
    this.productsDataSource.data.splice(0);
  }
}
