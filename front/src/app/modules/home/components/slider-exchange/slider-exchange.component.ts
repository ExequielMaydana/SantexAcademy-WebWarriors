import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { products } from '../../models/products.model';
import { CartService } from '../../../../services/cart.service';
import { Store } from '@ngrx/store';
import { selectToken, selectUserType } from 'src/app/core/auth.selectors';

@Component({
  selector: 'app-slider-exchange',
  templateUrl: './slider-exchange.component.html',
  styleUrls: ['./slider-exchange.component.css'],
})
export class SliderExchangeComponent implements OnInit {
  isModalOpen = false;
  dataProducts: products[] = [];
  onModalStatus: boolean = false;
  statusModal: string = '';
  messageModal: string = '';
  typeUser: string = '';
  constructor(
    private productsServices: ProductsService,
    private cartServices: CartService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.productsServices.getAllProducts().subscribe({
      next: (res) => {
        this.dataProducts = res.slice(0, 10);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.store.select(selectUserType).subscribe((userType) => {
      if (userType) {
        this.typeUser = userType;
      }
    });
  }

  openModal(): void {
    this.store.select(selectToken).subscribe((token) => {
      if (token) {
        this.isModalOpen = true;
      }
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  addToCart(product: products) {
    this.store.select(selectToken).subscribe((token) => {
      if (!token) {
        this.isModalOpen = true;
      } else {
        this.cartServices.addToCart(product);
        this.onModalStatus = true;
        this.statusModal = 'success';
        this.messageModal =
          '¡Excelente elección! Has agregado el producto al carrito con éxito. Tu selección se encuentra ahora en tu carrito de compras, listo para ser procesado.';
        setTimeout(() => {
          this.onModalStatus = false;
        }, 2000);
      }
    });
  }
}
