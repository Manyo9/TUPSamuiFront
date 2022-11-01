import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaGustosComponent } from './baja-gustos.component';

describe('BajaGustosComponent', () => {
  let component: BajaGustosComponent;
  let fixture: ComponentFixture<BajaGustosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BajaGustosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajaGustosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
