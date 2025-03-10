import { createAction, props } from "@ngrx/store";
import { Product } from "../services/product.service";

export const loadCart = createAction('[cart] Load');
export const addToCart = createAction("[cart] Add", props<Product>());
export const removeFromCart = createAction("[cart] Remove", props<{ id: string }>());