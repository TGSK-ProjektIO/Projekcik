import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-uzytkownika',
  templateUrl: './panel-uzytkownika.component.html',
  styleUrls: ['./panel-uzytkownika.component.css']
})
export class PanelUzytkownikaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    window.alert("Hejo!")
  }
}
