import { Injectable } from '@angular/core';
import {User} from "../../../../express-backend-api/model/user";

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private clientId = 'd6f9f0aeec505aca4ef9';

  constructor() { }

  getClientId(): string {
    return this.clientId;
  }

  getGithubRegisterUri(): string {
    return `https://github.com/login/oauth/authorize?client_id=${this.getClientId()}&scope=read:user,user:email`;
  }

  getGithubLoginUri(): string {
    return `https://github.com/login/oauth/authorize?client_id=${this.getClientId()}&scope=read:user,user:email&redirect_uri=http://localhost:4200/github_response/login`;
  }

  registerGithubUser(githubCode: string): Promise<User> {
    return fetch('http://localhost:3000/api/v1/logowanie-i-rejestracja/user/github/register/' + githubCode)
      .then(response => {
        if (response.ok) {
          console.log('Github user registered successfully');
        } else {
          console.log('Github user registration failed');
        }
        return response;
      })
      .then(response => response.json())
  }

  loginGithubUser(githubCode: string): Promise<User> {
    return fetch('http://localhost:3000/api/v1/logowanie-i-rejestracja/session/github/login/' + githubCode)
      .then(response => {
        if (response.ok) {
          console.log('Github user logged in successfully');
        } else {
          console.log('Github user login failed');
        }
        return response;
      })
      .then(response => response.json())
  }
}
