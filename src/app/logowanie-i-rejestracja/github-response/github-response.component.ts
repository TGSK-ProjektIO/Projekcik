import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-github-response',
  templateUrl: './github-response.component.html',
  styleUrls: ['./github-response.component.css']
})
export class GithubResponseComponent implements OnInit {

  githubCode = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.githubCode = params['code'];
        if (!this.githubCode) {
          console.error('No github code was provided');
          this.router.navigate(['/']);
        }
      });
  }

}
