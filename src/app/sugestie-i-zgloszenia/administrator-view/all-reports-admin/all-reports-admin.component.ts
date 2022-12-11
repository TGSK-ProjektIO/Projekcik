import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../User";
import {Opinion} from "../../Opinion";
import {Report} from "../../Report";
import {TypeOfReport} from "../../TypeOfReport";
import {ConfirmationStatus} from "../../ConfirmationStatus";

@Component({
  selector: 'app-all-reports-admin',
  templateUrl: './all-reports-admin.component.html',
  styleUrls: ['./all-reports-admin.component.css']
})
export class AllReportsAdminComponent implements OnInit {

  isNotAccepted: boolean = true;
  wasNotRejected: boolean = true;

  @Input() report: Report = new Report(0, new User("null"), new Opinion("null"), TypeOfReport.Other, "null");
  constructor() { }

  ngOnInit(): void {
    if (this.report.status == ConfirmationStatus.Accepted) {
      this.isNotAccepted = false;
    }
    else if (this.report.status == ConfirmationStatus.Rejected) {
      this.wasNotRejected = false;
    }
  }

  acceptOpinion() {
    this.report.status = ConfirmationStatus.Accepted;
    this.isNotAccepted = false;
  }

  rejectOpinion() {
    this.report.status = ConfirmationStatus.Rejected;
    this.wasNotRejected = false;
  }

}
