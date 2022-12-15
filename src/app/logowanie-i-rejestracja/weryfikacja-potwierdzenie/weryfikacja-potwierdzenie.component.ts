import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-weryfikacja-potwierdzenie',
  templateUrl: './weryfikacja-potwierdzenie.component.html',
  styleUrls: ['./weryfikacja-potwierdzenie.component.css']
})
export class WeryfikacjaPotwierdzenieComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
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
