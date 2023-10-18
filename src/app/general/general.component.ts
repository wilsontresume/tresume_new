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



selectedStatus: string = '-PLACED/WORKING AT CLIENT LOCATION-'; 
statuss: string[] = ['ON TRAINING', 'DIRECT MARKETTING', 'ON BENCH', 'MARKETTING ON HOLD', 'HAS OFFER','FIRST TIME CALLER','DROPPED TRAINING'];


selectedLegalStatus: string = '-eligible to work in US-'; 
legalstatuss: string[] = ['eligible to work in US', 'US CITIZEN', 'GC', 'F-1', 'F1-CPT','TSP-EAD','GC-EAD','L2-EAD'];


selectedDivision: string = '-select-'; 
Divisions: string[] = ['PROJECT COORDINATOR', 'SALES FORCE', 'SALESFORCE DEVELOPER & SALESFORCE/BA/DA/QA', 'DEVOPS', 'SYSTEM ANALYST','DATA',];

  
  constructor() { }
  

  ngOnInit(): void {
  }

  openPasswordForm(): void {
    alert('Opening password form...');
  }
}