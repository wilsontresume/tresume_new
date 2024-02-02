import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opt-nation',
  templateUrl: './opt-nation.component.html',
  styleUrls: ['./opt-nation.component.scss']
})
export class OptNationComponent implements OnInit {
isScrolled: any;
isNavbarCollapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0,0);
  }
  cards = [
    { title: 'OPT Nation', text: 'Premium Job Board', imageSrc: 'assets/img/cb_logo.svg', link: 'opt-nation' },
  ];
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
