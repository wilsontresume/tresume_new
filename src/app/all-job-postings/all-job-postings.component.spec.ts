import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllJobPostingsComponent } from './all-job-postings.component';

describe('AllJobPostingsComponent', () => {
  let component: AllJobPostingsComponent;
  let fixture: ComponentFixture<AllJobPostingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllJobPostingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllJobPostingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
