import { createAction, props } from "@ngrx/store";
import { Product } from "../services/product.service";

export const addToCart = createAction("[Item] Add To Cart", props<Product>());
export const removeFromCart = createAction("[Item] Remove From Cart", props<{ id: string }>());