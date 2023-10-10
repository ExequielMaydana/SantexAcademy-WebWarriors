import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStatusCartComponent } from './modal-status-cart.component';

describe('ModalStatusCartComponent', () => {
  let component: ModalStatusCartComponent;
  let fixture: ComponentFixture<ModalStatusCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalStatusCartComponent]
    });
    fixture = TestBed.createComponent(ModalStatusCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
