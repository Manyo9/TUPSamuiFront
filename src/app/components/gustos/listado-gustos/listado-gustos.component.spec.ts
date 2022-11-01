import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoGustosComponent } from './listado-gustos.component';

describe('ListadoGustosComponent', () => {
  let component: ListadoGustosComponent;
  let fixture: ComponentFixture<ListadoGustosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoGustosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoGustosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
