import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionAuditComponent } from './division-audit.component';

describe('DivisionAuditComponent', () => {
  let component: DivisionAuditComponent;
  let fixture: ComponentFixture<DivisionAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
