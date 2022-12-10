import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-profilu',
  templateUrl: './panel-profilu.component.html',
  styleUrls: ['./panel-profilu.component.css']
})
export class PanelProfiluComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    window.alert("Hejo!")
  }

}
