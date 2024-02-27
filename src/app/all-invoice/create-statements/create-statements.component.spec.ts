import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStatementsComponent } from './create-statements.component';

describe('CreateStatementsComponent', () => {
  let component: CreateStatementsComponent;
  let fixture: ComponentFixture<CreateStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStatementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
