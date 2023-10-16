import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { products } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<[products]> {
    const url = `${this.apiUrl}/usuarios/products`;
    return this.http.get<[products]>(url);
  }

  confirmPurchase(token: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/usuarios/exchange`;
    const headers = new HttpHeaders({
      'x-access-token': token,
    });
    const options = { headers: headers };
    return this.http.post(url, data, options);
  }
}
