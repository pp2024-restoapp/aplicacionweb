import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductsBebidasService {

  products: any[] = [];
  url: string = "http://127.0.0.1:8000/";
  productUrl: string = "http://127.0.0.1:8000/productosCategoriaBebidas"
  constructor(private http: HttpClient) { }

  getProductsBebidas(): Observable<any> {
    return this.http.get(this.url + "productosCategoriaBebidas?format=json")
  }

  getProductBebidas() {
    return this.products;
  }

  
  editProductBebidas(product: any): Observable<any> {
    const url = `${this.productUrl}/${product.id}`;
    return this.http.put<any>(url, product);
  }

  deleteProductBebidas(productId: number): Observable<any> {
    const url = `${this.productUrl}/${productId}?format=json`;
    return this.http.delete<any>(url);
  }

  createProductBebidas(productData: any): Observable<any> {
    return this.http.post(this.productUrl, productData);
  }

  saveProductsBebidas() {
    localStorage.setItem('productos_carrito', JSON.stringify(this.products));
  }

  addProductToCartBebidas(product: any) {
    this.products.push(product);
    this.saveProductsBebidas();
  }

  loadProductsInCart() {
    this.products = JSON.parse(localStorage.getItem('productos_carrito') as any) || [];
  }

  productInCart(product: any) {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProductBebidas(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id)

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveProductsBebidas();
    }
  }

  clearProductsBebidas() {
    this.products = [];
    localStorage.clear();
  }

}
