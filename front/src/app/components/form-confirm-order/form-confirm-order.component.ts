import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-form-confirm-order',
  templateUrl: './form-confirm-order.component.html',
  styleUrls: ['./form-confirm-order.component.css'],
})
export class FormConfirmOrderComponent {
  dataConfirmPurchase: FormGroup;
  onModalStatus: boolean = false;
  statusModal: string = '';
  messageModal: string = '';
  textBtnModal: string = '';
  constructor(
    private fb: FormBuilder,
    private cartServices: CartService,
    private productService: ProductsService
  ) {
    this.dataConfirmPurchase = this.fb.group({
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      location: ['', [Validators.required]],
      province: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
    });
  }

  confirmPurchase() {
    if (this.dataConfirmPurchase.valid) {
      const products = this.cartServices.getCartItems();
      const dataUser = this.dataConfirmPurchase.value;
      if (products && dataUser) {
        console.log({ products, dataUser });
        // this.cartServices.clearCart();
        this.onModalStatus = true;
        this.statusModal = 'success';
        this.messageModal =
          '¡Felicidades! Tu compra se ha realizado con éxito. Pronto procesaremos tu pedido y te enviaremos un correo electrónico con el código de seguimiento para que puedas rastrear tu paquete.';
      } else {
        this.statusModal = 'failed';
      }
    }
    return;
  }
}
