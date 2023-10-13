import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfirmOrderComponent } from './form-confirm-order.component';

describe('FormConfirmOrderComponent', () => {
  let component: FormConfirmOrderComponent;
  let fixture: ComponentFixture<FormConfirmOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormConfirmOrderComponent]
    });
    fixture = TestBed.createComponent(FormConfirmOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
