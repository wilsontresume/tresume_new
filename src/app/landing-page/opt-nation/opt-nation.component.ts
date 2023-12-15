import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opt-nation',
  templateUrl: './opt-nation.component.html',
  styleUrls: ['./opt-nation.component.scss']
})
export class OptNationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  cards = [
    { title: 'OPT Nation', text: 'Premium Job Board', imageSrc: 'assets/img/cb_logo.svg', link: 'opt-nation' },
  ];
}
