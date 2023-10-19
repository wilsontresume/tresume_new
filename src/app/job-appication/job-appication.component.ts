import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-appication',
  templateUrl: './job-appication.component.html',
  styleUrls: ['./job-appication.component.scss']
})
export class JobAppicationComponent implements OnInit {
jobs: any;
editmode: boolean = false;
selectedDate: string = ''; // You may initialize it with the current date
selectedOption: string = '';
showDateOptions: boolean = false;

  container: any;
  constructor() { }

  ngOnInit(): void {
  }
  saveAs(format: string): void {
    // Handle the logic for saving as Excel or PDF
    console.log(`Save as ${format}`);
    // You can implement the logic to generate and download Excel or PDF here
  }
  scrollLeft() {
    this.container.nativeElement.scrollLeft -= 50;
  }

  scrollRight() {
    this.container.nativeElement.scrollLeft += 50;
  }
  
  saveDate() {
    console.log('Selected Date:', this.selectedDate);
    console.log('Selected Option:', this.selectedOption);
    // Add your save logic here
  }

  cancelDate() {
    this.showDateOptions = false;
    // Add your cancel logic here
  }
}
