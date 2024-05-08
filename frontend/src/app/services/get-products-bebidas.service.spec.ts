import { TestBed } from '@angular/core/testing';

import { GetProductsBebidasService } from './get-products-bebidas.service';

describe('GetProductsBebidasService', () => {
  let service: GetProductsBebidasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProductsBebidasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
