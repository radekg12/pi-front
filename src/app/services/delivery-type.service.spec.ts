import {TestBed} from '@angular/core/testing';

import {DeliveryTypeService} from './delivery-type.service';

describe('DeliveryTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeliveryTypeService = TestBed.get(DeliveryTypeService);
    expect(service).toBeTruthy();
  });
});
