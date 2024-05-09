import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductsPastasService {
  products: any[] = [];
  url: string = "http://127.0.0.1:8000/";
  productUrl: string = "http://127.0.0.1:8000/productosCategoriaPastas"
  constructor(private http: HttpClient) { }

  getProductsPastas(): Observable<any> {
    return this.http.get(this.url + "productosCategoriaPastas?format=json")
  }

  getProductPastas() {
    return this.products;
  }

  
  editProductPastas(product: any): Observable<any> {
    const url = `${this.productUrl}/${product.id}`;
    return this.http.put<any>(url, product);
  }

  deleteProductPastas(productId: number): Observable<any> {
    const url = `${this.productUrl}/${productId}?format=json`;
    return this.http.delete<any>(url);
  }

  createProductPastas(productData: any): Observable<any> {
    return this.http.post(this.productUrl, productData);
  }

  saveProductsPastas() {
    localStorage.setItem('productos_carrito', JSON.stringify(this.products));
  }

  addProductToCartPastas(product: any) {
    this.products.push(product);
    this.saveProductsPastas();
  }

  loadProductsInCart() {
    this.products = JSON.parse(localStorage.getItem('productos_carrito') as any) || [];
  }

  productInCart(product: any) {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProductPastas(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id)

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveProductsPastas();
    }
  }

  clearProductsPastas() {
    this.products = [];
    localStorage.clear();
  }

}
