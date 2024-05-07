import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestraAppComponent } from './nuestra-app.component';

describe('NuestraAppComponent', () => {
  let component: NuestraAppComponent;
  let fixture: ComponentFixture<NuestraAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuestraAppComponent]
    });
    fixture = TestBed.createComponent(NuestraAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
