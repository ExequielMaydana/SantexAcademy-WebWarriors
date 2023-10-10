import { Component, EventEmitter, Input, Output } from '@angular/core';
import { products } from 'src/app/models/product.model';

@Component({
  selector: 'app-table-confirm-order',
  templateUrl: './table-confirm-order.component.html',
  styleUrls: ['./table-confirm-order.component.css'],
})
export class TableConfirmOrderComponent {
  @Input() products: products[] = [];
  @Input() subtotal: number = 0;
  @Output() deleteProduct = new EventEmitter();

  DelProduct(idProduct: number) {
    this.deleteProduct.emit(idProduct);
  }
}
