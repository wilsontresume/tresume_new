import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArAgingReportComponent } from './ar-aging-report.component';

describe('ArAgingReportComponent', () => {
  let component: ArAgingReportComponent;
  let fixture: ComponentFixture<ArAgingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArAgingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArAgingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
