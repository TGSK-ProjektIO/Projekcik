import { Component, OnInit } from '@angular/core';
import { Profile } from "./Profile";
import {ProfileSearch} from "./ProfileSearch";

@Component({
  selector: 'app-wyszukiwanie',
  templateUrl: './wyszukiwanie.component.html',
  styleUrls: ['./wyszukiwanie.component.css']
})
export class WyszukiwanieComponent implements OnInit {
  model = new Profile(0, "", 0, 0);
  profileSearch = new ProfileSearch();
  searchedProfiles: Profile[] = [];
  constructor(

  ) {}

  ngOnInit(): void {
  }

  searchProducts() {
    this.searchedProfiles = this.profileSearch.getSearchResults(this.model.nickname);
  }
}
