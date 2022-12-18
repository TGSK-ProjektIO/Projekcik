import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-reports-admin',
  templateUrl: './all-reports-admin.component.html',
  styleUrls: ['./all-reports-admin.component.css']
})
export class AllReportsAdminComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {

  }

  //isNotAccepted: boolean = true;
  //wasNotRejected: boolean = true;

  //@Input() report: Report = new Report(0, new User("null"), new Product("null","null","null","null"), TypeOfReport.Other, "null");
  //constructor() { }

  //ngOnInit(): void {
  //  if (this.report.status == ConfirmationStatus.Accepted) {
  //    this.isNotAccepted = false;
  //  }
  //  else if (this.report.status == ConfirmationStatus.Rejected) {
  //    this.wasNotRejected = false;
  //  }
  //}

  //acceptProduct() {
  //  this.report.status = ConfirmationStatus.Accepted;
  //  this.isNotAccepted = false;
  //}

  //rejectProduct() {
  //  this.report.status = ConfirmationStatus.Rejected;
  //  this.wasNotRejected = false;
  //}

}
