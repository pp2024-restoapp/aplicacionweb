import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, this.customEmailValidator])
  });

  constructor() { }

  ngOnInit() {
    const themeToggle = document.getElementById('checkbox') as HTMLInputElement;
    themeToggle.addEventListener('change', () => this.toggleTheme());
  }

  toggleTheme() {
    console.log('Toggle theme function called');
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'oscuro' ? 'claro' : 'oscuro';
    root.setAttribute('data-theme', newTheme);
  
    // Cambia el estado del checkbox en función del tema
    const themeToggle = document.getElementById('themeToggle') as HTMLInputElement;
    themeToggle.checked = newTheme === 'oscuro';
  }

  getError(control: any): string {
    if (control.errors?.required && control.touched)
      return 'This field is required!';
    else if (control.errors?.emailError && control.touched)
      return 'Please enter a valid email address!';
    else return '';
  }

  customEmailValidator(control: AbstractControl) {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    const value = control.value;
    if (!pattern.test(value) && control.touched)
      return {
        emailError: true
      };
    else return null;
  }
}
