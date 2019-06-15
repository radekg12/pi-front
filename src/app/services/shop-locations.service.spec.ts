import {TestBed} from '@angular/core/testing';

import {ShopLocationsService} from './shop-locations.service';

describe('ShopLocationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopLocationsService = TestBed.get(ShopLocationsService);
    expect(service).toBeTruthy();
  });
});
