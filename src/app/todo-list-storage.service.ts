import { Injectable } from '@angular/core';

const storageName = 'ahh_todo_list';
const defaultList = [
  { title: 'install NodeJS' },
  { title: 'install Angular CLI' },
  { title: 'create new app' },
  { title: 'serve app' },
  { title: 'develop app' },
  { title: 'deploy app' },
];

@Injectable()
export class TodoListStorageService {
  private todoList;

  constructor() {
    this.todoList = JSON.parse(localStorage.getItem(storageName)) || defaultList;
  }

  // get items
  get(): any[] {
    console.log([...this.todoList]);
    return [...this.todoList];
  }

  // add a new item
  post(item): any[] {
    this.todoList.push(item);
    return this.update();
  }

  // synchronize localStorage with the current list
  private update(): any[] {
    localStorage.setItem(storageName, JSON.stringify(this.todoList));
    return this.get();
  }

  // find index of an item in the array
  private findItemIndex(item): number {
    return this.todoList.indexOf(item);
  }

  // update an item
  put(item, changes): any[] {
    Object.assign(this.todoList[this.findItemIndex(item)], changes);
    return this.update();
  }

  // remove an item
  destroy(item): any[] {
    this.todoList.splice(this.findItemIndex(item), 1);
    return this.update();
  }

}
