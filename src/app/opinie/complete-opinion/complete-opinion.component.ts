import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-complete-opinion',
  templateUrl: './complete-opinion.component.html',
  styleUrls: ['./complete-opinion.component.css']
})
export class CompleteOpinionComponent implements OnInit {
  // Needed to pull [[ opinions ]] from database that are assigned to [[ product ]]
  @Input() productID : string = "";
  // Needed to identify singular [[ opinion ]]
  @Input() ID : number = 0;
  // Needed to assign [[ user ]] to [[ opinion ]]
  @Input() userID : string = "";
  // Attributes that are used to create singular [[ ratings ]]
  @Input() attributes : string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  GetID() : number { return this.ID; }


}
