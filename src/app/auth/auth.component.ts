import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-auth',
  template: `
    <div class="todo-auth">
      <button
        *ngIf="!authService.authenticated"
        (click)="authService.login()"
        class="btn">Log In</button>
      <ng-template [ngIf]="authService.authenticated">
        <img [src]="authService.userProfile?.picture" />{{authService.userProfile?.name}}
        <button
          (click)="authService.logout()"
          class="btn btn-red">Log Out</button>
      </ng-template>
    </div>
  `,
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
