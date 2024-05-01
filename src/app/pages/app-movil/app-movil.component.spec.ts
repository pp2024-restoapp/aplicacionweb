import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMovilComponent } from './app-movil.component';

describe('AppMovilComponent', () => {
  let component: AppMovilComponent;
  let fixture: ComponentFixture<AppMovilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppMovilComponent]
    });
    fixture = TestBed.createComponent(AppMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
