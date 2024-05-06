import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent {

  contactForm: FormGroup = new FormGroup({});
  subscriptionForm: FormGroup = new FormGroup({});

  contactoFormSended = false;
  subscriptionFormSended = false;

  constructor(private formBuilder: FormBuilder) {
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