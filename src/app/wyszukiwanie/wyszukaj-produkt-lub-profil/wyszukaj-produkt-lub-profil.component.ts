import {AfterViewInit, Component, EventEmitter, Injectable, OnInit, Output, ViewChild} from '@angular/core';
import {Product} from "../../../../express-backend-api/model/product";
import {ProductSearch} from "./ProductSearch";
import {MatTableDataSource} from "@angular/material/table";
import {Profile} from "../../../../express-backend-api/model/profile";
import {ProfileSearch} from "./ProfileSearch";
import {Router} from "@angular/router";
import {WyszukiwanieService} from "../services/wyszukiwanie.service";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {ExtendedProduct} from "../model/ExtendedProduct";
import {Opinion} from "../../../../express-backend-api/model/opinion";
import {response} from "express";
import {ExtendedProfile} from "../model/ExtendedProfile";


@Injectable()
export class PolishPaginatorIntl extends MatPaginatorIntl{
  constructor(){
    super();
    this.nextPageLabel = 'Następna strona';
    this.previousPageLabel = 'Poprzednia strona';
    this.itemsPerPageLabel = 'Liczba wyników na stronie';
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

  productModel : ExtendedProduct = {
    attribute: [],
    categoryName: "",
    description: "",
    isVisible: false,
    name: "",
    tag: [],
    numberOfOpinions: 0,
  }
  fetchedProducts: ExtendedProduct[];
  productSearch: ProductSearch;
  searchedProducts: ExtendedProduct[] = [];
  filteredData: ExtendedProduct[] = [];
  tagFilteredData: ExtendedProduct[] = []
  selectedTags: string[] = [];
  selected = 'all';

  productTags: string[] = [];   //zawiera tagi dla kategorii i wyszukiwania
  productTagsAll: string[] = [];  //zawiera tagi z wyszukiwania
  categories: string[] = [];
  productSearchColumnsToDisplay: string[] = ['name', 'productTag', 'productDescription', 'categoryName', 'numberOfOpinions' ];
  productsDataSource : MatTableDataSource<ExtendedProduct> = new MatTableDataSource<ExtendedProduct>(this.searchedProducts);


  profileModel : ExtendedProfile = {
    nickname: '',
    description: '',
    isBanned: false,
    profilePicture: "",
    userId: "",
    numberOfOpinions: 0,
  };
  fetchedProfiles: ExtendedProfile[];
  profileSearch : ProfileSearch;
  searchedProfiles: ExtendedProfile[] = [];
  profileSearchColumnsToDisplay: string[] = ['avatar', 'nickname', 'numberOfOpinions', 'score']
  profilesDataSource: MatTableDataSource<ExtendedProfile> = new MatTableDataSource<ExtendedProfile>(this.searchedProfiles);

  constructor(private router: Router, private service: WyszukiwanieService) { }

  @ViewChild('productPaginator', {static : true}) productPaginator: MatPaginator;
  @ViewChild('profilePaginator', {static : true}) profilePaginator: MatPaginator;
  @ViewChild('productMatSort') productSort: MatSort;
  @ViewChild('profileMatSort') profileSort: MatSort;

  @Output()
  change: EventEmitter<MatCheckboxChange>

  ngAfterViewInit()  {
    this.service.getAllProfiles()
      .subscribe(response => {
        this.fetchedProfiles = response as ExtendedProfile[];
        this.fetchedProfiles.forEach((profile) => {
          this.service.getAllProfileOpinions(profile)
            .subscribe(response => {
              let opinions : Array<Opinion> = response as Array<Opinion>;
              profile.numberOfOpinions = opinions.length;
            })
        })
        this.profileSearch = new ProfileSearch(this.fetchedProfiles);
      });
    this.service.getAllProducts()
      .subscribe(response => {
        this.fetchedProducts = response as ExtendedProduct[];
        this.fetchedProducts.forEach((product) => {
          this.service.getAllProductOpinions(product)
            .subscribe(response => {
              let opinions : Array<Opinion> = response as Array<Opinion>;
              product.numberOfOpinions = opinions.length;
            })
        })
        this.productSearch = new ProductSearch(this.fetchedProducts);
      })
    this.productsDataSource.paginator = this.productPaginator;
    this.profilesDataSource.paginator = this.profilePaginator;
    this.productsDataSource.sort = this.productSort;
    this.profilesDataSource.sort = this.profileSort;
  }

  searchProducts() {
    this.categories = [];
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
    this.productTags = this.productTags.filter((elem, index, self) => {
      return index === self.indexOf(elem);
    })
    this.productTagsAll = this.productTagsAll.filter((elem, index, self) => {
      return index === self.indexOf(elem);
    })

    this.filteredData = this.searchedProducts;
  }

  applyTagFilter(checked: string, isChecked: boolean) {
    this.tagFilteredData = [];
    //var isFlag = false;
    if (isChecked)
    {
      this.selectedTags.push(checked);
    }
    else
    {
      this.selectedTags.forEach((item, index) => {
        if (item == checked) this.selectedTags.splice(index,1);
      })
    }

    if (this.selectedTags.length === 0)
    {
      this.productsDataSource.data = this.filteredData;
    }
    else
    {

      for (let i = 0; i < this.filteredData.length; i++)
      {
        var findElement = true;
        for (let j = 0; j < this.selectedTags.length; j++)
        {

          for (let p = 0; p < this.filteredData[i].tag.length; p++)
          {
            if (this.selectedTags[j] === this.filteredData[i].tag[p])
            {
              findElement = true;
              break
            }
            else
            {
              findElement = false;
            }
          }
          if (!findElement)
            break;

        }
        if (findElement)
          this.tagFilteredData.push(this.filteredData[i]);
      }

      this.tagFilteredData = this.tagFilteredData.filter((elem, index, self) => {
        return index === self.indexOf(elem);
      })
      this.productsDataSource.data = this.tagFilteredData;


    }
  }

  applyCategory($event: any) {
    this.filteredData = [];
    this.productTags = [];
    this.selectedTags = [];

    for (let i = 0; i < this.searchedProducts.length; i++) {

      if (this.searchedProducts[i].categoryName == $event.value.toLowerCase()) {
        this.filteredData.push(this.searchedProducts[i]);

        for (let j = 0; j < this.searchedProducts[i].tag.length; j++) {
          this.productTags.push(this.searchedProducts[i].tag[j]);
        }
      }
      this.productTags = this.productTags.filter((elem, index, self) => {
        return index === self.indexOf(elem);
      })

      if ($event.value.toLowerCase() == "all") {
        this.filteredData = this.searchedProducts;
        this.productTags = this.productTagsAll;
      }
    }
    this.productsDataSource.data = this.filteredData;
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
    this.router.navigate(['/profile/getProfile/' + profile._id]);
  }
}
