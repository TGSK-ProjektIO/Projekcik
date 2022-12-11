import {Component, Input, OnInit} from '@angular/core';
import {Report} from "../../Report";
import {User} from "../../User";
import {Opinion} from "../../Opinion";
import {TypeOfReport} from "../../TypeOfReport";

@Component({
  selector: 'app-all-reports-user',
  templateUrl: './all-reports-user.component.html',
  styleUrls: ['./all-reports-user.component.css']
})
export class AllReportsUserComponent implements OnInit {

  @Input() report: Report = new Report(0, new User("null"), new Opinion("null"), TypeOfReport.Other, "null");

  constructor() { }

  ngOnInit(): void {
  }

}
