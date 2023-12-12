import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-ats',
  templateUrl: './ats.component.html',
  styleUrls: ['./ats.component.scss']
})
export class AtsComponent implements OnInit {

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
