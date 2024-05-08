import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductsPostresService {
  products: any[] = [];
  url: string = "http://127.0.0.1:8000/";
  productUrl: string = "http://127.0.0.1:8000/productosCategoriaPostres"
  constructor(private http: HttpClient) { }
  
  getProductsPostres(): Observable<any> {
    return this.http.get(this.url + "productosCategoriaPostres?format=json")
  }

  getProductPostres() {
    return this.products;
  }

  
  editProductPostres(product: any): Observable<any> {
    const url = `${this.productUrl}/${product.id}`;
    return this.http.put<any>(url, product);
  }

  deleteProductPostres(productId: number): Observable<any> {
    const url = `${this.productUrl}/${productId}?format=json`;
    return this.http.delete<any>(url);
  }

  createProductPostres(productData: any): Observable<any> {
    return this.http.post(this.productUrl, productData);
  }

  saveProductsPostres() {
    localStorage.setItem('productos_carrito', JSON.stringify(this.products));
  }

  addProductToCartPostres(product: any) {
    this.products.push(product);
    this.saveProductsPostres();
  }

  loadProductsInCart() {
    this.products = JSON.parse(localStorage.getItem('productos_carrito') as any) || [];
  }

  productInCart(product: any) {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProductPostres(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id)

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveProductsPostres();
    }
  }

  clearProductsPostres() {
    this.products = [];
    localStorage.clear();
  }




}
