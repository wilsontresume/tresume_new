import { Component } from '@angular/core';


@Component({
  selector: 'app-review-tresume',
  templateUrl: './review-tresume.component.html',
  styleUrls: ['./review-tresume.component.scss']
})
export class ReviewTresumeComponent {
  
  
//generalinfo

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
  
  SelectedRefered: string = ''; // Initialize with an empty string
  referedby: string[] = [
    'Name 1',
    'Name 2',
    'Name 3',
    'Name 4 ',
    'Name 5',
    'Name 6',
    'Name 7 ',
    'Name 8',
    'Name 9',
  ];
  
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  phoneNumber: number;
  email: string = '';
  dealOffered: string = '';
  referredByExternal: string = '';
  statusDate: string='';
  duiFelonyInfo: string=''; 
  statusStartDate: string='';
  statusEndtDate: string='';
  ftcNotes: string=''; 
  otherNotes: string=''; 
  dob: Date; 
  // degree: string='';
  // university: string='';
  // attendedFrom: string='';
  // attendedTo: string='';
  // u8niversityAddress: string='';
  
  
  
  SelectedDivision: string = ''; // Initialize with an empty string
  divisions: string[] = [
    'PROJECT COORDINATOR',
    'SALES FORCE',
    'SALESFORCE ADMIN/BA',
    'SALESFORCE DEVELOPER & SALESFORCE/BA/DA/QA',
    'DEVOPS',
    'SYSTEM ANALYST',
    'DATA',
  ];
  
  selectedStatus: string = '-PLACED/WORKING AT CLIENT LOCATION-'; 
  statuss: string[] = ['ON TRAINING', 'DIRECT MARKETTING', 'ON BENCH', 'MARKETTING ON HOLD', 'HAS OFFER','FIRST TIME CALLER','DROPPED TRAINING'];
  
  
  selectedLegalStatus: string = '-eligible to work in US-'; 
  legalstatuss: string[] = ['eligible to work in US', 'US CITIZEN', 'GC', 'F-1', 'F1-CPT','TSP-EAD','GC-EAD','L2-EAD'];
  

//interview

interviewDate: string; 
interviewTime: string; 
 

selectedInterviewMode: string;
interviewModes: string[] = ['--Select--', 'Face to face', 'Zoom', 'Phone', 'Hangouts', 'WebEx', 'Skype', 'Others'];

constructor() { }
 

  //financialinfo

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

}
