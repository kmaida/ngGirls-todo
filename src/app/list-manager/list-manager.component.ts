import { TodoListService } from './../todo-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-list-manager',
  template: `
  <div class="todo-app">
    <h1>
      {{title}}
    </h1>

    <div class="todo-add">
      <todo-input (submit)="addItem($event)"></todo-input>
    </div>
    <ul>
      <li *ngFor="let item of todoList">
        <todo-item
          [todoItem]="item"
          (remove)="removeItem($event)"></todo-item>
      </li>
    </ul>
  </div>
  `,
  styleUrls: ['./list-manager.component.css']
})
export class ListManagerComponent implements OnInit {
  title = 'todo';
  todoList: any;

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
    this.todoList = this.todoListService.getTodoList();
  }

  addItem(title: string): void {
    this.todoList = this.todoListService.addItem({title});
  }

  removeItem(item) {
    this.todoList = this.todoListService.removeItem(item);
  }

}
