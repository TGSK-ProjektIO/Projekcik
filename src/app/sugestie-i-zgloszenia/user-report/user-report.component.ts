import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {ReportPartial} from "../../../../express-backend-api/model/report.partial";

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {

  //@Input() interface: ReportController = new ReportController();
  //@Input() user: User = new User("null");
  //@Input() product: Product = new Product("null","null","null","null");

  description: string = "lol"
  type: number = 1;

  constructor(
    private router: Router
  ) { }

  onPressed(): void {
    const report: ReportPartial = {
      type: this.type,
      description: this.description,
      status: 1,
      idProduct: "1",
      idUser: "1"
    };
    fetch('http://localhost:3000/api/v1/sugestie-i-zgloszenia/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(report)
    }).then(async response => {
      if (response.status === 201) {}
      if (response.status === 400) {}
    }).catch(err => {
      console.error(err);
    });
  }

  ngOnInit(): void {

  }

}
