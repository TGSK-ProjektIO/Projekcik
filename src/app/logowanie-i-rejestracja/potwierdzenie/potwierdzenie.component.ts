import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-potwierdzenie',
  templateUrl: './potwierdzenie.component.html',
  styleUrls: ['./potwierdzenie.component.css']
})
export class PotwierdzenieComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectToMainPage() {
    this.router.navigateByUrl('/');
  }
}
