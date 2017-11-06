import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'todo-item',
  template: `
    <div class="todo-item">
      <input
        class="todo-checkbox"
        type="checkbox"
        (click)="completeItem()"
        (edit)="submitEdit($event)" />
      <p
        class="todo-title"
        *ngIf="!isEditing"
        [ngClass]="{'todo-complete': isComplete}"
        (click)="editItem()">
        {{todoItem.title}}
      </p>
      <todo-input
        *ngIf="isEditing"
        [value]="todoItem.title"></todo-input>
      <button
        class="btn btn-red"
        (click)="removeItem()">Remove</button>
    </div>
  `,
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() todoItem: any;
  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Output() saveEdit: EventEmitter<any> = new EventEmitter();
  isComplete = false;
  isEditing = false;

  constructor() { }

  ngOnInit() {
  }

  removeItem() {
    this.remove.emit(this.todoItem);
  }

  editItem() {
    this.isEditing = !this.isEditing;
  }

  completeItem() {
    this.isComplete = !this.isComplete;
  }

  submitEdit(event) {
    console.log('submit edit');
    this.saveEdit.emit(event);
    this.isEditing = false;
  }

}
