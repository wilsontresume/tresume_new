import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewJobsComponent } from './create-new-jobs.component';

describe('CreateNewJobsComponent', () => {
  let component: CreateNewJobsComponent;
  let fixture: ComponentFixture<CreateNewJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
