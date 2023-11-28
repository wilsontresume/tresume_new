import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsAddRoleComponent } from './accounts-add-role.component';

describe('AccountsAddRoleComponent', () => {
  let component: AccountsAddRoleComponent;
  let fixture: ComponentFixture<AccountsAddRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsAddRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsAddRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
