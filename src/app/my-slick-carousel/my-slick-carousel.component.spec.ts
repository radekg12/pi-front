import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MySlickCarouselComponent} from './my-slick-carousel.component';

describe('MySlickCarouselComponent', () => {
  let component: MySlickCarouselComponent;
  let fixture: ComponentFixture<MySlickCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MySlickCarouselComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySlickCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
