import {TestBed, getTestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {AuthenticationService} from './authentication.service';

describe('AuthenticationService', () => {
  let injector: TestBed;
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthenticationService]
    });

    injector = getTestBed();
    service = injector.get(AuthenticationService);
    httpMock = injector.get(HttpTestingController)

    var localStore = {};
    var sessionStore = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return localStore[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return localStore[key] = <string>value;
    });
  
    spyOn(sessionStorage, 'getItem').and.callFake((key: string): string => {
      return sessionStore[key] || null;
    });

    spyOn(sessionStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return sessionStore[key] = <string>value;
    });
  
    
  });

  afterEach(() => {
    httpMock.verify()
  });


  it('register should return an Observable<Customer>', () => {
    const dummyCustomer = {
      id: 0, firstName: "Jan", 
      lastName: "Kowalski", 
      phoneNumber: "683-324-231",
      email: "jan@jan.com", 
      address: {id: 0, street: "Kolorowa", city: "Łodz", postcode: "29-213"}
    }

    const url = `${service.baseURL}/enrollment`
    service.register(dummyCustomer).subscribe(customer => {
        expect(customer).toEqual(dummyCustomer);
    });
    
    const req = httpMock.expectOne(url);
    expect(req.request.url).toBe(url);
    expect(req.request.body).toEqual(dummyCustomer);
    
    req.flush(dummyCustomer);
  });
  
  it('username should be save in local storage when remember me has been choosed', () => {
    const user = "jan"
    service.storeAuthenticationToken('jan', true);
    expect(localStorage.getItem('currentUser')).toEqual(user);
    expect(sessionStorage.getItem('currentUser')).toEqual(null);
  })
  
  it('username should be save in local storage when remember me has not been choosed', () => {
    const user = "jan"
    service.storeAuthenticationToken(user, false);
    expect(localStorage.getItem('currentUser')).toEqual(null);
    expect(sessionStorage.getItem('currentUser')).toEqual(user);
  })

});
