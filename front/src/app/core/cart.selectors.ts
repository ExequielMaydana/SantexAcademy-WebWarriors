import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState, CartItem } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');
export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);
