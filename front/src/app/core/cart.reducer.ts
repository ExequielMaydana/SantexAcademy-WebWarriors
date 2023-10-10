// carrito.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, clearCart } from './cart.actions';

export interface CartItem {
  id: number;
  name: string;
  costInHours: number;
  stock: number;
  image: {
    imageUrl: string;
    publicId: string;
  };
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
  })),
  on(removeFromCart, (state, { itemId }) => ({
    ...state,
    items: state.items.filter((item) => item.id !== itemId),
  })),
  on(clearCart, (state) => ({
    ...state,
    items: [],
  }))
);
