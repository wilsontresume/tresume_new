import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsAddUserComponent } from './accounts-add-user.component';

describe('AccountsAddUserComponent', () => {
  let component: AccountsAddUserComponent;
  let fixture: ComponentFixture<AccountsAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsAddUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
