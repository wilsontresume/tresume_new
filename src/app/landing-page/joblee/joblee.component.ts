import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-joblee',
  templateUrl: './joblee.component.html',
  styleUrls: ['./joblee.component.scss']
})
export class JobleeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0,0);
  }

}
