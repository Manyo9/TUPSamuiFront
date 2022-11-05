import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonCanjearComponent } from './boton-canjear.component';

describe('BotonCanjearComponent', () => {
  let component: BotonCanjearComponent;
  let fixture: ComponentFixture<BotonCanjearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonCanjearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonCanjearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
