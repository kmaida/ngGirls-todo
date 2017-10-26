import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'todo-input',
  template: `
    <input
      [value]="title"
      (keyup.enter)="changeTitle($event.target.value)"
      #inputElement
      class="todo-input">
    <button
      (click)="changeTitle(inputElement.value)"
      class="btn">Save</button>
  `,
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  title = '';
  @Output() submit: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  changeTitle(newTitle: string): void {
    this.submit.emit(newTitle);
  }

}
