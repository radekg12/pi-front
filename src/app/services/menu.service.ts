import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category-group.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService implements OnInit {

  private baseURL = `${environment.apiUrl}/menu`;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getMenuCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseURL);
  }

  getCategoryBySubcategoryId(subcategoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseURL}/subcategory/${subcategoryId}`);
  }
}
