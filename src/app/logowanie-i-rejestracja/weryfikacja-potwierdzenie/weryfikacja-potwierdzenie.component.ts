import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-weryfikacja-potwierdzenie',
  templateUrl: './weryfikacja-potwierdzenie.component.html',
  styleUrls: ['./weryfikacja-potwierdzenie.component.css']
})
export class WeryfikacjaPotwierdzenieComponent implements OnInit {
  message = 'Waiting for server response...';

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
    }).then(response => {
      if (response.status === 404) {
        this.message = 'User is already verified';
      } else if (response.status === 400) {
        this.message = 'Given email token is invalid';
      } else {
        this.message = 'Email verified successfully';
      }
    }).catch(e => {
      this.message = 'Internal server error';
    });
  }

  redirectToMainPage() {
    this.router.navigateByUrl('/');
  }

  redirectToLoginPage() {
    this.router.navigateByUrl('/login');
  }
}
