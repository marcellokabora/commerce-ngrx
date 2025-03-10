import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';
import { addTodo, toggleTodo, removeTodo, loadTodos } from './todo.actions';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, AsyncPipe, FormsModule],
  template: `
    <h1>Todo List</h1>
    <input type="text" [(ngModel)]="newTodoText" placeholder="Add new todo" />
    <button (click)="addTodo()">Add</button>
     @if(!(todos$ | async)){
      <div>Loading...</div>
    }@else {
    <ul>
      <li *ngFor="let todo of todos$ | async">
        <input type="checkbox" [checked]="todo.completed" (change)="toggleTodo(todo.id)" />
        <span [style.textDecoration]="todo.completed ? 'line-through' : 'none'">{{ todo.text }}</span>
        <button (click)="removeTodo(todo.id)">Remove</button>
      </li>
    </ul>
    }
  `,
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]>;
  newTodoText = '';

  constructor(private store: Store<{ todos: Todo[] }>) {
    this.todos$ = this.store.select((state) => state.todos);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  addTodo(): void {
    if (this.newTodoText.trim()) {
      this.store.dispatch(addTodo({ text: this.newTodoText }));
      this.newTodoText = '';
    }
  }

  toggleTodo(id: number): void {
    this.store.dispatch(toggleTodo({ id }));
  }

  removeTodo(id: number): void {
    this.store.dispatch(removeTodo({ id }));
  }
}