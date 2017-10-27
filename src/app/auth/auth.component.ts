import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-auth',
  template: `
    <div class="todo-auth">
      auth works!
    </div>
  `,
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
