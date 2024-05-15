
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  reservas: any[] = [];
  url: string = "http://127.0.0.1:8000/";
  reservasUrl: string = "http://127.0.0.1:8000/reservas"
  constructor(private http: HttpClient) { }

  
  getReservas(): Observable<any> {
    return this.http.get(this.url + "reservas?format=json")
  }

  getReserva() {
    return this.reservas;
  }

  editReserva(reserva: any): Observable<any> {
    const url = `${this.reservasUrl}/${reserva.id}`;
    return this.http.put<any>(url, reserva);
  }

  deleteReserva(reservaId: number): Observable<any> {
    const url = `${this.reservasUrl}/${reservaId}?format=json`;
    return this.http.delete<any>(url);
  }

  createReserva(productData: any): Observable<any> {
    return this.http.post(this.reservasUrl, productData);
  }




}
