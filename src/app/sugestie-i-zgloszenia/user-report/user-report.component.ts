import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {

  //@Input() interface: ReportController = new ReportController();
  //@Input() user: User = new User("null");
  //@Input() product: Product = new Product("null","null","null","null");

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

}
