import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaUsuarioExternoComponent } from './alta-usuario-externo.component';

describe('AltaUsuarioExternoComponent', () => {
  let component: AltaUsuarioExternoComponent;
  let fixture: ComponentFixture<AltaUsuarioExternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaUsuarioExternoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaUsuarioExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
