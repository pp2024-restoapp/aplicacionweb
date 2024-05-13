import { Component, OnInit, AfterViewInit, Renderer2, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  modalOpen: any;
  form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, this.customEmailValidator])
  });

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    const themeToggle = document.getElementById('checkbox') as HTMLInputElement;
    themeToggle.addEventListener('change', () => this.toggleTheme());
  }

  ngAfterViewInit(): void {
    const cancelButton = document.querySelector('.btn-cancelar');
    const detalleModal = document.getElementById('detalleModal');
  
    cancelButton?.addEventListener('click', () => {
      // Ocultar el modal usando la clase de Bootstrap
      detalleModal?.classList.remove('show');
      const backdrop = document.querySelector('.modal-backdrop');
      backdrop?.parentNode?.removeChild(backdrop);
      this.form?.reset();
    });
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

