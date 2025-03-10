import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, delay } from 'rxjs/operators';
import { loadTodos, loadTodosSuccess, loadTodosFailure } from './todo.actions';
import { Todo } from './todo.model';

@Injectable()
export class TodoEffects {
    loadTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTodos),
            mergeMap(() => {
                delay(30000)
                const todos = localStorage.getItem("todos")
                return of(todos ? JSON.parse(todos) : [] as Todo[]).pipe(
                    map((todos) => loadTodosSuccess({ todos })),
                    catchError((error) => of(loadTodosFailure({ error })))
                )
            })
        ),
        { functional: true }
    );

    constructor(private actions$: Actions) { }
}