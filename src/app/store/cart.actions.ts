import { createAction, props } from "@ngrx/store";
import { Product } from "../services/product.service";

export const loadCart = createAction('[Cart] Load');
export const addToCart = createAction("[Cart] Add", props<Product>());
export const removeCart = createAction("[Cart] Remove", props<{ id: number }>());
export const addMore = createAction("[Cart] More", props<{ id: number, count: number }>());
