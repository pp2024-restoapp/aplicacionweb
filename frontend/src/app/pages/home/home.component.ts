import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetProductsService } from 'src/app/services/get-products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  productsOnCart: any[] = [];
  subtotal: number = 0;

  constructor(
    private products_service: GetProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products_service.loadProductsInCart();
    this.productsOnCart = this.products_service.getProduct();
  }

  addToCart(product: any) {
    if (!this.products_service.productInCart(product)) {
      product.cantidad = 1;
      this.products_service.addProductToCart(product);
      this.productsOnCart = [...this.products_service.getProduct()];
      alert('Producto agregado correctamente');
    }
  }

  changeSubtotal(product: any, index: any) {
    const cant = product.cantidad;
    const precio = product.precio;
    product.subtotal = cant * precio;
    this.subtotal = this.calculateTotal();
    this.products_service.saveProducts();
  }

  removeFromCart(product: any) {
    const index = this.productsOnCart.findIndex(
      (item) => item.id === product.id
    );
    if (index !== -1) {
      this.productsOnCart.splice(index, 1);
    }
    this.subtotal = this.calculateTotal();
    this.products_service.removeProduct(product);
  }

  calculateTotal() {
    return this.productsOnCart.reduce(
      (total, product) => total + product.cantidad * product.precio,
      0
    );
  }

  get total() {
    return this.productsOnCart.reduce(
      (sum, product) => ({
        cantidad: 1,
        precio: sum.precio + product.cantidad * product.precio,
      }),
      { cantidad: 1, precio: 0 }
    ).precio;
  }

  checkout() {
    localStorage.setItem('total_carrito', JSON.stringify(this.subtotal));
    this.router.navigate(['/pago']);
  }

  clearCart() {
    this.productsOnCart = [];
    this.products_service.clearProducts();
  }
}
