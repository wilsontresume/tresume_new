import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  cities: { name: string; code: string; }[];
  content:any;
  firstName: string;
  userName:string;
  middleName: string;
  lastName: string;
  yearsOfExperience: number = 0;
  monthsOfExperience: number = 0;
  selectedCities: string[] = [];
  companyName: string;
  state: string;
  city: string;
  zipcode: string;
  title: string;
  dob: string;
  oldPassword:any;
  newPassword:any;
  confirmPassword:any;
  phoneNumber: string;
  selectedState:any;
  selectedCity:any;
  constructor() { 
    
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  }

  ngOnInit(): void {
  }
  onSave() {
    console.log('Save button clicked!');
    console.log('First Name:', this.firstName);
    console.log('Middle Name:', this.middleName);
    console.log('Last Name:', this.lastName);
    console.log('Title:', this.title);
    console.log('DOB:', this.dob);
    console.log('Phone Number:', this.phoneNumber);
    console.log('Last Name:', this.lastName);
    console.log('Years of Experience:', this.yearsOfExperience);
    console.log('Months of Experience:', this.monthsOfExperience);
  }
}
