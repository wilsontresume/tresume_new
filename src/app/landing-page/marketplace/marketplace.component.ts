import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {

isScrolled = false;

@HostListener('window:scroll', [])
onWindowScroll() {
  const offset = window.scrollY;
  this.isScrolled = offset > 50;
}

  constructor() { }

  cards = [
    { title: 'Monster', text: 'Premium Job Board', imageSrc: 'assets/img/monster_logo.svg', link: 'monster' },
    { title: 'Dice', text: 'Premium Job Board', imageSrc: 'assets/img/dice.png', link: 'dice' },
    { title: 'Career BUilder', text: 'Premium Job Board', imageSrc: 'assets/img/cb.png', link: 'career' },
    { title: 'OPT Nation', text: 'Premium Job Board', imageSrc: 'assets/img/opt.png', link: 'opt-nation' },
    { title: 'Joblee', text: 'Free Job Board', imageSrc: 'https://in.jooble.org/job-description/wp-content/uploads/2020/03/logo2.svg', link: 'joble' }
  ];
  others = [
    { title: 'Yahoo', text: 'Email Integration', imageSrc: 'assets/img/yahoo.png', link: 'yahoo' },
    { title: 'Adobee', text: 'Premium Job Board', imageSrc: 'assets/img/adobe.png', link: 'adobe' },
  ];

  ngOnInit(): void {
    window.scrollTo(0,0);
  }

}