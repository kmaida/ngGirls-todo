import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  private AUTH0_DOMAIN = '[AUTH0_DOMAIN]'; // e.g., yourname.auth0.com
  // Create Auth0 WebAuth instance
  private _webAuth = new auth0.WebAuth({
    domain: this.AUTH0_DOMAIN,
    clientID: '[AUTH0_CLIENT_ID]',
    responseType: 'token',
    redirectUri: 'http://localhost:4200',
    audience: `https://${this.AUTH0_DOMAIN}/userinfo`,
    scope: 'openid profile email'
  });
  // Store the user's profile locally once they log in
  userProfile: any;
  // Store access token to authorize an API (future)
  accessToken: string;

  constructor() {
    if (this.isLoggedIn) {
      // If already authenticated on init of app from a
      // previous session, set local userProfile member
      this.userProfile = JSON.parse(localStorage.getItem('profile'));
    }
  }

  login(): void {
    // Send Auth0 authorize request; opens
    // the Auth0 centralized login page
    this._webAuth.authorize();
  }

  handleLoginCallback(): void {
    // When Auth0 hash parsed, execute method
    // to get user's profile and set session
    this._webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
    });
  }

  private getUserInfo(authResult): void {
    // Use access token to retrieve user's profile and set session
    this._webAuth.client.userInfo(authResult.accessToken,
      (err, profile) => {
        const expTime = authResult.expiresIn * 1000 + Date.now();
        // Store auth data
        this.accessToken = authResult.accessToken;
        localStorage.setItem('expires_at', JSON.stringify(expTime));
        this.userProfile = profile;
      }
    );
  }

  logout(): void {
    // Remove tokens, profile, and expiration data from local storage
    localStorage.removeItem('expires_at');
    this.accessToken = undefined;
    this.userProfile = undefined;
  }

  get isLoggedIn(): boolean {
    // Check if current date is greater than expiration
    // and an access token and profile are available.
    // This is an accessor, so calling it does not
    // require use of parens; e.g., isLoggedIn
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return (Date.now() < expiresAt) && this.accessToken && this.userProfile;
  }

}
