import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTresumeComponent } from './review-tresume.component';

describe('ReviewTresumeComponent', () => {
  let component: ReviewTresumeComponent;
  let fixture: ComponentFixture<ReviewTresumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewTresumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
