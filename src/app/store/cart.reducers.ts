import { createReducer, on } from "@ngrx/store";
import { addToCart, removeFromCart, } from "./cart.actions";
import { Product } from "../services/product.service";
import { AppState } from "./app.state";

export const initialState: AppState = {
    cart: []
}

export const cartReducer = createReducer(
    initialState,
    on(addToCart, (state: AppState, item) => {
        return { ...state, cart: [...state.cart, item] }
    }),
    // on(removeFromCart, state => state + 1)
)