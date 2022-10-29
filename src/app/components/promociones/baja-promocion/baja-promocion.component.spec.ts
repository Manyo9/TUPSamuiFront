import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaPromocionComponent } from './baja-promocion.component';

describe('BajaPromocionComponent', () => {
  let component: BajaPromocionComponent;
  let fixture: ComponentFixture<BajaPromocionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BajaPromocionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajaPromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
