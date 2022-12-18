import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-all-reports-user',
  templateUrl: './all-reports-user.component.html',
  styleUrls: ['./all-reports-user.component.css']
})
export class AllReportsUserComponent implements OnInit {

  //@Input() report: Report = new Report(0, new User("null"), new Product("null","null","null","null"), TypeOfReport.Other, "null");

  constructor() { }

  ngOnInit(): void {
  }

}
