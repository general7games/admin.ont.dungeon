import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntidentryComponent } from './ontidentry.component';

describe('OntidentryComponent', () => {
  let component: OntidentryComponent;
  let fixture: ComponentFixture<OntidentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntidentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntidentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
