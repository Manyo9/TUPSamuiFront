import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarEstadoComponent } from './actualizar-estado.component';

describe('ActualizarEstadoComponent', () => {
  let component: ActualizarEstadoComponent;
  let fixture: ComponentFixture<ActualizarEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarEstadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
