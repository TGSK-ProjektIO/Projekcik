import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-resetowanie',
  templateUrl: './resetowanie.component.html',
  styleUrls: ['./resetowanie.component.css']
})
export class ResetowanieComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  redirectToMainPage() {
    this.router.navigateByUrl('/');
  }
}
