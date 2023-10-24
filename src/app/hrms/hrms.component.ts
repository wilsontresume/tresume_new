import { Component } from '@angular/core';



@Component({
  selector: 'app-hrms',
  templateUrl: './hrms.component.html',
  styleUrls: ['./hrms.component.scss']
})
export class HrmsComponent {
  candidates1: string[] = ['Candidate 1', 'Candidate 2', 'Candidate 3'];
  formData: any = {};

 
  recruiterNames: string[] = ['Recruiter 1', 'Recruiter 2', 'Recruiter 3'];
  candidateStatuses: string[] = ['Active', 'Inactive', 'On Hold'];
  marketerNames: string[] = ['Marketer 1', 'Marketer 2', 'Marketer 3'];
  referralTypes: string[] = ['Type 1', 'Type 2', 'Type 3'];

  onSubmit() {
   
    console.log('Form Data:', this.formData);
  }

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