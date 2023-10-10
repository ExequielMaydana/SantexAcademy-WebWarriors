// cart.actions.ts

import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.reducer';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ item: CartItem }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ itemId: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');
