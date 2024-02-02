import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adobe',
  templateUrl: './adobe.component.html',
  styleUrls: ['./adobe.component.scss']
})
export class AdobeComponent implements OnInit {
isScrolled: any;
isNavbarCollapsed: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

}
