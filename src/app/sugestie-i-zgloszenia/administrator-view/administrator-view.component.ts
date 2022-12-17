import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {ReportPartial} from "../../../../express-backend-api/model/report.partial";
import {Report} from "../../../../express-backend-api/model/report";
import {Opinion} from "../../../../express-backend-api/model/opinion";
import {CompleteOpinionComponent} from "../../opinie/complete-opinion/complete-opinion.component";
import {UserReportComponent} from "../user-report/user-report.component";

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

  constructor(
    private router: Router
  ) {
  }

  private async onPressed(): Promise<Array<Report>> {
    return await fetch(`http://localhost:3000/api/v1/sugestie-i-zgloszenia/getReports`, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()
    ).then((result) => {
      return result;
    }).catch(err => {
      console.error(err);
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
