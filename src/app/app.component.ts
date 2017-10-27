import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'todo-root',
  template: `
    <todo-auth></todo-auth>
    <todo-list-manager></todo-list-manager>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) {
    this.authService.handleAuth();
  }
}
