import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

export const selectFeatureState = createFeatureSelector<AppState>('cart');

export const cartCount = createSelector(
    selectFeatureState,
    (state) => state.cart.length
);

export const cartList = createSelector(
    selectFeatureState,
    (state) => state.cart
);
