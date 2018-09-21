import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountdetaildialogComponent } from './accountdetaildialog.component';

describe('AccountdetaildialogComponent', () => {
  let component: AccountdetaildialogComponent;
  let fixture: ComponentFixture<AccountdetaildialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountdetaildialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountdetaildialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
