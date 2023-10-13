import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStatusPurchaseComponent } from './modal-status-purchase.component';

describe('ModalStatusPurchaseComponent', () => {
  let component: ModalStatusPurchaseComponent;
  let fixture: ComponentFixture<ModalStatusPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalStatusPurchaseComponent]
    });
    fixture = TestBed.createComponent(ModalStatusPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
