import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountentryComponent } from './accountentry.component';

describe('AccountentryComponent', () => {
  let component: AccountentryComponent;
  let fixture: ComponentFixture<AccountentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
