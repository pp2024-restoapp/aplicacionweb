import { TestBed } from '@angular/core/testing';

import { GetProductsPastasService } from './get-products-pastas.service';

describe('GetProductsPastasService', () => {
  let service: GetProductsPastasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProductsPastasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
