import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  products: any[] = [];
  url: string = "http://127.0.0.1:8000/";
  productUrl: string = "http://127.0.0.1:8000/producto"
  constructor(private http: HttpClient) { }


  getProducts(): Observable<any> {
    return this.http.get(this.url + "producto?format=json")
  }

  getProduct() {
    return this.products;
  }

  editProduct(product: any): Observable<any> {
    const url = `${this.productUrl}/${product.id}`;
    return this.http.put<any>(url, product);
  }

  deleteProduct(productId: number): Observable<any> {
    const url = `${this.productUrl}/${productId}?format=json`;
    return this.http.delete<any>(url);
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post(this.productUrl, productData);
  }

  saveProducts() {
    localStorage.setItem('productos_carrito', JSON.stringify(this.products));
  }

  addProductToCart(product: any) {
    this.products.push(product);
    this.saveProducts();
  }

  loadProductsInCart() {
    this.products = JSON.parse(localStorage.getItem('productos_carrito') as any) || [];
  }

  productInCart(product: any) {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id)

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveProducts();
    }
  }

  clearProducts() {
    this.products = [];
    localStorage.clear();
  }
}
