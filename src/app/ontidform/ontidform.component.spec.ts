import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntidformComponent } from './ontidform.component';

describe('OntidformComponent', () => {
  let component: OntidformComponent;
  let fixture: ComponentFixture<OntidformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntidformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntidformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
