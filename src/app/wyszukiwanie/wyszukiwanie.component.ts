import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Profile } from "./Profile";
import {ProfileSearch} from "./ProfileSearch";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-wyszukiwanie',
  templateUrl: './wyszukiwanie.component.html',
  styleUrls: ['./wyszukiwanie.component.css']
})
export class WyszukiwanieComponent implements AfterViewInit {
  model = new Profile(0, "", 0, 0);
  profileSearch = new ProfileSearch();
  searchedProfiles: Profile[] = [];
  columnsToDisplay: string[] = ['userId', 'nickname', 'numberOfOpinions', 'score']
  dataSource: MatTableDataSource<Profile> = new MatTableDataSource<Profile>(this.searchedProfiles);
  constructor() {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchProfiles() {
    this.searchedProfiles = this.profileSearch.getSearchResults(this.model.nickname);
    this.dataSource.data = this.searchedProfiles;
    console.log(this.dataSource);
  }
}
