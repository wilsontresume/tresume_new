import { Component } from '@angular/core';



@Component({
  selector: 'app-hrms',
  templateUrl: './hrms.component.html',
  styleUrls: ['./hrms.component.scss']
})
export class HrmsComponent {
  datecreated:Date[];
  followupon:Date[];
  candidates: any[] = [
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

 
  constructor() {
    
   
  }
  displayedCandidates: number = this.candidates.length;
  totalCandidates: number = this.candidates.length;

 
  performSearch(searchTerm: string) {
    this.candidates = this.candidates.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.displayedCandidates = this.candidates.length;
  }
 
 
}
