import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {ReportPartial} from "../../../../express-backend-api/model/report.partial";
import {Report} from "../../../../express-backend-api/model/report";
import {Opinion} from "../../../../express-backend-api/model/opinion";
import {CompleteOpinionComponent} from "../../opinie/complete-opinion/complete-opinion.component";
import {UserReportComponent} from "../user-report/user-report.component";
import {ObjectID} from "mongodb";

@Component({
  selector: 'administrator-view',
  templateUrl: './administrator-view.component.html',
  styleUrls: ['./administrator-view.component.css']
})
export class AdministratorViewComponent implements OnInit {

  //@Input() interface: ReportController = new ReportController();
  //reports: Report[] = [];

  //report: Report | undefined;

  //constructor() { }

  //ngOnInit(): void {
  //  this.reports = this.interface.getReportsByCategory(TypeOfReport.ErrorInDescription);
  //}

  reports: Report[] = [];

  indicator: string = "not working!";

  id: string = "639df78018e2ae539822a179";
  userId: string = "";
  type: number = 0;
  status: number = 0;
  description: string = "";
  productId: string = "";

  constructor(
    private router: Router
  ) {
  }

  onPressedShowSingle() {
    fetch(`http://localhost:3000/api/v1/sugestie-i-zgloszenia/readReport/${this.id}`, {
      method: 'GET'
    }).then(async response => {
      if (response.status === 200) {
        const report = await response.json();
        this.id = report._id;
        this.type = report.type;
        this.description = report.description;
        this.status = report.status;
        this.userId = report.userId;
        this.productId = report.productId;
      }
      else if(response.status === 400) {}
      else if(response.status === 404) {}
    }).catch(() => {
      console.log("administrator-view:onPressedShowSingle-fetch ERROR");
    });
  }

  onPressedShowAll() {
    fetch(`http://localhost:3000/api/v1/sugestie-i-zgloszenia/getReports`, {
      method: 'GET'
    }).then(async response => {
      if (response.status === 200) {
        const retrievedReports = await response.json();
        this.indicator = "working!";
        this.reports = retrievedReports;
        //for (let i = 0; i < retrievedReports.length; i++) {
          //this.reports[i]._id = retrievedReports[i]._id;

        //}
        //this.id = report._id;
        //this.type = report.type;
        //this.description = report.description;
        //this.status = report.status;
        //this.userId = report.userId;
        //this.productId = report.productId;
      }
      else if(response.status === 400) {}
      else if(response.status === 404) {}
    }).catch(() => {
      console.log("administrator-view:onPressedShowAll-fetch ERROR");
    });
  }

  //redirectToProfile() {
  //  this.router.navigateByUrl('');
  //}

  ngOnInit(): void {
  }


  //onSignInPressed() {
  //  fetch('http://localhost:3000/api/v1/logowanie-i-rejestracja/session/login', {
  //    method: 'POST',
  //    headers: {
  //      'Accept': '*/*',
  //      'Content-Type': 'application/json'
  //    },
  //    body: JSON.stringify({
  //      "email": this.email,
  //      "password": this.password
  //    })
  //  }).then(async response => {
  //    if (response.status === 201) {
  //      await this.router.navigateByUrl('/');
  //   }
  //    if (response.status === 404) {
  //      this.invalidLoginFlag = true;
  //    }
  //  }).catch(err => {
  //    console.error(err);
  //  });
  //}

}
