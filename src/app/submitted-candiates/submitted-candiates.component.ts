import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-submitted-candiates',
  templateUrl: './submitted-candiates.component.html',
  styleUrls: ['./submitted-candiates.component.scss']
})
export class SubmittedCandiatesComponent implements OnInit {
  loading:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
