import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, delay } from 'rxjs/operators';
import { loadCart } from './cart.actions';
import { Product } from '../services/product.service';

@Injectable()
export class TodoEffects {
    loadCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCart),
            mergeMap(() => {
                const cart = localStorage.getItem("cart")
                return of(cart ? JSON.parse(cart) : [] as Product[]).pipe(
                    // map((todos) => loadTodosSuccess({ todos })),
                    // catchError((error) => of(loadTodosFailure({ error })))
                )
            })
        ),
        { functional: true }
    );

    constructor(private actions$: Actions) { }
}