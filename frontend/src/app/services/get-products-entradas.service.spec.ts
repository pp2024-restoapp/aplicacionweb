import { TestBed } from '@angular/core/testing';

import { GetProductsEntradasService } from './get-products-entradas.service';

describe('GetProductsEntradasService', () => {
  let service: GetProductsEntradasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProductsEntradasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
