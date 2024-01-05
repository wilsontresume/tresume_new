import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAllTimeListComponent } from './create-all-time-list.component';

describe('CreateAllTimeListComponent', () => {
  let component: CreateAllTimeListComponent;
  let fixture: ComponentFixture<CreateAllTimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAllTimeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAllTimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
