import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganinfoComponent } from './organinfo.component';

describe('OrganinfoComponent', () => {
  let component: OrganinfoComponent;
  let fixture: ComponentFixture<OrganinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
