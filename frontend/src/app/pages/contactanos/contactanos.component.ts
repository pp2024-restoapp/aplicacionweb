import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { GetProductsService } from 'src/app/services/get-products.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent {
  productsOnCart: any[] = [];
  subtotal: number = 0;

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

  contactForm: FormGroup = new FormGroup({});
  subscriptionForm: FormGroup = new FormGroup({});

  contactoFormSended = false;
  subscriptionFormSended = false;

  constructor(private formBuilder: FormBuilder, 
    private products_service: GetProductsService,
    private router: Router) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.subscriptionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  onSubmitContactForm() {
    this.contactoFormSended = true;
    if (this.contactForm.valid) {
      console.log("Formulario de contacto enviado:", this.contactForm.value);
    }
  }

  onSubmitSubscriptionForm() {
    this.subscriptionFormSended = true;
    if (this.subscriptionForm.valid) {
      console.log("Formulario de suscripción enviado:", this.subscriptionForm.value);
    }
  }
}