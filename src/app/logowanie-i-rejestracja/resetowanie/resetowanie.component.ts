import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ValidationService} from "../services/validation.service";

@Component({
  selector: 'app-resetowanie',
  templateUrl: './resetowanie.component.html',
  styleUrls: ['./resetowanie.component.css']
})
export class ResetowanieComponent implements OnInit {
  email = '';

  constructor(
    private router: Router,
    private validationService: ValidationService
  ) { }

  ngOnInit(): void {
  }

  redirectToMainPage() {
    this.router.navigateByUrl('/');
  }

  isEmailValid(): boolean {
    return this.validationService.validateEmail(this.email);
  }
}
