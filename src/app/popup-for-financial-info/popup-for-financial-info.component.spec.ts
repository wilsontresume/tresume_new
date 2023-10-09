import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupForFinancialInfoComponent } from './popup-for-financial-info.component';

describe('PopupForFinancialInfoComponent', () => {
  let component: PopupForFinancialInfoComponent;
  let fixture: ComponentFixture<PopupForFinancialInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupForFinancialInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupForFinancialInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
