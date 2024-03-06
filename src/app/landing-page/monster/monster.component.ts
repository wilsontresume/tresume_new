import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss']
})
export class MonsterComponent implements OnInit {
isScrolled: any;
isNavbarCollapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0,0);
  }
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
