import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-career-builder',
  templateUrl: './career-builder.component.html',
  styleUrls: ['./career-builder.component.scss']
})
export class CareerBuilderComponent implements OnInit {
isScrolled: any;

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0,0);
  }

}
