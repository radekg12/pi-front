import {TestBed} from '@angular/core/testing';

import {OrderStatusService} from './order-status.service';

describe('OrderStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderStatusService = TestBed.get(OrderStatusService);
    expect(service).toBeTruthy();
  });
});
