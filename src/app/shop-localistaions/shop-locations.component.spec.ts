import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopLocationsComponent} from './shop-locations.component';

describe('ShopLocationsComponent', () => {
  let component: ShopLocationsComponent;
  let fixture: ComponentFixture<ShopLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShopLocationsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
