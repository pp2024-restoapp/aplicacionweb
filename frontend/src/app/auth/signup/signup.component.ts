import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SignupRequest } from '../../services/auth/authRequest';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username:['',Validators.required],
    first_name:['',Validators.required],
    last_name:['',Validators.required],
    password: ['', Validators.required],
    is_staff: ['false']
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  get email() {
    return this.registerForm.controls.email;
  }
  get username() {
    return this.registerForm.controls.username;
  }
  get first_name() {
    return this.registerForm.controls.first_name;
  }
  get last_name() {
    return this.registerForm.controls.last_name;
  }
  get password() {
    return this.registerForm.controls.password;
  }
  get is_staff() {
    return this.registerForm.controls.is_staff;
  }

  signup() {
    if (this.registerForm.valid) {
      this.authService.signup(this.registerForm.value as SignupRequest).subscribe({
        error: (errorData) => {
          alert('Email o Password erroneo.');
          console.error(errorData);
        },
        complete: () => {
          alert('Registro exitoso.');
          this.router.navigateByUrl('/login');
        },
      });
      
    } else {
      this.registerForm.markAllAsTouched();
      alert('No se permiten campos vacios.');
    }
  }

}
