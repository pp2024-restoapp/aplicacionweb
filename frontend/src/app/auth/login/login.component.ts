import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../services/auth/authRequest';
import { ToastrService } from 'ngx-toastr';

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

  passwordVisible: boolean = false;
  passwordFieldType: string = 'password';
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  get email() {
    return this.loginForm.controls.email;
  }
  get password() {
    return this.loginForm.controls.password;
  }

  showSuccess(message = "") {
    this.toastr.success(message, "",{
      progressBar: true,
      timeOut: 3000
    })
  }

  showError(message = "") {
    this.toastr.error(message, "",{
      progressBar: true,
      timeOut: 3000
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.access);
          localStorage.setItem('is_staff', data.user.is_staff);
          this.showSuccess("¡Inicio de sesión exitoso!")
        },
        error: (errorData) => {
          this.showError("Email o Password erroneo")
          console.error(errorData);
        },
        complete: () => {
          this.router.navigateByUrl('/productos');
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.showError("No se permiten campos vacios")
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }

}
