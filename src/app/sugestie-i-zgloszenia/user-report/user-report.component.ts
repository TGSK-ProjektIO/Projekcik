import {Component, Input, OnInit} from '@angular/core';
import {ReportController} from "../ReportController";
import {User} from "../User";
import {Product} from "../../produkt/Product";

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {

  @Input() interface: ReportController = new ReportController();
  @Input() user: User = new User("null");
  @Input() product: Product = new Product("null","null","null","null");

  constructor() { }

  ngOnInit(): void {

  }

}
