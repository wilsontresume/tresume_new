import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobleeComponent } from './joblee.component';

describe('JobleeComponent', () => {
  let component: JobleeComponent;
  let fixture: ComponentFixture<JobleeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobleeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobleeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
