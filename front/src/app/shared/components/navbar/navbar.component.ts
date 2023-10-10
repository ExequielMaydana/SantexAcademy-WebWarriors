import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { OrgServicesService } from '../../../services/org-services.service';
import { Store } from '@ngrx/store';
import { selectToken, selectUserType } from '../../../core/auth.selectors';
import { resetToken, resetUserType } from '../../../core/auth.actions';
import { CartService } from 'src/app/modules/home/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isOpen: boolean = false;
  openOptionOne: boolean = false;
  openOptionTwo: boolean = false;
  maxHeight: number = 500;
  isToken: boolean = false;
  isOpenprofileMenu: boolean = false;
  dataUser: any = {};
  openCart: boolean = false;
  cartItemCount: number = 0;
  constructor(
    private usersServices: UsersService,
    private orgServices: OrgServicesService,
    private store: Store,
    private cartService: CartService
  ) {
    const isOpenValue = localStorage.getItem('isOpen');
    if (isOpenValue !== null) {
      this.isOpen = JSON.parse(isOpenValue);
    }

    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItemCount = cartItems.length;
    });
  }

  handleMenu() {
    this.isOpen = !this.isOpen;
    localStorage.setItem('isOpen', JSON.stringify(this.isOpen));
  }

  openOpOne() {
    if (!this.openOptionOne) {
      this.openOptionOne = true;
      this.openOptionTwo = false;
    } else {
      this.openOptionOne = false;
    }
  }
  openOpTwo() {
    if (!this.openOptionTwo) {
      this.openOptionTwo = true;
      this.openOptionOne = false;
    } else {
      this.openOptionTwo = false;
    }
  }

  ngOnInit() {
    this.store.select(selectToken).subscribe((token) => {
      if (token) {
        this.store.select(selectUserType).subscribe((userType) => {
          if (userType === 'vol') {
            this.usersServices.getProfileVolunteer(token).subscribe({
              next: (res) => {
                this.dataUser = res;
                this.isToken = true;
              },
              error: (err) => {
                console.log(err);
              },
              complete: () => {},
            });
          } else if (userType === 'org') {
            this.orgServices.getProfileOrganization(token).subscribe({
              next: (res) => {
                this.dataUser = res;
                this.isToken = true;
              },
              error: (err) => {
                console.log(err);
              },
              complete: () => {},
            });
          }
        });
      }
    });
  }

  logout() {
    this.store.dispatch(resetToken());
    this.store.dispatch(resetUserType());
    window.location.reload();
  }

  openProfileMenu() {
    this.isOpenprofileMenu = !this.isOpenprofileMenu;
  }

  openCartProducts() {
    this.openCart = !this.openCart;
  }
}
