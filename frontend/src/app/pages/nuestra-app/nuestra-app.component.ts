import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuestra-app',
  templateUrl: './nuestra-app.component.html',
  styleUrls: ['./nuestra-app.component.css']
})
export class NuestraAppComponent implements OnInit {

  cards: HTMLElement[] = [];

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.cards = Array.from(document.querySelectorAll('.cards')) as HTMLElement[];
    this.observeCards();
  }

  observeCards() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target as HTMLElement;
          if (card.classList.contains('categorias-content')) {
            card.classList.add('slide-in-left');
          } else if (card.classList.contains('sucursales-content')) {
            card.classList.add('slide-in-right');
          } else if (card.classList.contains('contacto-content')) {
            card.classList.add('slide-in-left');
          }
          observer.unobserve(card);
        }
      });
    }, options);

    this.cards.forEach(card => {
      observer.observe(card);
    });
  }

}
