import {Component, Input, OnInit} from '@angular/core';
import {ReportController} from "../ReportController";
import {User} from "../User";
import {Opinion} from "../Opinion";

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {

  @Input() interface: ReportController = new ReportController();
  @Input() user: User = new User("null");
  @Input() product: Opinion = new Opinion("null");

  constructor() { }

  ngOnInit(): void {

  }

}
