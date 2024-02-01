import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { ProfileService} from './Profile.service';
import { ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
// import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [CookieService,MessageService,ProfileService],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('myTabs') myTabs: TabsetComponent;
  AboutUser:string='active';
  selectedTab: string = 'about-me';
  AboutMe:any;
  AboutCompany:any;
  Password:string = '';
  CompanyInfo = '';
  selectedLegalstatus:string = '';
  state: string[] = [];
  cities: string[] = [];
  content: any;
  userName: string;
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  profile:any;
  yearsOfExperience: number = 0;
  monthsOfExperience: number = 0;
  companyName: string;
  zipcode: string;
  title: string;
  dob: string;
  oldPassword: any;
  newPassword: any;
  confirmPassword: any;
  phoneNumber: number;
  selectedState: any;
  logoImageUrl: string;
  editmode: boolean = false;
  myForm: any;
  passwordForm:any;
  CompanyForm:any;
  TraineeID: string;
  profiledata:any = [];
  loading:boolean = false;
  UpdateProfileData:any;
  ProfileUpdate:any;

  constructor(private fb: FormBuilder, private Service: ProfileService, private messageService: MessageService, private cookieService: CookieService,) {
    this.TraineeID = this.cookieService.get('TraineeID');
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
      this.fetchprofile();
      this.fetchState();
      this.fetchCity();
      this.updateProfile();
  }

  
  updateProfile() {
    let Req = {
      FirstName: this.firstName,
      MiddleName: this.middleName,
      LastName: this.lastName,
      UserName: this.userName,
      YearsOfExpInMonths: this.yearsOfExperience,
      Title: this.title,
      DOB: this.dob,
      PhoneNumber: this.phoneNumber,
      Organization: this.companyName,
      state: this.state,
      city: this.cities,
      zipcode: this.zipcode,
      traineeID: this.TraineeID,
    };
    console.log(Req);
    this.Service.updateMyProfile(Req).subscribe(
      (x: any) => {
            this.handleSuccess(x);
          },
          (error: any) => {
            this.handleError(error);
          }
    );
  }

  private handleSuccess(response: any): void {
    this.messageService.add({ severity: 'success', summary: response.message });
    console.log(response);
    this.loading = false;
  }
  
  private handleError(response: any): void {
    this.messageService.add({ severity: 'error', summary:  response.message });
    this.loading = false;
  }

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
    this.loading = false;
  });
}

fetchState(){
  let Req = {
    traineeID: this.TraineeID,
  };
  this.Service.fetchProfileStateList(Req).subscribe((x: any) => {
    this.state = x.result;
    console.log(this.state);
  });
}

fetchCity(){
  let Req = {
    traineeID: this.TraineeID,
  };
  this.Service.fetchProfileCityList(Req).subscribe((x: any) => {
    this.cities = x.result;
  
  });
}


SavePassword(){
  
}


}