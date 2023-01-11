import { Injectable } from '@angular/core';
import {Session} from "../model/session";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  getSessionId(): string | null {
    return localStorage.getItem('sessionId');
  }

  retrieveSessionData(): Promise<Session> {
    const sessionId = this.getSessionId();
    if (sessionId) {
      return fetch('http://localhost:3000/api/v1/logowanie-i-rejestracja/session/' + sessionId)
        .then(response => response.json());
    } else {
      return Promise.reject();
    }
  }

  isSessionValid(): Promise<boolean> {
    const sessionId = this.getSessionId();
    if (sessionId) {
      return fetch('http://localhost:3000/api/v1/logowanie-i-rejestracja/session/' + sessionId + '/has-expired')
        .then(async response => {
          if (response.ok ) {
            const body = await response.json();
            return body.expired === false && !(await this.retrieveSessionData()).invalidated;
          } else {
            return false;
          }
        });
    } else {
      return Promise.reject();
    }
  }

  constructor() { }
}
