import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orderUrl: string = "http://127.0.0.1:8000/pedido"

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get(this.orderUrl + "?format=json")
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post(this.orderUrl, orderData);
  }

}
