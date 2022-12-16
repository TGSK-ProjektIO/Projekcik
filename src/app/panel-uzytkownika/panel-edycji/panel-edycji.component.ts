import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-panel-edycji',
  templateUrl: './panel-edycji.component.html',
  styleUrls: ['./panel-edycji.component.css']
})
export class PanelEdycjiComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectToProfile() {
    this.router.navigateByUrl('');
  }

}
