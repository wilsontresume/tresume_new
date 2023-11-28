import { Component,OnChanges, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ReviewService } from './review.service';
import { MessageService } from 'primeng/api';
import { request } from 'express';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';


@Component({
  templateUrl: './review-tresume.component.html',
  providers: [CookieService,ReviewService,MessageService],
  styleUrls: ['./review-tresume.component.scss']
})



export class ReviewTresumeComponent implements OnChanges {
showConfirmationDialog2: boolean;
myForm: any;
interviewForm: any;
myFormSubmission: any;
myFormFinancial: any;
myFormFinancialinfo: any;
FormGeneral: any;


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
  
//General - SSN
ssn: string = '';
showSSN: boolean = false;
inputDisabled: boolean = true;

startShowingSSN() {
  this.showSSN = true;
  this.inputDisabled = false;
}

stopShowingSSN() {
  this.showSSN = false;
  this.inputDisabled = true;
}

generalFormData: any = {}; 
interviewFormData: any = {};
placementFormData: any = {};
submissionFormData: any = {};
financialInfoFormData: any = {};
siteVisitFormData: any = {};

saveData() {
  switch (this.currentTabIndex) {
    case 0:
      this.saveGeneralFormData();
      break;
    case 1:
      this.saveInterviewFormData();
      break;
    case 2:
      this.savePlacementFormData();
      break;
    case 3:
      this.saveSubmissionFormData();
      break;
    case 4:
      this.saveFinancialInfoFormData();
      break;
    case 5:
      this.saveSiteVisitFormData();
      break;
    default:
      console.error('Invalid tab index');
  }
}

saveGeneralFormData() {
  console.log('Saving data for the General tab:', this.generalFormData);
  alert("Check Save General Data ");
}

saveInterviewFormData() {
  if (this.currentTabIndex === 1 && this.myForm.valid) {
        console.log(this.myForm.value);
      } else if (this.currentTabIndex === 1 ){
        console.log("Form is invalid");
      } else {
        console.log("Form is not in the Interview tab");
      }
  console.log('Saving data for the Interview tab:', this.interviewFormData);
  alert("Check Only Interview Data ");
}

savePlacementFormData() {
  console.log('Saving data for the Placement tab:', this.placementFormData);
  alert("Check Save Placement Data ");
}

saveSubmissionFormData() {
  if (this.currentTabIndex === 3 && this.myFormSubmission.valid) {
    console.log(this.myFormSubmission.value);
  } else if (this.currentTabIndex === 3 ){
    console.log("Form is invalid");
  } else {
    console.log("Form is not in the Submission tab");
  }
  console.log('Saving data for the Submission tab:', this.submissionFormData);
  alert("Check Save Submission Data ");
}

saveFinancialInfoFormData() {
  console.log('Saving data for the Financial Info tab:', this.financialInfoFormData);
  alert("Check Save Financial Data ");
}

saveSiteVisitFormData() {
  console.log('Saving data for the Site Visit tab:', this.siteVisitFormData);
  alert("Check Only Site Visit Data ");
}
currentTabIndex: number;
// saveButtonLabel: string = 'Save General Data';

onTabChange(tabIndex: number) {
  const tabLabels = ['General', 'Interview', 'Placement', 'Submission', 'Financial Info', 'Site Visit'];

  if (tabIndex >= 0 && tabIndex < tabLabels.length) {
    this.currentTabIndex = tabIndex;
    this.saveButtonLabel = `Save ${tabLabels[tabIndex]} Data`;
  }
} 
  // Save Button Function

  // saveData() {
  //   if (this.myForm.valid) {
  //     console.log(this.myForm.value);
  //   } else {
  //     console.log("Form is invalid");
  //   }
  // }

  // saveData() {
  //   if (this.currentTabIndex === 1 && this.myForm.valid) {
  //     console.log(this.myForm.value);
  //   } else if (this.currentTabIndex === 1 ){
  //     console.log("Form is invalid");
  //   } else {
  //     console.log("Form is not in the Interview tab");
  //   }
  // }
  // saveData() {
  //   if (this.currentTabIndex === 1 && this.myForm.valid) {
  //     console.log(this.myForm.value);
  //   } else if (this.currentTabIndex === 1 ){
  //     console.log("Form is invalid");
  //   } else {
  //     console.log("Form is not in the Interview tab");
  //   }
  // }

  // onTabChange(tabIndex: number) {
  //   const tabLabels = ['General', 'Interview', 'Placement', 'Submission', 'Financial Info', 'Site Visit'];
  //   if (tabIndex >= 0 && tabIndex < tabLabels.length) {
  //     this.saveButtonLabel = `Save ${tabLabels[tabIndex]} Data`;
  //   }
  // }


//interview

TraineeID: string;
interviewDate: string; 
interviewTime: string; 
selectedInterviewMode: string;
interviewModes: string[] = ['Face to face', 'Zoom', 'Phone', 'Hangouts', 'WebEx', 'Skype', 'Others'];
router: any;
  http: any;
  editRowIndex: number;
  showConfirmationDialog: boolean;
  deleteIndex: number;
  reviewService: any;
  placementList: any;
constructor(private cookieService: CookieService, private service:ReviewService,private messageService: MessageService, private formBuilder: FormBuilder)
 { }

ngOnInit(): void {
    this.fetchinterviewlist();
    this.getPlacementList();
    this.currentTabIndex = 0;

    this.FormGeneral = this.formBuilder.group({
      phoneNumberG: ['', [Validators.required]],
      generalEmail: ['', [Validators.required]],
    });

    this.myForm = this.formBuilder.group({
      interviewInfo: ['', [Validators.required, Validators.minLength(3)]],
      client: ['', [Validators.required, Validators.minLength(3)]],
      vendor: ['', [Validators.required, Validators.minLength(3)]],
      subVendor: ['', [Validators.required, Validators.minLength(3)]],
      assistedBy: ['', [Validators.required, Validators.minLength(3)]],
      typeOfAssistance: ['', [Validators.required, Validators.minLength(3)]],
      interviewMode: ['', [Validators.required, this.atLeastOneSelectedValidator]], 
      interviewDate: ['', [Validators.required, this.futureDateValidator ]],
      interviewTime: ['', [Validators.required, this.validTimeValidator]],
    });

    this.myFormSubmission = this.formBuilder.group({
      submissionDate: ['', [Validators.required, this.futureDateValidator]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      notes: ['', [Validators.required, Validators.minLength(3)]],
      vendorName: ['', [Validators.required, Validators.minLength(3)]],
      rate: ['', [Validators.required, Validators.minLength(3)]],
      clientName: ['', [Validators.required, Validators.minLength(3)]],
      
    });

    this.myFormFinancial = this.formBuilder.group({
      accountnum1: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      accountnum2: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
    });
}
// interview - form - validation - function 
futureDateValidator(control: { value: string | number | Date; }) {
  const currentDate = new Date();
  const selectedDate = new Date(control.value);

  if (selectedDate <= currentDate) {
    return { futureDate: true };
  }

  return null;
}
// interview - form - validation - function 

validTimeValidator(control: { value: string; }) {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  if (!timeRegex.test(control.value)) {
    return { invalidTimeFormat: true };
  }

  return null;
}
// interview - form - validation - function 

atLeastOneSelectedValidator(control: AbstractControl) {
  const selectedMode = control.value;

  if (selectedMode === null || selectedMode === '') {
    return { atLeastOneSelected: true };
  }

  return null;
}
// Submission - form - validation - function 

ngOnChanges(): void{  
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
  }
}

// const routes: Routes = [
//   // ...other routes
//   {
//     path: 'candidateView/:id/sitevisit',
//     component: CandidateComponent, // Replace with the actual component for the site visit
//   },
  
// ];
