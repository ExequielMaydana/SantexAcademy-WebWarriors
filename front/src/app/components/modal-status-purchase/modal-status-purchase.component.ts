import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-status-purchase',
  templateUrl: './modal-status-purchase.component.html',
  styleUrls: ['./modal-status-purchase.component.css'],
})
export class ModalStatusPurchaseComponent {
  @Input() status: string = '';
  @Input() message: string = '';
  @Output() closeModalStatus = new EventEmitter();

  closeModal() {
    this.closeModalStatus.emit();
    window.location.reload();
  }
}
