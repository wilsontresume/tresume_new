import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentBenchComponent } from './talent-bench.component';

describe('TalentBenchComponent', () => {
  let component: TalentBenchComponent;
  let fixture: ComponentFixture<TalentBenchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentBenchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentBenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
