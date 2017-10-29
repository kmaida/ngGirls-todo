import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  // Create Auth0 WebAuth instance
  webAuth = new auth0.WebAuth({
    domain: '[AUTH0_DOMAIN]', // e.g., yourname.auth0.com
    clientID: '[AUTH0_CLIENT_ID]',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200',
    scope: 'openid profile'
  });
  // Store the user's profile locally once they log in
  userProfile: any;

  constructor() {
    if (this.authenticated) {
      // If already authenticated on init of app from a
      // previous session, set local userProfile member
      this.userProfile = JSON.parse(localStorage.getItem('profile'));
    }
  }

  login(): void {
    // Send Auth0 authorize request; opens
    // the Auth0 centralized login page
    this.webAuth.authorize();
  }

  handleAuth(): void {
    // When Auth0 hash parsed, execute method
    // to get user's profile and set session
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
        // Store session data and profile in local storage
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('expires_at', JSON.stringify(expTime));
        this.userProfile = profile;
      }
    );
  }

  logout(): void {
    // Remove tokens, profile, and expiration data from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    this.userProfile = undefined;
  }

  get authenticated(): boolean {
    // Check if current date is greater than expiration
    // If it is, it means the user is authenticated
    // This is an accessor, so calling it does not
    // require use of parens; e.g., authenticated
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

}
