import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductsPrincipalesService {
  products: any[] = [];
  url: string = "http://127.0.0.1:8000/";
  productUrl: string = "http://127.0.0.1:8000/productosCategoriaPrincipal"
  constructor(private http: HttpClient) { }

  getProductsPrincipales(): Observable<any> {
    return this.http.get(this.url + "productosCategoriaPrincipal?format=json")
  }

  getProductPrincipales() {
    return this.products;
  }

  
  editProductPrincipales(product: any): Observable<any> {
    const url = `${this.productUrl}/${product.id}`;
    return this.http.put<any>(url, product);
  }

  deleteProductPrincipales(productId: number): Observable<any> {
    const url = `${this.productUrl}/${productId}?format=json`;
    return this.http.delete<any>(url);
  }

  createProductPrincipales(productData: any): Observable<any> {
    return this.http.post(this.productUrl, productData);
  }

  saveProductsPrincipales() {
    localStorage.setItem('productos_carrito', JSON.stringify(this.products));
  }

  addProductToCartPrincipales(product: any) {
    this.products.push(product);
    this.saveProductsPrincipales();
  }

  loadProductsInCart() {
    this.products = JSON.parse(localStorage.getItem('productos_carrito') as any) || [];
  }

  productInCart(product: any) {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProductPrincipales(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id)

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveProductsPrincipales();
    }
  }

  clearProductsPrincipales() {
    this.products = [];
    localStorage.clear();
  }


}
