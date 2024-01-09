import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { ProfileService} from './Profile.service';
import { ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [CookieService,MessageService,ProfileService],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  @ViewChild('myTabs') myTabs: TabsetComponent;
  AboutUser:string='active';
  Password:string = '';
  CompanyInfo = '';
  selectedLegalstatus:string = '';


  cities: { name: string; code: string; }[];
  content: any;
  userName: string;
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  profile:any;
  yearsOfExperience: number = 0;
  monthsOfExperience: number = 0;
  selectedCities: string[] = [];
  companyName: string;
  state: string ;
  city: string;
  zipcode: string;
  title: string;
  dob: string;
  oldPassword: any;
  newPassword: any;
  confirmPassword: any;
  phoneNumber: number;
  selectedState: any;
  selectedCity: any;
  logoImageUrl: string;
  editmode: boolean = false;
  myForm: any;
  passwordForm:any;
  CompanyForm:any;
  TraineeID: string;
  profiledata:any = [];

  // inputFields = [
  //   { key: 'firstName', label: 'First Name', placeholder: 'Enter First Name', required: true },
  //   { key: 'middleName', label: 'Middle Name', placeholder: 'Enter Middle Name', required: true },
  //   { key: 'lastName', label: 'Last Name', placeholder: 'Enter Last Name', required: true },
   
  // ];

  nextTab(tab:number) {
    if(tab == 1){
      this.AboutUser = 'active';
      this.Password = '';
      this.CompanyInfo = '';
    } else if(tab == 2){
      this.AboutUser = '';
      this.Password = 'active';
      this.CompanyInfo = '';
    }else if(tab == 3){
      this.AboutUser = '';
      this.Password = '';
      this.CompanyInfo = 'active';
    }
  console.log(this.selectedLegalstatus);
  }


  constructor(private fb: FormBuilder, private Service: ProfileService, private messageService: MessageService, private cookieService: CookieService,) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  async ngOnInit(): Promise<void> {
  

    this.TraineeID = this.cookieService.get('TraineeID');
      this.fetchprofile();
  }

  onSave() {
    console.log(this.firstName)
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
   selectDateOption(option: string) {
    console.log(`Selected date option: ${option}`);
}

fetchprofile(){
  let Req = {
    traineeID: this.TraineeID,
  };
  this.Service.getUserProfile(Req).subscribe((x: any) => {
    this.profiledata = x.result;
    console.log(this.profiledata);
  });
}
}