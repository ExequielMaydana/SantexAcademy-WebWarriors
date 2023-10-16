import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectToken } from 'src/app/core/auth.selectors';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-form-confirm-order',
  templateUrl: './form-confirm-order.component.html',
  styleUrls: ['./form-confirm-order.component.css'],
})
export class FormConfirmOrderComponent implements OnInit {
  dataConfirmPurchase: FormGroup;
  onModalStatus: boolean = false;
  statusModal: string = '';
  messageModal: string = '';
  textBtnModal: string = '';
  constructor(
    private fb: FormBuilder,
    private cartServices: CartService,
    private productService: ProductsService,
    private store: Store,
    private router: Router
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

  ngOnInit(): void {
    const products = this.cartServices.getCartItems();
    if (products.length === 0) {
      // Si no hay productos en el carrito, redirige al usuario a la página de inicio
      this.router.navigate(['/']); // Ajusta la ruta de redirección según tu configuración
    }
  }

  confirmPurchase() {
    const products = this.cartServices.getCartItems();
    const data = {
      productInfo: [...products],
    };
    this.store.select(selectToken).subscribe((token) => {
      if (token) {
        this.productService.confirmPurchase(token, data).subscribe({
          next: (res) => {
            console.log(res);
            this.onModalStatus = true;
            this.statusModal = 'success';
            this.messageModal =
              '¡Felicidades! Tu compra se ha realizado con éxito. Pronto procesaremos tu pedido y te enviaremos un correo electrónico con el código de seguimiento para que puedas rastrear tu paquete.';
            this.cartServices.clearCart();
          },
          error: (err) => {
            console.log(err);

            this.statusModal = 'failed';
          },
        });
      }
    });
  }
}
