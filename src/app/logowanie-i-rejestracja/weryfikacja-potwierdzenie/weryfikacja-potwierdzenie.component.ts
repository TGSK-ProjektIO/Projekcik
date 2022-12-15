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
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    let token = this.route.snapshot.paramMap.get('emailToken')
    fetch('http://localhost:3000/api/v1/logowanie-i-rejestracja/user/confirm-email', {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userId": id,
        "emailToken": token
      })
    })
  }

  redirectToMainPage() {
    this.router.navigateByUrl('/');
  }

  redirectToLoginPage() {
    this.router.navigateByUrl('/login');
  }
}
