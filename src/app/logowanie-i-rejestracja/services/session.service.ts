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
      return fetch('/api/v1/logowanie-i-rejestracja/session/' + sessionId)
        .then(response => response.json());
    } else {
      return Promise.reject();
    }
  }

  constructor() { }
}
