import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-tresume',
  templateUrl: './review-tresume.component.html',
  styleUrls: ['./review-tresume.component.scss']
})
export class ReviewTresumeComponent implements OnInit {

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
    options = ['Single', 'Married', 'Married with hold'];
    selectedOptions: string[] = [];
  
  
    updateArray(option: string): void {
      if (this.selectedOptions.includes(option)) {
        this.selectedOptions = this.selectedOptions.filter(item => item !== option);
      } else {
        this.selectedOptions.push(option);
      }
    }
    
  
    legalStatusOptions: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa']; 
    selectedOption: string = '';
    
    

  constructor() { }

  ngOnInit(): void {
  }

}
