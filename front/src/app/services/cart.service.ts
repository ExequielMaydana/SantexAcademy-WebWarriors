import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    this.loadCartFromLocalStorage();
  }

  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$: Observable<any[]> = this.cartItemsSubject.asObservable();

  private loadCartFromLocalStorage() {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!Array.isArray(cartItems)) {
      // Si los datos no son un array válido, establecer un array vacío.
      localStorage.setItem('cart', '[]');
      this.cartItemsSubject.next([]);
    } else {
      this.cartItemsSubject.next(cartItems);
    }
  }

  getCartItems(): any[] {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  }

  addToCart(product: any) {
    let cartItems: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log(cartItems);

    // Buscar si el producto ya está en el carrito
    const existingItem = cartItems?.find(
      (item) => item.product.productId === product.productId
    );

    if (existingItem) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      existingItem.quantity++;
    } else {
      // Si no está en el carrito, agregarlo con cantidad 1
      cartItems.push({ product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    this.cartItemsSubject.next(cartItems);
  }

  removeFromCart(productId: number) {
    let cartItems: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cartItems.filter(
      (item) => item.product.id !== productId
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.cartItemsSubject.next(updatedCart);
  }

  clearCart() {
    const emptyCart: any[] = [];
    localStorage.removeItem('cart');
    this.cartItemsSubject.next(emptyCart); // Emitir cambios aquí
  }
}
