import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableConfirmOrderComponent } from './table-confirm-order.component';

describe('TableConfirmOrderComponent', () => {
  let component: TableConfirmOrderComponent;
  let fixture: ComponentFixture<TableConfirmOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableConfirmOrderComponent]
    });
    fixture = TestBed.createComponent(TableConfirmOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
