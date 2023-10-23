import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTimeListComponent } from './all-time-list.component';

describe('AllTimeListComponent', () => {
  let component: AllTimeListComponent;
  let fixture: ComponentFixture<AllTimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTimeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
