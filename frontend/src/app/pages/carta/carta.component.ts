import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetProductsService } from 'src/app/services/get-products.service';
import { GetProductsEntradasService } from 'src/app/services/get-products-entradas.service';
import { GetProductsBebidasService } from 'src/app/services/get-products-bebidas.service';
import { GetProductsPrincipalesService } from 'src/app/services/get-products-principales.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {
  products: any;
  productsEntradas: any;
  productsBebidas : any;
  productsPrincipales : any;
  productsOnCart: any[] = [];
  subtotal: any;

  constructor(private products_service: GetProductsService,private products_entradas_service: GetProductsEntradasService, private products_bebidas_service: GetProductsBebidasService,private products_principales_service: GetProductsPrincipalesService , private router: Router) {
    this.products_service.getProducts().subscribe({
      next: (productsData) => {
        this.products = productsData
        console.log(productsData)
      },
      error: (errorData) => {
        console.error(errorData);
      }
    })
     /*** inicio entradas  ***/
    this.products_entradas_service.getProductsEntradas().subscribe({
      next: (Data) => {
        this.productsEntradas = Data
        console.log(Data)
      },
      error: (errorData) => {
        console.error(errorData);
      }
    })
      /*** fin entradas  ***/
       
      /*** inicio bebidas  ***/
    this.products_bebidas_service.getProductsBebidas().subscribe({
      next: (Data) => {
        this.productsBebidas = Data
        console.log(Data)
      },
      error: (errorData) => {
        console.error(errorData);
      }
    })
      /*** fin bebidas  ***/
      /*** inicio de principales  ***/
      this.products_principales_service.getProductsPrincipales().subscribe({
        next: (Data) => {
          this.productsPrincipales = Data
          console.log(Data)
        },
        error: (errorData) => {
          console.error(errorData);
        }
      })


      /*** fin de principales  ***/



  }




  ngOnInit(): void {
    this.products_service.loadProductsInCart();
    this.productsOnCart = this.products_service.getProduct();
  }

  addToCart(product: any) {
    console.log(product)
    if (!this.products_service.productInCart(product)) {
      product.cantidad = 1;
      this.products_service.addProductToCart(product);
      this.productsOnCart = [...this.products_service.getProduct()]
      console.log(this.productsOnCart)
      this.subtotal = product.precio;
      alert("agregado correctamente")
    }
  }

  changeSubtotal(product: any, index: any) {
    const cant = product.cantidad;
    const precio = product.precio;

    this.subtotal = cant * precio;

    this.products_service.saveProducts();
  }

  removeFromCart(product: any) {
    this.products_service.removeProduct(product);
    this.productsOnCart = this.products_service.getProduct();
  }

  get total() {
    return this.productsOnCart.reduce((sum, product) => ({
      cantidad: 1,
      precio: sum.precio + product.cantidad * product.precio
    }),
      { cantidad: 1, precio: 0 }
    ).precio
  }

  checkout() {
    localStorage.setItem('total_carrito', JSON.stringify(this.total));
    this.router.navigate(['/pago']);
  }

  clearCart() {
    this.products_service.clearProducts();
    this.productsOnCart = this.products_service.getProduct();
  }
}
