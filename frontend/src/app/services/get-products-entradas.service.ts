import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductsEntradasService {
  products: any[] = [];
  url: string = "http://127.0.0.1:8000/";
  productUrl: string = "http://127.0.0.1:8000/productosCategoriaEntradas"
  constructor(private http: HttpClient) { }
  
  getProductsEntradas(): Observable<any> {
    return this.http.get(this.url + "productosCategoriaEntradas?format=json")
  }

  getProductEntradas() {
    return this.products;
  }

  
  editProductEntradas(product: any): Observable<any> {
    const url = `${this.productUrl}/${product.id}`;
    return this.http.put<any>(url, product);
  }

  deleteProductEntradas(productId: number): Observable<any> {
    const url = `${this.productUrl}/${productId}?format=json`;
    return this.http.delete<any>(url);
  }

  createProductEntradas(productData: any): Observable<any> {
    return this.http.post(this.productUrl, productData);
  }

  saveProductsEntradas() {
    localStorage.setItem('productos_carrito', JSON.stringify(this.products));
  }

  addProductToCartEntradas(product: any) {
    this.products.push(product);
    this.saveProductsEntradas();
  }

  loadProductsInCart() {
    this.products = JSON.parse(localStorage.getItem('productos_carrito') as any) || [];
  }

  productInCart(product: any) {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProductEntradas(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id)

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveProductsEntradas();
    }
  }

  clearProductsEntradas() {
    this.products = [];
    localStorage.clear();
  }
}
