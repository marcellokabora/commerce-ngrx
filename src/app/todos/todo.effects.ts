// store/todo.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { loadTodos, loadTodosSuccess, loadTodosFailure } from './todo.actions';
import { Todo } from './todo.model';

@Injectable()
export class TodoEffects {
    loadTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTodos),
            mergeMap(() => {

                const todos = localStorage.getItem("todos")
                return of(todos ? JSON.parse(todos) : [] as Todo[]).pipe(
                    map((todos) => loadTodosSuccess({ todos })),
                    catchError((error) => of(loadTodosFailure({ error })))
                )

                // return of([
                //     { id: 1, text: 'Learn Angular', completed: false },
                //     { id: 2, text: 'Learn NgRx', completed: true },
                // ] as Todo[]).pipe(
                //     map((todos) => loadTodosSuccess({ todos })),
                //     catchError((error) => of(loadTodosFailure({ error })))
                // )

            })
        ),
        { functional: true }
    );

    constructor(private actions$: Actions) { }
}