import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedCandiatesComponent } from './submitted-candiates.component';

describe('SubmittedCandiatesComponent', () => {
  let component: SubmittedCandiatesComponent;
  let fixture: ComponentFixture<SubmittedCandiatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedCandiatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedCandiatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
