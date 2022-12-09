import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css']
})
export class LogowanieComponent implements OnInit {
  email = '';
  password = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSignInPressed() {

  }
}
