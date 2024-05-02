import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

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

}
