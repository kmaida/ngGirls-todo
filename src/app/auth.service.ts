import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  webAuth = new auth0.WebAuth({
    domain: '[AUTH0_DOMAIN]', // e.g., yourname.auth0.com
    clientID: '[AUTH0_CLIENT_ID]',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200',
    scope: 'openid profile'
  });
  userProfile: any;

  constructor() {
    if (this.authenticated) {
      // If already authenticated on init, set local userProfile member
      this.userProfile = JSON.parse(localStorage.getItem('profile'));
    }
  }

  login(): void {
    // Auth0 authorize request
    this.webAuth.authorize();
  }

  handleAuth(): void {
    // When Auth0 hash parsed, get profile
    this.webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._profileSession(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
    });
  }

  private _profileSession(authResult): void {
    // Use access token to retrieve user's profile and set session
    this.webAuth.client.userInfo(authResult.accessToken,
      (err, profile) => {
        const expTime = authResult.expiresIn * 1000 + Date.now();
        // Store session data and profile
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('expires_at', JSON.stringify(expTime));
        this.userProfile = profile;
      }
    );
  }

  logout(): void {
    // Remove tokens, profile, and expiration data
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    this.userProfile = undefined;
  }

  get authenticated(): boolean {
    // Check if current date is greater than expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

}
