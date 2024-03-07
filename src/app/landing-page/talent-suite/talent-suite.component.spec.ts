import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentSuiteComponent } from './talent-suite.component';

describe('TalentSuiteComponent', () => {
  let component: TalentSuiteComponent;
  let fixture: ComponentFixture<TalentSuiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentSuiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentSuiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
