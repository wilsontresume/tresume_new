import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-talent-suite',
  templateUrl: './talent-suite.component.html',
  styleUrls: ['./talent-suite.component.scss']
})
export class TalentSuiteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.scrollY;
    this.isScrolled = offset > 50; // You can adjust the offset value based on your design
  }
}
