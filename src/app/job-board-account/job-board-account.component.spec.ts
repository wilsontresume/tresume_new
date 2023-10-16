import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBoardAccountComponent } from './job-board-account.component';

describe('JobBoardAccountComponent', () => {
  let component: JobBoardAccountComponent;
  let fixture: ComponentFixture<JobBoardAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobBoardAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBoardAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
