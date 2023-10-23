import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssaignRoleComponent } from './assaign-role.component';

describe('AssaignRoleComponent', () => {
  let component: AssaignRoleComponent;
  let fixture: ComponentFixture<AssaignRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssaignRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssaignRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
