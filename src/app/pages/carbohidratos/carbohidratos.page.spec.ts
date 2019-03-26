import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbohidratosPage } from './carbohidratos.page';

describe('CarbohidratosPage', () => {
  let component: CarbohidratosPage;
  let fixture: ComponentFixture<CarbohidratosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarbohidratosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarbohidratosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
