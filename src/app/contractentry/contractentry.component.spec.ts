import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractentryComponent } from './contractentry.component';

describe('ContractentryComponent', () => {
  let component: ContractentryComponent;
  let fixture: ComponentFixture<ContractentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
