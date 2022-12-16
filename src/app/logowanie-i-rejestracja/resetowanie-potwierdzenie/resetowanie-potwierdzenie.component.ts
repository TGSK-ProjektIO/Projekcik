import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-resetowanie-potwierdzenie',
  templateUrl: './resetowanie-potwierdzenie.component.html',
  styleUrls: ['./resetowanie-potwierdzenie.component.css']
})
export class ResetowaniePotwierdzenieComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  redirectToMainPage() {
    this.router.navigateByUrl('/');
  }

  redirectToLoginPage() {
    this.router.navigateByUrl('/login');
  }
}
