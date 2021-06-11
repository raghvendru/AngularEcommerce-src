import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCompComponent } from './checkout-comp.component';

describe('CheckoutCompComponent', () => {
  let component: CheckoutCompComponent;
  let fixture: ComponentFixture<CheckoutCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
