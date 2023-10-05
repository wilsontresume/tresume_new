import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AllTimeSheetComponent } from './all-time-sheet.component';

@Component({
  selector: 'app-all-time-sheet',
  templateUrl: './all-time-sheet.component.html',
  styleUrls: ['./all-time-sheet.component.scss'] 
})
class TestHostComponent {
 
}

describe('AllTimeSheetComponent', () => {
  let component: AllTimeSheetComponent;
  let fixture: ComponentFixture<AllTimeSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTimeSheetComponent, TestHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTimeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


