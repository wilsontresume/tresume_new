import { Component,OnChanges,ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ReviewService } from './review.service';
import { MessageService } from 'primeng/api';
import { Routes } from '@angular/router';
import { CandidateComponent } from '../candidate/candidate.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CandidateService } from '../candidate/candidate.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './review-tresume.component.html',
  providers: [CookieService,ReviewService,MessageService,CandidateService, DashboardService],
  styleUrls: ['./review-tresume.component.scss']
})



export class ReviewTresumeComponent implements OnChanges {


saveButtonLabel: any;
saveData() {
throw new Error('Method not implemented.');
}
  showConfirmationDialog2: boolean;
myForm: any;
  

  siteVisitTabClicked() { console.log('Additional logic for Site Visit tab click');
}
//generalinfo

jobs:any[];
SelectedRefered: string = ''; 
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
rows: any[] = [{}]; // Initial row

//Ts for education
educations = [{
  degree: '',
  university: '',
  attendFrom: '',
  attendTo: '',
  universityAddress: ''
}];

addRow() {
  this.educations.push({
    degree: '',
    university: '',
    attendFrom: '',
    attendTo: '',
    universityAddress: ''
  });
}

deleteRow(index: number) {
  this.educations.splice(index, 1);
}

//ts for experience

experiences = [{
  title: '',
  startDate: '',
  endDate: '',
  skills: ''
}];

addRow1() {
  this.experiences.push({
    title: '',
    startDate: '',
    endDate: '',
    skills: ''
  });
}

deleteRow1(index: number) {
  this.experiences.splice(index, 1);
}

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
  reviewService: any;
  placementList: any;

  candidateID:any;
  public details: any;
  public eduDetails: any;
  public H1BStatus: any;
  public newJDDetails: any;
  public toggleView: boolean = false;
  @ViewChild('lgModal', { static: false }) lgModal?: ModalDirective;
constructor(private fb: FormBuilder,private cookieService: CookieService, private service:ReviewService,private messageService: MessageService,private route: ActivatedRoute, private cservice: CandidateService, private dashservice: DashboardService)
 { 

  this.details = [{
    CandidateName:'',
    Recruiter:'',
    Title:'',
    StartDate:'',
    ClientAddress:'',
    ClientSupervisor:'',
    VendorName:'',
  }]
  this.eduDetails = [{
    Title:''
  }]

  this.experienceForm = this.fb.group({
   firstName: ['', Validators.required], 
    title: ['', Validators.required],
    experienceStartDate: ['', Validators.required],
    experienceEndDate: ['', Validators.required],
    experienceSkills: ['', Validators.required]
  });
 }

 experienceForm: FormGroup;


   
 

ngOnInit(): void {
  this.candidateID = this.route.snapshot.params["traineeId"]?this.route.snapshot.params["traineeId"]:31466;
  // this.candidateID = 1;
    this.fetchinterviewlist();
    this.getPlacementList();
    this.cservice.getSiteVisitDetails(this.candidateID).subscribe(x => {
      let response = x.result;
      if (response) {
          this.details = response[0];
          this.getLegalStatus();
          this.cservice.getTraineeEduDetails(this.candidateID).subscribe(x => {
              this.toggleView = true;
              let response = x.result;
              if (response) {
                  this.eduDetails = response[0];
              }

          });
      }

  });
}

public getLegalStatus() {
  this.dashservice.getLegalStatus(1).subscribe(x => {
      let response = x.result;
      if (response) {
          this.H1BStatus = response.filter((y: any) => y.LegalStatusID == 14)[0].Total;

      }
  });
}

public saveJD() {
  var str;
  str = this.details.JobDuties.replace(/'/g, '\'\'');
  let request = {
      jd: str,
      traineeID: this.candidateID
  }
  this.cservice.updateJobDuties(request).subscribe(x => {
    
  });
}

printThisPage() {
  window.print();
}

public goBack() {
  window.history.back();
}
ngOnChanges(): void{
  // this.fetchinterviewlist();
  
}
getPlacementList() {
  this.TraineeID = this.cookieService.get('TraineeID');

  const Req = {
    TraineeID: this.TraineeID
  };

  this.service.getPlacementList(Req).subscribe((x: any) => {
    this.placementList = x.result;
  });


  // this.TraineeID = this.cookieService.get('TraineeID');
  // this.reviewService.getPlacementList({}).subscribe((response: { result: any; }) => {
  //   this.placementList = response.result; 
  // });
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

  // INTERVIEW - DELETE
  deleteinterviewdata(TraineeInterviewID: number) {
    this.deleteIndex = TraineeInterviewID;
    console.log(this.deleteIndex);
    this.showConfirmationDialog = true;
  }

  confirmDelete() {
    console.log(this.deleteIndex);
    let Req = {
      TraineeInterviewID: this.deleteIndex,
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

 
//placement tab

currentStatusOptions: string[] = [ 'ON TRAINING', 'DIRECT MARKETING', 'REQUIREMENT BASED MARKETING/SOURCING','ON BENCH','MARKETING ON HOLD','HAS OFFER','PLACED/WORKING AT THE CLIENT LOCATION','FIRST TIME CALLER','DROPPED-TRAINING','DROPPED-MARKETING','DROPED-OTHER','TERMINATE','REPLACED AS CLIENT SITE']; 
selectOptions: string = ''; 
//Table-Heads
workStartDate:string = '';
workEndDate:string = '';
positionTitle:string = '';
endClientName:string = '';
vendorplacement:string = '';
endClientAddress:string = '';

// PLACEMENT - DELETE 
deleteplacementdata(PID: number) {
  this.deleteIndex = PID;
  console.log(this.deleteIndex);
  this.showConfirmationDialog2 = true;
}

confirmDeleteplacement() {
  console.log(this.deleteIndex);
  let Req = {
    PID: this.deleteIndex,
  };
  this.service.deleteplacementdata(Req).subscribe((x: any) => {
    var flag1 = x.flag1;

    if (flag1 === 1) {
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
  this.showConfirmationDialog2 = false;
}
cancelDeleteplacement() {
  console.log(this.showConfirmationDialog2);
  this.showConfirmationDialog2 = false;
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
    alert("the button is working");
  }

  onTabChange(event: MatTabChangeEvent) {
    if (event.index === 5) { 
      console.log("Working");
      const candidateId = 31466; 
      this.router.navigate([`/candidateView/${candidateId}/sitevisit`]);
    }
}
goToSiteVisit() {
  const candidateId = 31466; 
  this.router.navigate([`/candidateView/${candidateId}/sitevisit`]);
}
// const routes: Routes = [
//   {
//     path: 'candidateView/:id/sitevisit',
//     component: CandidateComponent, // Replace with the actual component for the site visit
//   },
  
// ]
}