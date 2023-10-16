import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectToken } from 'src/app/core/auth.selectors';
import { products } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css'],
})
export class ExchangeComponent implements OnInit {
  constructor(
    private productsServices: ProductsService,
    private cartServices: CartService,
    private store: Store
  ) {}
  isModalOpen = false;

  productos: any[] = [];
  onModalStatus: boolean = false;
  statusModal: string = '';
  messageModal: string = '';
  typeUser: string = '';
  productosPorPaginaLargeScreen = 10;
  productosPorPaginaMediumScreen = 8;
  productosPorPaginaSmallScreen = 6;

  paginaActual = 1;

  // Variable para almacenar el tamaño de pantalla actual
  screenSize: string = '';

  ngOnInit(): void {
    this.detectScreenSize();
    this.productsServices.getAllProducts().subscribe({
      next: (res) => {
        this.productos = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.detectScreenSize();
  }

  detectScreenSize(): void {
    if (window.innerWidth >= 1024) {
      this.screenSize = 'large-screen';
    } else if (window.innerWidth >= 768) {
      this.screenSize = 'medium-screen';
    } else {
      this.screenSize = 'small-screen';
    }
  }

  get productosVisibles() {
    let cantidadPorPagina = 0;

    if (this.screenSize === 'large-screen') {
      cantidadPorPagina = this.productosPorPaginaLargeScreen;
    } else if (this.screenSize === 'medium-screen') {
      cantidadPorPagina = this.productosPorPaginaMediumScreen;
    } else {
      cantidadPorPagina = this.productosPorPaginaSmallScreen;
    }

    const inicio = (this.paginaActual - 1) * cantidadPorPagina;
    const fin = inicio + cantidadPorPagina;
    return this.productos.slice(inicio, fin);
  }

  get numerosDePagina() {
    let cantidadPorPagina = 0;

    if (this.screenSize === 'large-screen') {
      cantidadPorPagina = this.productosPorPaginaLargeScreen;
    } else if (this.screenSize === 'medium-screen') {
      cantidadPorPagina = this.productosPorPaginaMediumScreen;
    } else {
      cantidadPorPagina = this.productosPorPaginaSmallScreen;
    }

    const totalTarjetas = this.productos.length;
    const totalPaginas = Math.ceil(totalTarjetas / cantidadPorPagina);
    return Array.from({ length: totalPaginas }, (_, index) => index + 1);
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
