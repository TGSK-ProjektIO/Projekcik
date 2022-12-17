import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {faker} from '@faker-js/faker';

@Component({
  selector: 'app-resetowanie-potwierdzenie',
  templateUrl: './resetowanie-potwierdzenie.component.html',
  styleUrls: ['./resetowanie-potwierdzenie.component.css']
})
export class ResetowaniePotwierdzenieComponent implements OnInit {
  message = 'Waiting for server response...';
  newPassword = 'Student321'

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.newPassword = faker.internet.password(
            12
          );
    this.newPassword += '1Jk';
    let id = this.route.snapshot.paramMap.get('id');
    let emailToken = this.route.snapshot.paramMap.get('emailToken');
    fetch('http://localhost:3000/api/v1/logowanie-i-rejestracja/user/reset-password', {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userId": id,
        "emailToken": emailToken,
        "newPassword": this.newPassword
      })
    }).then(response => {
      if (response.status === 404) {
        this.message = 'User not found';
      } else if (response.status === 400) {
        this.message = 'Bad request';
      } else {
        this.message = 'Password reset successfully';
      }
    }).catch(e => {
      this.message = 'Internal server error';
    })
  }

  redirectToMainPage() {
    this.router.navigateByUrl('/');
  }

  redirectToLoginPage() {
    this.router.navigateByUrl('/login');
  }
}
