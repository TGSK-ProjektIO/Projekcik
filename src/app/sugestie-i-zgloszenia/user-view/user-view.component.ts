import {Component, Input, OnInit} from '@angular/core';
import {ReportController} from "../ReportController";
import {Report} from "../Report";
import {User} from "../User";
import {TypeOfReport} from "../TypeOfReport";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  @Input() interface: ReportController = new ReportController();
  @Input() user: User = new User("null");
  reports: Report[] = [];
  constructor() {
  }
  ngOnInit(): void {
    this.reports = this.interface.getReports(report => report.user == this.user);
  }

}
