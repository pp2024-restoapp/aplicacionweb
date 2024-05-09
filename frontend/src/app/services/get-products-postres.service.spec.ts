import { TestBed } from '@angular/core/testing';

import { GetProductsPostresService } from './get-products-postres.service';

describe('GetProductsPostresService', () => {
  let service: GetProductsPostresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProductsPostresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
