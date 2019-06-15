import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Location} from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class ShopLocationsService {
  private baseUrl = `${environment.apiUrl}/shops`;

  constructor(private http: HttpClient) {
  }

  getLocations(customerLocation: Location): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.baseUrl}/${customerLocation.lat}-${customerLocation.lng}`);
  }
}
