import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferdialogComponent } from './transferdialog.component';

describe('TransferdialogComponent', () => {
  let component: TransferdialogComponent;
  let fixture: ComponentFixture<TransferdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
