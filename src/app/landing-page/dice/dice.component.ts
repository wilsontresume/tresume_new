import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent implements OnInit {
isScrolled: any;
isNavbarCollapsed: boolean = false;


  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0,0);
  }
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
