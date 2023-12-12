import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0,0);
  }
  isScrolled = false;

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const offset = window.scrollY;
  //   this.isScrolled = offset > 50;
  // }
}
