import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetViewdetailsComponent } from './timesheet-viewdetails.component';

describe('TimesheetViewdetailsComponent', () => {
  let component: TimesheetViewdetailsComponent;
  let fixture: ComponentFixture<TimesheetViewdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetViewdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetViewdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
