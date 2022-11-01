import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaGustosComponent } from './alta-gustos.component';

describe('AltaGustosComponent', () => {
  let component: AltaGustosComponent;
  let fixture: ComponentFixture<AltaGustosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaGustosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaGustosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
