import { TestBed } from '@angular/core/testing';

import { GetProductsEnsaladasService } from './get-products-ensaladas.service';

describe('GetProductsEnsaladasService', () => {
  let service: GetProductsEnsaladasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProductsEnsaladasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
