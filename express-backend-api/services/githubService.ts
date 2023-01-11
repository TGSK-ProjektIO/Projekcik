import {GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET} from "../config/github.config";
import {injectable} from "inversify";
import fetch from 'node-fetch';

@injectable()
export class GithubService {
  public async retrieveAccessToken(githubCode: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const response = await fetch('https://github.com/login/oauth/access_token?' + new URLSearchParams({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code: githubCode,
          scope: 'read:user,user:email'
        }), {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        });

        if (response.ok) {
          const body: any = await response.json();
          return resolve(body.access_token);
        }
        reject(response.statusText);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async retrieveUserLogin(accessToken: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const response = await fetch('https://api.github.com/user', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
        if (response.ok) {
          return resolve((await response.json()).login);
        }
        reject(response.statusText);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async retrieveUserEmail(accessToken: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const response = await fetch('https://api.github.com/user/emails', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
        if (response.ok) {
          const body: any = await response.json();
          const primaryEmailRecord = body.find((record: any) => record.primary);
          return resolve(primaryEmailRecord.email);
        } else {
          reject(response.statusText);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
