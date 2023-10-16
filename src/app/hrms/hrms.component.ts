import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hrms',
  templateUrl: './hrms.component.html',
  styleUrls: ['./hrms.component.scss']
})
export class HrmsComponent implements OnInit {
  
  isPickerOpen: boolean = false;

  togglePicker() {
    this.isPickerOpen = !this.isPickerOpen;
  }
  items: any[] = [
    {
      Viewed_By: 'Wilson AM',
      Name: 'client A',
      Email: 'clienta@gmail.com',
      Phone: '7896542310',
      Legal_Status: 'GC',
      Candidate_Status: 'Direct Marketing',
      Date_Created: '13/10/2023',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
