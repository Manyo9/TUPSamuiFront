import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPromocionesVigentesComponent } from './listado-promociones-vigentes.component';

describe('ListadoPromocionesVigentesComponent', () => {
  let component: ListadoPromocionesVigentesComponent;
  let fixture: ComponentFixture<ListadoPromocionesVigentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPromocionesVigentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPromocionesVigentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
