import { createReducer, on } from "@ngrx/store";
import { addMore, addToCart, loadCart, removeCart, } from "./cart.actions";
import { Product } from "../services/product.service";
import { AppState } from "./app.state";

export const initialState: AppState = {
    cart: []
}

export const cartReducer = createReducer(
    initialState,
    on(loadCart, (state: AppState) => {
        const cart = localStorage.getItem("cart")
        return { ...state, cart: cart ? JSON.parse(cart) : [] }
    }),
    on(addToCart, (state: AppState, product) => {
        const cart: Product[] = [...state.cart, { ...product, cart: 1 }];
        localStorage.setItem("cart", JSON.stringify(cart));
        return { ...state, cart }
    }),
    on(addMore, (state: AppState, { id, count }) => {
        const cart: Product[] = state.cart.map((item) =>
            item.id === id ? { ...item, cart: count } : item
        )
        localStorage.setItem("cart", JSON.stringify(cart));
        return { ...state, cart }
    }),
    on(removeCart, (state: AppState, { id }) => {
        const cart: Product[] = state.cart.filter((item) => item.id !== id)
        localStorage.setItem("cart", JSON.stringify(cart));
        return { ...state, cart }
    }),
)