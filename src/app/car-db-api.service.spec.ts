import { TestBed } from '@angular/core/testing';

import { CarDbApiService } from './car-db-api.service';

describe('CarDbApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarDbApiService = TestBed.get(CarDbApiService);
    expect(service).toBeTruthy();
  });
});
