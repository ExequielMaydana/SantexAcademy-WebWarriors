import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, clearCart } from './cart.actions';

export interface CartItem {
  id: number;
  name: string;
  costInHours: number;
  stock: number;
  image?: {
    imageUrl: string;
    publicId: string;
  };
}

export interface CartState {
  items: { product: CartItem; quantity: number }[];
}

const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { item }) => {
    // Verificamos si el producto ya existe en el carrito.
    const existingItem = state.items.find(
      (cartItem) => cartItem.product.id === item.id
    );

    if (existingItem) {
      // Si el producto ya existe, incrementamos la cantidad.
      const updatedItems = state.items.map((cartItem) => {
        if (cartItem.product.id === item.id) {
          return { product: cartItem.product, quantity: cartItem.quantity + 1 };
        } else {
          return cartItem;
        }
      });

      return {
        ...state,
        items: updatedItems,
      };
    } else {
      // Si el producto no existe en el carrito, lo añadimos con cantidad 1.
      return {
        ...state,
        items: [...state.items, { product: item, quantity: 1 }],
      };
    }
  }),
  on(removeFromCart, (state, { itemId }) => ({
    ...state,
    items: state.items.filter((cartItem) => cartItem.product.id !== itemId),
  })),
  on(clearCart, (state) => ({
    ...state,
    items: [],
  }))
);
