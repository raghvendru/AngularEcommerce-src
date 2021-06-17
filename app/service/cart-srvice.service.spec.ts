import { TestBed } from '@angular/core/testing';

import { CartSrviceService } from './cart-srvice.service';

describe('CartSrviceService', () => {
  let service: CartSrviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartSrviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
