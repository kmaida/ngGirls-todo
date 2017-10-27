import { AuthService } from './auth.service';
import { TodoListStorageService } from './todo-list-storage.service';
import { TodoListService } from './todo-list.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { ItemComponent } from './item/item.component';
import { ListManagerComponent } from './list-manager/list-manager.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ItemComponent,
    ListManagerComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    TodoListService,
    TodoListStorageService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
