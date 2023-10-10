import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Output() closeCart = new EventEmitter();
  items: any = [];
  quantityProduct: number = 1;
  message: string = '';
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.items = cartItems;
      this.calculateTotal();
    });
  }

  closeCartUser() {
    this.closeCart.emit();
  }

  removeProductCart(idProduct: number) {
    this.cartService.removeFromCart(idProduct);
  }

  sumQuantityProduct(item: any, stockProduct: number) {
    if (item.quantity < stockProduct) {
      item.quantity++;
      this.calculateTotal();
    } else {
      this.message = 'Has llegado al stock máximo de este producto.';
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  }

  resQuantityProduct(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotal();
    } else if (item.quantity === 1) {
      this.message = 'Como mínimo debes llevar un producto de cada tipo.';
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  }

  calculateTotal() {
    this.total = this.items.reduce((acc: any, item: any) => {
      return acc + item.product.costInHours * item.quantity;
    }, 0);
  }
}
