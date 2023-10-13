import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  items: any[] = [
{
  value1:'Name 1',
  value2:'Name 2',
  value3:'Name 3',
  value4:'Name 4',
  value5:'Name 5',
  value6:'Name 6',
}
]


  
  constructor() { }
  

  ngOnInit(): void {
  }

  openPasswordForm(): void {
    alert('Opening password form...');
  }
}