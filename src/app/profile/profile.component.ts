import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedstate:any;
  selectedcity:any;
  city: string[] = [];
  content: any;
  userName: string;
  FirstName: string = '';
  MiddleName: string = '';
  LastName: string = '';
  profile:any;
  yearsOfExperience: number = 0;
  monthsOfExperience: number = 0;
  companyName: string;
  zipcode: string;
  Title: string;
  dob: string;
  oldPassword: any;
  newPassword: any;
  confirmPassword: any;
  phoneNumber: number;
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
  routeType: any;

  constructor( private router: Router,  private route: ActivatedRoute, private fb: FormBuilder, private Service: ProfileService, private messageService: MessageService, private cookieService: CookieService,) {
    this.TraineeID = this.cookieService.get('TraineeID');
    this.routeType = this.route.snapshot.params["routeType"];
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
      this.fetchprofile();
      this.fetchState();
      this.fetchCity();
  }

  
  updateProfile() {
    const req = {
      FirstName: this.profiledata.FirstName,
      MiddleName: this.profiledata.MiddleName,
      LastName: this.profiledata.LastName,
      UserName: this.profiledata.userName,
      YearsOfExpInMonths: this.profiledata.YearsOfExpInMonths,
      Title: this.profiledata.Title,
      DOB: this.profiledata.DOB,
      PhoneNumber: this.profiledata.PhoneNumber,
      Organization: this.profiledata.Organization,
      state: this.selectedstate,
      city: this.selectedcity,
      zipcode: this.profiledata.zipcode,
      traineeID: this.profiledata.TraineeID,
    };
  
    console.log(req);
  
    this.Service.updateMyProfile(req).subscribe(
      (response: any) => {
        this.handleSuccess(response);
        this.fetchprofile();
        this.editmode = false;
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
    // this.router.navigate(['/profile/'+this.routeType]);
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


  cancel() {
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
    this.profiledata = x.result[0];
    console.log(this.profiledata);
    this.loading = false;
  });
}

fetchState(){
  let Req = {
    traineeID: this.TraineeID,
  };
  this.Service.getLocation(Req).subscribe((x: any) => {
    this.state = x.result;
    console.log(this.state);
  });
}

fetchCity(){
  let Req = {
    TraineeID: this.TraineeID,
    State: this.selectedstate
  };
  this.Service.getCity(Req).subscribe((x: any) => {
    this.city = x.result;
    console.log(this.selectedstate);
  });
}


SavePassword(){
  
}


formattedDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  return formattedDate;
}

updateDOB(event: any): void {
  this.profiledata.DOB = event.target.value;
}

}