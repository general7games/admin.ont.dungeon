import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntiddetaildialogComponent } from './ontiddetaildialog.component';

describe('OntiddetaildialogComponent', () => {
  let component: OntiddetaildialogComponent;
  let fixture: ComponentFixture<OntiddetaildialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntiddetaildialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntiddetaildialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
