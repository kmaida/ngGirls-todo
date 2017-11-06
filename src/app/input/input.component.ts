import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'todo-input',
  template: `
    <input
      [value]="title"
      (keyup.enter)="changeTitle($event.target.value)"
      #inputElement
      class="todo-input">
    <button
      (click)="onSave(inputElement.value)"
      class="btn">Save</button>
  `,
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  title = '';
  @Output() submit: EventEmitter<string> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Input() value: string;

  constructor() {
  }

  ngOnInit() {
    this.title = this.value ? this.value : '';
  }

  onSave(newVal) {
    if (this.value) {
      this.updateTitle(this.value, newVal);
    } else {
      this.changeTitle(newVal);
    }
  }

  changeTitle(newTitle: string): void {
    this.submit.emit(newTitle);
  }

  updateTitle(newTitle: string, oldTitle: string): void {
    this.edit.emit({
      newTitle: { title: newTitle },
      oldTitle: { title: oldTitle }
    });
  }

}
