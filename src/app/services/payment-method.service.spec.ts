import {TestBed} from '@angular/core/testing';

import {PaymentMethodService} from './payment-method.service';

describe('PaymentMethodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentMethodService = TestBed.get(PaymentMethodService);
    expect(service).toBeTruthy();
  });
});
