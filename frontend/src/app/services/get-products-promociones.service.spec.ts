import { TestBed } from '@angular/core/testing';

import { GetProductsPromocionesService } from './get-products-promociones.service';

describe('GetProductsPromocionesService', () => {
  let service: GetProductsPromocionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProductsPromocionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
