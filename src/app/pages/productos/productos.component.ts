import { Component } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { GetProductsService } from 'src/app/services/get-products.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  selectedProduct: any;
  products: any[] = [];
  productForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: ['', Validators.required],
    stock: ['', Validators.required],
    imagen: ['', Validators.required],
    activo: ['', Validators.required],
    categoria: ['', Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder,
    private productService : GetProductsService,
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  editProduct(product: any): void {
    this.productService = product;
    this.productForm.patchValue({
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      stock: product.stock,
      imagen: product.imagen,
      activo: product.activo,
      categoria: product.categoria
    });
  }

  get nombre() {
    return this.productForm.controls.nombre;
  }
  get descripcion() {
    return this.productForm.controls.descripcion;
  }
  get precio() {
    return this.productForm.controls.precio;
  }
  get stock() {
    return this.productForm.controls.stock;
  }
  get imagen() {
    return this.productForm.controls.imagen;
  }
  get activo() {
    return this.productForm.controls.activo;
  }
  get categoria() {
    return this.productForm.controls.categoria;
  }

  crearProducto() {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value).subscribe({
        error: (errorData) => {
          console.error(errorData);
        },
        complete: () => {
          console.log("Producto creado");
        }
      })
    }else {
      this.productForm.markAllAsTouched();
      alert('No se permiten campos vacios.');
    }
  }

  deleteProduct(product: any) {
    const productId = product.id; // Asegúrate de usar el nombre correcto de la propiedad que contiene el ID del producto

    this.productService.deleteProduct(productId).subscribe(
      () => {
        console.log("Producto eliminado");
        // Actualizar la lista de productos después de eliminar el producto
        this.products = this.products.filter((p: any) => p.id !== productId);

        // Realizar la validación después de la eliminación del producto
        if (!this.productForm.valid) {
          this.productForm.markAllAsTouched();
          alert('Producto elimnado');
        }
      },
      (errorData) => {
        console.error(errorData);
      }
    );
  }

}
