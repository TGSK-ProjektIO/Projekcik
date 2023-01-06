import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GithubService} from "../services/github.service";

@Component({
  selector: 'app-github-response',
  templateUrl: './github-response.component.html',
  styleUrls: ['./github-response.component.css']
})
export class GithubResponseComponent implements OnInit {

  githubCode = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private githubService: GithubService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.githubCode = params['code'];
        if (!this.githubCode) {
          console.error('No github code was provided');
          this.router.navigate(['/']);
        } else {
          const isLogin = this.router.url.includes('/login');
          if (isLogin) {
            this.githubService.loginGithubUser(this.githubCode)
              .then(session => {
                if (session && session._id) {
                  localStorage.setItem('sessionId', session._id.toString());
                }
                this.router.navigate(['/']);
              }).catch(error => {
                console.error(error);
                this.router.navigate(['/']);
              });
          } else {
            this.githubService.registerGithubUser(this.githubCode)
              .then(user => {
                console.log('Success')
                console.log(user)
              })
              .catch(error => {
                console.log('error')
                console.log(error)
                this.router.navigate(['/']);
              });
          }
        }
      });
  }

}
