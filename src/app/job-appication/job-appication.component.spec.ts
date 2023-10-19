import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAppicationComponent } from './job-appication.component';

describe('JobAppicationComponent', () => {
  let component: JobAppicationComponent;
  let fixture: ComponentFixture<JobAppicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAppicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAppicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
