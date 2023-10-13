import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { products } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css'],
})
export class ConfirmOrderComponent implements OnInit {
  products: products[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.products = cartItems;
      this.calculateTotal();
    });
  }

  removeProductCart(idProduct: number) {
    this.cartService.removeFromCart(idProduct);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.products.reduce((acc: any, item: any) => {
      return acc + item.product.costInHours * item.quantity;
    }, 0);
  }
}
