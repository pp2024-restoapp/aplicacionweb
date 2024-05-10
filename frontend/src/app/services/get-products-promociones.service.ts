import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductsPromocionesService {

  products: any[] = [];
  url: string = "http://127.0.0.1:8000/";
  productUrl: string = "http://127.0.0.1:8000/productosCategoriaPromociones"
  constructor(private http: HttpClient) { }

  getProductsPromociones(): Observable<any> {
    return this.http.get(this.url + "productosCategoriaPromociones?format=json")
  }

  getProductPromociones() {
    return this.products;
  }

  
  editProductPromociones(product: any): Observable<any> {
    const url = `${this.productUrl}/${product.id}`;
    return this.http.put<any>(url, product);
  }

  deleteProductPromociones(productId: number): Observable<any> {
    const url = `${this.productUrl}/${productId}?format=json`;
    return this.http.delete<any>(url);
  }

  createProductPromociones(productData: any): Observable<any> {
    return this.http.post(this.productUrl, productData);
  }

  saveProductsPromociones() {
    localStorage.setItem('productos_carrito', JSON.stringify(this.products));
  }

  addProductToCartPromociones(product: any) {
    this.products.push(product);
    this.saveProductsPromociones();
  }

  loadProductsInCart() {
    this.products = JSON.parse(localStorage.getItem('productos_carrito') as any) || [];
  }

  productInCart(product: any) {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProductPromociones(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id)

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveProductsPromociones();
    }
  }

  clearProductsPromociones() {
    this.products = [];
    localStorage.clear();
  }


}
