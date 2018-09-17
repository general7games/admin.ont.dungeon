import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntidsComponent } from './ontids.component';

describe('OntidsComponent', () => {
  let component: OntidsComponent;
  let fixture: ComponentFixture<OntidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
