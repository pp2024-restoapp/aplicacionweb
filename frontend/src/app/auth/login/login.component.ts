import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../services/auth/authRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  get email() {
    return this.loginForm.controls.email;
  }
  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.access);
          localStorage.setItem('is_staff', data.user.is_staff);
        },
        error: (errorData) => {
          alert('Email o Password erroneo.');
          console.error(errorData);
        },
        complete: () => {
          this.router.navigateByUrl('/productos');
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert('No se permiten campos vacios.');
    }
  }
}
