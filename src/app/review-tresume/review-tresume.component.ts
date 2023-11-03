import { Component,OnChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ReviewService } from './review.service';
import { MessageService } from 'primeng/api';
import { request } from 'express';


@Component({
  selector: 'app-review-tresume',
  templateUrl: './review-tresume.component.html',
  providers: [CookieService,ReviewService,MessageService],
  styleUrls: ['./review-tresume.component.scss']
})



export class ReviewTresumeComponent implements OnChanges {


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
  
  SelectedRefered: string = ''; 
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
  
  
  
  SelectedDivision: string = ''; 
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

TraineeID: string;
interviewDate: string; 
interviewTime: string; 
selectedInterviewMode: string;
interviewModes: string[] = ['--Select--', 'Face to face', 'Zoom', 'Phone', 'Hangouts', 'WebEx', 'Skype', 'Others'];
router: any;
  http: any;
  editRowIndex: number;
  showConfirmationDialog: boolean;
  deleteIndex: number;
constructor(private cookieService: CookieService, private service:ReviewService,private messageService: MessageService)
 { }
ngOnInit(): void {
  
  this.TraineeID = this.cookieService.get('TraineeID');
  this.fetchinterviewlist();
}

ngOnChanges(): void{
  this.fetchinterviewlist();
}
fetchinterviewlist(){
  let Req = {
    TraineeID: this.TraineeID,
  };
  this.service.getInterviewList(Req).subscribe((x: any) => {
    this.interview = x.result;
  });
}

interviewInfo: string = '';
client: string = '';
vendor: string = '';
subVendor: string = '';
assistedBy: string = '';
typeOfAssistance: string = '';

interview: any[] = [];


onSaveClick() {
  const job = {
    Date: this.interviewDate,
    interviewTime: this.interviewTime,
    Notes: this.interviewInfo,
    client: this.client,
    vendor: this.vendor,
    subVendor: this.subVendor,
    Assigned: this.assistedBy,
    typeOfAssistance: this.typeOfAssistance,
    InterviewMode: this.selectedInterviewMode,
  };

  this.interview.push(job);

  console.log('Form Values:', job);

  this.clearInputFields();
}

clearInputFields() {
  this.interviewDate = '';
  this.interviewTime = '';
  this.interviewInfo = '';
  this.client = '';
  this.vendor = '';
  this.subVendor = '';
  this.assistedBy = '';
  this.typeOfAssistance = '';
  this.selectedInterviewMode = '';
}

  // EDIT - DELETE - UPDATE 
  deleteinterviewdata(TraineeID: number) {
    this.deleteIndex = TraineeID;
    console.log(this.deleteIndex);
    this.showConfirmationDialog = true;
  }


  confirmDelete() {
    console.log(this.deleteIndex);
    let Req = {
      TraineeID: this.deleteIndex,
    };
    this.service.deleteinterviewdata(Req).subscribe((x: any) => {
      var flag = x.flag;
      this.fetchinterviewlist();
      if (flag === 1) {
        this.messageService.add({
          severity: 'success',
          summary: 'interviewdata Deleted Sucessfully',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Please try again later',
        });
      }

    });
    this.showConfirmationDialog = false;
  }


  cancelDelete() {
    console.log(this.showConfirmationDialog);
    this.showConfirmationDialog = false;
  }

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
  GoTonext(){
    this.router.navigate(['/candidateView/:id/sitevisit']);
  
  }
  
}

// const routes: Routes = [
//   // ...other routes
//   {
//     path: 'candidateView/:id/sitevisit',
//     component: CandidateComponent, // Replace with the actual component for the site visit
//   },
  
// ];