import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlDiarioPage } from './control-diario.page';

describe('ControlDiarioPage', () => {
  let component: ControlDiarioPage;
  let fixture: ComponentFixture<ControlDiarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlDiarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlDiarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
