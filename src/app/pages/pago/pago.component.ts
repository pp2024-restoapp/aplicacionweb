import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { GetProductsService } from 'src/app/services/get-products.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  cartTotal: any
  public payPalConfig?: IPayPalConfig;
  showSuccess!: any;
  orderData = {
    estado: 'confirmado',
    tipo: 'delivery',
    observacion: 'Sin sal',
    usuario: 1,
    producto: [2, 3],
    importe: 3600,
    numeroMesa: 0,
    pago: "realizado"
  }

  constructor(private products_service: GetProductsService,private orders_service: OrdersService, private router: Router) { }

  ngOnInit() {
    this.initConfig();
    this.cartTotal = JSON.parse(localStorage.getItem('total_carrito') as any) || []
    console.log(this.cartTotal)
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AaQAnziy0k3xMB96eU9b0p6MD3Om1UkDB23XGCq8f2e6J-47i0KFw7Xrnva6FkHRo_V98J0z513gSV9t',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: `${this.cartTotal}`,
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: `${this.cartTotal}`,
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: `${this.cartTotal}`,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        if (data.status === 'COMPLETED') {
          this.orders_service.createOrder(this.orderData).subscribe({
            error: (errorData) => {
              console.error(errorData);
            },
            complete: () => {
              console.log("Orden creada");
            }
          })
          this.router.navigate(['/carta']);
          this.products_service.clearProducts();
        }
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
