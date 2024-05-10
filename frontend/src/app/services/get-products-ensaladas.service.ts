import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductsEnsaladasService {

  products: any[] = [];
  url: string = "http://127.0.0.1:8000/";
  productUrl: string = "http://127.0.0.1:8000/productosCategoriaEnsaladas"
  constructor(private http: HttpClient) { }

  getProductsEnsaladas(): Observable<any> {
    return this.http.get(this.url + "productosCategoriaEnsaladas?format=json")
  }

  getProductEnsaladas() {
    return this.products;
  }

  
  editProductEnsaladas(product: any): Observable<any> {
    const url = `${this.productUrl}/${product.id}`;
    return this.http.put<any>(url, product);
  }

  deleteProductEnsaladas(productId: number): Observable<any> {
    const url = `${this.productUrl}/${productId}?format=json`;
    return this.http.delete<any>(url);
  }

  createProductEnsaladas(productData: any): Observable<any> {
    return this.http.post(this.productUrl, productData);
  }

  saveProductsEnsaladas() {
    localStorage.setItem('productos_carrito', JSON.stringify(this.products));
  }

  addProductToCartEnsaladas(product: any) {
    this.products.push(product);
    this.saveProductsEnsaladas();
  }

  loadProductsInCart() {
    this.products = JSON.parse(localStorage.getItem('productos_carrito') as any) || [];
  }

  productInCart(product: any) {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProductEnsaladas(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id)

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveProductsEnsaladas();
    }
  }

  clearProductsEnsaladas() {
    this.products = [];
    localStorage.clear();
  }


}
