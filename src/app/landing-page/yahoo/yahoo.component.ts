import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yahoo',
  templateUrl: './yahoo.component.html',
  styleUrls: ['./yahoo.component.scss']
})
export class YahooComponent implements OnInit {
isScrolled: any;
isNavbarCollapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
