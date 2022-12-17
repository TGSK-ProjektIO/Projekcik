import {AfterViewInit, Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../../../express-backend-api/model/product";
import {ProductSearch} from "./ProductSearch";
import {MatTableDataSource} from "@angular/material/table";
import {Profile} from "../../../../express-backend-api/model/profile";
import {ProfileSearch} from "./ProfileSearch";
import {Router} from "@angular/router";
import {WyszukiwanieService} from "../services/wyszukiwanie.service";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";


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
  selector: 'app-wyszukaj-produkt-lub-profil',
  templateUrl: './wyszukaj-produkt-lub-profil.component.html',
  styleUrls: ['./wyszukaj-produkt-lub-profil.component.css']
})
export class WyszukajProduktLubProfilComponent implements AfterViewInit {

  productModel : Product = {
    attribute: [],
    categoryName: "",
    description: "",
    isVisible: false, name: "",
    tag: []

  }
  fetchedProducts: Product[];
  productSearch: ProductSearch;
  searchedProducts: Product[] = [];
  filteredData: Product[] = [];
  selected = 'all';

  productTags: string[] = [];   //zawiera tagi dla kategorii i wyszukiwania
  productTagsAll: string[] = [];  //zawiera tagi z wyszukiwania
  categories: string[] = [];
  productSearchColumnsToDisplay: string[] = ['productId', 'productName', 'productTag', 'productDescription', 'categoryID', 'numberOfOpinions' ];
  productsDataSource : MatTableDataSource<Product> = new MatTableDataSource<Product>(this.searchedProducts);


  profileModel : Profile = {
    nickname: '',
    description: '',
    isBanned: false,
    profilePicture: "",
    userId: "",
  };
  fetchedProfiles: Profile[];
  profileSearch : ProfileSearch;
  searchedProfiles: Profile[] = [];
  profileSearchColumnsToDisplay: string[] = ['userId', 'nickname', 'numberOfOpinions', 'score']
  profilesDataSource: MatTableDataSource<Profile> = new MatTableDataSource<Profile>(this.searchedProfiles);

  constructor(private router: Router, private service: WyszukiwanieService) { }

  @ViewChild('productPaginator', {static : true}) productPaginator: MatPaginator;
  @ViewChild('profilePaginator', {static : true}) profilePaginator: MatPaginator;
  @ViewChild('productMatSort') productSort: MatSort;
  @ViewChild('profileMatSort') profileSort: MatSort;

  ngAfterViewInit()  {
    this.service.getAllProfiles()
      .subscribe(response => {
        this.fetchedProfiles = response as Profile[];
        this.profileSearch = new ProfileSearch(this.fetchedProfiles);
      });
    this.service.getAllProducts()
      .subscribe(response => {
        this.fetchedProducts = response as Product[];
        this.productSearch = new ProductSearch(this.fetchedProducts);
      })
    this.productsDataSource.paginator = this.productPaginator;
    this.profilesDataSource.paginator = this.profilePaginator;
    this.productsDataSource.sort = this.productSort;
    this.profilesDataSource.sort = this.profileSort;
  }

  searchProducts() {
    this.searchedProducts = this.productSearch.getSearchResults(this.productModel.name.toLowerCase());
    this.productsDataSource.data = this.searchedProducts;
    this.profilesDataSource.data.splice(0);

    this.searchedProducts.forEach(product => {
      this.categories.push(product.categoryName)
    })
    this.categories = this.categories.filter((elem, index, self) => {
      return index === self.indexOf(elem);
    })

    this.productTags = [];
    this.productTagsAll = [];
    for (let i = 0; i < this.searchedProducts.length; i++) {
      for (let j = 0; j < this.searchedProducts[i].tag.length; j++) {
        this.productTags.push(this.searchedProducts[i].tag[j]);
        this.productTagsAll.push(this.searchedProducts[i].tag[j]);
      }
    }
  }

  applyCategory($event: any) {
    this.filteredData = [];
    this.productTags = [];

    for (let i = 0; i < this.searchedProducts.length; i++) {

      if (this.searchedProducts[i].categoryName == $event.value.toLowerCase()) {
        this.filteredData.push(this.searchedProducts[i]);

        for (let j = 0; j < this.searchedProducts[i].tag.length; j++) {
          this.productTags.push(this.searchedProducts[i].tag[j]);
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
        if (this.searchedProducts[i].tag[j] == filterValue)
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
    this.searchedProfiles = this.profileSearch.getSearchResults(this.profileModel.nickname.toLowerCase());
    this.profilesDataSource.data = this.searchedProfiles;
    this.productsDataSource.data.splice(0);
  }

  goToProduct(product: Product) {
    this.router.navigate(['/produkt/produkt-widok/' + product._id]);
  }

  goToProfile(profile: Profile) {
    console.log(profile._id);
  }

}
