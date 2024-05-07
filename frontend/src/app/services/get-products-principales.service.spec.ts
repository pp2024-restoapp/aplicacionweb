import { TestBed } from '@angular/core/testing';

import { GetProductsPrincipalesService } from './get-products-principales.service';

describe('GetProductsPrincipalesService', () => {
  let service: GetProductsPrincipalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProductsPrincipalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
