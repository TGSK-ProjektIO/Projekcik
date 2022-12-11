import {Component, Input, OnInit} from '@angular/core';
import {Report} from "../Report";
import {User} from "../User";
import {Opinion} from "../Opinion";
import {TypeOfReport} from "../TypeOfReport";
import {ReportController} from "../ReportController";

@Component({
  selector: 'administrator-view',
  templateUrl: './administrator-view.component.html',
  styleUrls: ['./administrator-view.component.css']
})
export class AdministratorViewComponent implements OnInit {

  @Input() interface: ReportController = new ReportController();
  reports: Report[] = [];

  constructor() { }

  ngOnInit(): void {
    this.reports = this.interface.getReportsByCategory(TypeOfReport.ErrorInDescription);
  }

}
