import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTresumeComponent } from './search-tresume.component';

describe('SearchTresumeComponent', () => {
  let component: SearchTresumeComponent;
  let fixture: ComponentFixture<SearchTresumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTresumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
