import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptNationComponent } from './opt-nation.component';

describe('OptNationComponent', () => {
  let component: OptNationComponent;
  let fixture: ComponentFixture<OptNationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptNationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptNationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
