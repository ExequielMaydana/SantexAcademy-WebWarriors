import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-status-cart',
  templateUrl: './modal-status-cart.component.html',
  styleUrls: ['./modal-status-cart.component.css'],
})
export class ModalStatusCartComponent {
  @Input() status: string = '';
  @Input() message: string = '';
  @Output() closeModalStatus = new EventEmitter();

  closeModal() {
    this.closeModalStatus.emit();
  }
}
