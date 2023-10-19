import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  cities: { name: string; code: string; }[];
  content: any;
  userName: string;
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  yearsOfExperience: number = 0;
  monthsOfExperience: number = 0;
  selectedCities: string[] = [];
  companyName: string;
  state: string;
  city: string;
  zipcode: string;
  title: string;
  dob: string;
  oldPassword: any;
  newPassword: any;
  confirmPassword: any;
  phoneNumber: string;
  selectedState: any;
  selectedCity: any;
  logoImageUrl: string;
  editmode: boolean = false;
  myForm: any;
  

  // inputFields = [
  //   { key: 'firstName', label: 'First Name', placeholder: 'Enter First Name', required: true },
  //   { key: 'middleName', label: 'Middle Name', placeholder: 'Enter Middle Name', required: true },
  //   { key: 'lastName', label: 'Last Name', placeholder: 'Enter Last Name', required: true },
   
  // ];

  constructor(private fb: FormBuilder) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  ngOnInit(): void {
    // this.myForm = this.fb.group({});
    // this.inputFields.forEach(field => {
    //   this.myForm.addControl(field.key, this.fb.control(''));
    // });
  }
  onSave() {
    
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoImageUrl = reader.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  toggleEditMode1() {
    if (this.editmode === true) {
      this.editmode = false;
    } else {
      this.editmode = true;
    }
 // this.editmode = !this.editmode;
   }

}
