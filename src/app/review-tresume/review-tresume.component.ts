import { Component, OnChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ReviewService } from './review.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageModule } from 'primeng/message';
@Component({
  templateUrl: './review-tresume.component.html',
  providers: [CookieService, ReviewService, MessageService,AppService],
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
  formData: any;
  FinancialNotes: any;
  salaryinfo: any;
  Perdeium: any;
  legalStatus: any;
  maritalStatus: any;
  stateTaxExemptions: any;
  stateTaxAllowance: any;
  federalTaxAllowance: any;
  federalAddAllowance: any;
  gcDate: any;
  gcWages: any;
  lcaDate: any;
  lcaRate: any;
  State: any;
  healthInsurance: boolean = false;
  lifeInsurance: boolean = false;

  Bankname2: any;
  Bankname1: any;
  accountType1: any;
  accountType2: any;
  routingnum2: any;
  routingnum1: any;
  salaryDepositType: any;
  howMuch: any;

  //general declaration
  recruiterName: any;
  ReferredBy: any;
  currentStatus: any;
  legalStatusVal: any;
  legalStatusValend: any;
  division: any;
  OrgID: string;
userName: string;
tabIndex:number = 0;
  siteVisitTabClicked() {
    console.log('Additional logic for Site Visit tab click');
  }

  //generalinfo

  jobs: any[];
  SelectedRefered: string = '';
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  phoneNumber: number;
  email: string = '';
  dealOffered: string = '';
  referredByExternal: string = '';
  statusDate: string = '';
  duiFelonyInfo: string = '';
  statusStartDate: string = '';
  statusEndtDate: string = '';
  ftcNotes: string = '';
  otherNotes: string = '';
  dob: Date;
  SelectedDivision: string = '';

  items: any[] = [
    {
      value1: 'Name 1',
      value2: 'Name 2',
      value3: 'Name 3',
      value4: 'Name 4',
      value5: 'Name 5',
      value6: 'Name 6',
    }
  ]

  referedby: string[] = [];

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
  statuss: string[] = ['ON TRAINING', 'DIRECT MARKETTING', 'ON BENCH', 'MARKETTING ON HOLD', 'HAS OFFER', 'FIRST TIME CALLER', 'DROPPED TRAINING'];


  selectedLegalStatus: string = '-eligible to work in US-';
  legalstatuss: string[] = ['eligible to work in US', 'US CITIZEN', 'GC', 'F-1', 'F1-CPT', 'TSP-EAD', 'GC-EAD', 'L2-EAD'];

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

    let Req = {
      firstName: this.FormGeneral.value.firstname,
      middleName: this.FormGeneral.value.middleName,
      lastName: this.FormGeneral.value.lastName,
      recruiterName: this.FormGeneral.value.recruiterName,
      phoneNumberG: this.FormGeneral.value.phoneNumberG,
      generalEmail: this.FormGeneral.value.generalEmail,
      refered: this.FormGeneral.value.refered,
      DealOffered: this.FormGeneral.value.DealOffered,
      ReferredBy: this.FormGeneral.value.ReferredBy,
      ssn: this.FormGeneral.value.ssn,
      statusDate: this.FormGeneral.value.statusDate,
      duiFelonyInfo: this.FormGeneral.value.duiFelonyInfo,
      currentStatus: this.FormGeneral.value.currentStatus,
      legalStatusVal: this.FormGeneral.value.legalStatusVal,
      legalStatusValend: this.FormGeneral.value.legalStatusValend,
      selectedLegalStatus: this.FormGeneral.value.selectedLegalStatus,
      ftcNotes: this.FormGeneral.value.ftcNotes,
      otherNotes: this.FormGeneral.value.otherNotes,
      division: this.FormGeneral.value.division,
      dob: this.FormGeneral.value.dob,
      TraineeID:this.candidateID
    };
    console.log(Req);

    this.service.updateGeneral(Req).subscribe(
      (x: any) => {
        this.handleSuccess(x);
      },
      (error: any) => {
        this.handleError(error);
      }
    );
    
  }

  private handleSuccess(response: any): void {
    this.messageService.add({ severity: 'success', summary: 'Update successful.' });
    console.log(response);
  }
  
  private handleError(error: any): void {
    this.messageService.add({ severity: 'error', summary: 'Update failed. Please try again later.' });
    console.error(error);
  }

  saveInterviewFormData() {
    if (this.currentTabIndex === 1 && this.myForm.valid) {
      console.log(this.myForm.value);
    } else if (this.currentTabIndex === 1) {
      console.log("Form is invalid");
    } else {
      console.log("Form is not in the Interview tab");
    }
    console.log('Saving data for the Interview tab:', this.interviewFormData);

    let Req = {
      interviewDate: this.myForm.get('interviewDate').value,
      interviewTime: this.myForm.get('interviewTime').value,
      interviewInfo: this.myForm.get('interviewInfo').value,
      client: this.myForm.get('client').value,
      vendor: this.myForm.get('vendor').value,
      subVendor: this.myForm.get('subVendor').value,
      assistedBy: this.myForm.get('assistedBy').value,
      typeOfAssistance: this.myForm.get('typeOfAssistance').value,
      interviewMode: this.myForm.get('interviewMode').value,
    };
    // console.log(Req);
// console.log(Req);
    // this.service.saveInterviewFormData(Req).subscribe((x: any) => {
    //   console.log(x);
    // });
      // Log the form value, not the form itself
  // console.log(this.myForm.value);

  // // Assuming this.service is an Angular service
  // this.service.insertTraineeInterview(this.myForm.value).subscribe((response: any) => {
  // console.log(response);
  //   });
    console.log(Req);
    this.service.insertTraineeInterview(Req).subscribe((x: any) => {
      console.log(x);
    });
  }

  savePlacementFormData() {
    console.log('Saving data for the Placement tab:', this.placementFormData);
  }

  saveSubmissionFormData() {
    if (this.currentTabIndex === 3 && this.myFormSubmission.valid) {
      console.log(this.myFormSubmission.value);
    } else if (this.currentTabIndex === 3) {
      console.log("Form is invalid");
    } else {
      console.log("Form is not in the Submission tab");
    }
    console.log('Saving data for the Submission tab:', this.submissionFormData);

    let Req = {
      title: this.myFormSubmission.value.title,
      submissionDate: this.myFormSubmission.value.submissionDate,
      notes: this.myFormSubmission.value.notes,
      vendorName: this.myFormSubmission.value.vendorName,
      rate: this.myFormSubmission.value.rate,
      clientName: this.myFormSubmission.value.clientName,
      recruiteremail:this.userName,
      MarketerID:this.TraineeID,
      CandidateID:this.candidateID
    };
    console.log(Req);
    this.service.insertSubmissionInfo(Req).subscribe((x: any) => {
      console.log(x);
    }); 
  }

  saveFinancialInfoFormData() {
    console.log('Saving data for the Financial Info tab:', this.financialInfoFormData);

    let Req = {
      FinancialNotes: this.myFormFinancial.value.FinancialNotes,
      Salary: this.myFormFinancial.value.salaryinfo,
      Perdeium: this.myFormFinancial.value.Perdeium,
      LegalStatus: this.myFormFinancial.value.legalStatus,
      MaritalStatus: this.myFormFinancial.value.maritalStatus,
      StateTaxAllowance: this.myFormFinancial.value.stateTaxAllowance,
      StateTaxExemptions: this.myFormFinancial.value.stateTaxExemptions,
      FederalTaxAllowance: this.myFormFinancial.value.federalTaxAllowance,
      FederalTaxAdditionalAllowance: this.myFormFinancial.value.federalAddAllowance,
      Gcdate: this.myFormFinancial.value.gcDate,
      GCWages: this.myFormFinancial.value.gcWages,
      Lcadate: this.myFormFinancial.value.lcaDate,
      LCARate: this.myFormFinancial.value.lcaRate,
      state: this.myFormFinancial.value.State,
      healthInsurance: this.myFormFinancial.value.healthInsurance,
      lifeInsurance: this.myFormFinancial.value.lifeInsurance,

      Bank1Name: this.myFormFinancial.value.Bankname1,
      Bank2Name: this.myFormFinancial.value.Bankname2,
      Bank1AccountType: this.myFormFinancial.value.accountType1,
      Bank2AccountType: this.myFormFinancial.value.accountType2,
      Bank1AccountNumber: this.myFormFinancial.value.accountnum1,
      Bank2AccountNumber: this.myFormFinancial.value.accountnum2,
      Bank1RoutingNumber: this.myFormFinancial.value.routingnum1,
      Bank2RoutingNumber: this.myFormFinancial.value.routingnum2,
      SalaryDepositType: this.myFormFinancial.value.salaryDepositType,
      HowMuch: this.myFormFinancial.value.howMuch,

    };
    console.log(Req);
    this.service.updateFinancial(Req).subscribe((x: any) => {
      console.log(x);
    });
  }

  saveSiteVisitFormData() {
    console.log('Saving data for the Site Visit tab:', this.siteVisitFormData);
  }
  currentTabIndex: number;
  saveButtonLabel: string = 'Save General Data';

  onTabChange(tabIndex: number) {
    const tabLabels = ['General', 'Interview', '', 'Submission', 'Financial Info', ''];

    if (tabIndex >= 0 && tabIndex < tabLabels.length) {
      this.currentTabIndex = tabIndex;
      this.tabIndex = tabIndex;
      this.saveButtonLabel = `Save ${tabLabels[tabIndex]} Data`;
      this.router.navigate(['/reviewtresume/'+this.candidateID+'/'+tabIndex]);
    }
  }

  //interview
  // addRow() {
  //   this.rows.push({});
  // }

  // deleteRow() {
  //   if (this.rows.length > 1) {
  //     this.rows.pop();
  //   }
  // }
  // addRow1() {
  //   this.rows.push({});
  // }
  // deleteRow1() {
  //   if (this.rows.length > 1) {
  //     this.rows.pop();
  //   }
  // }

  TraineeID: string;
  interviewDate: string;
  interviewTime: string;
  selectedInterviewMode: string;
  interviewModes: string[] = ['Face to face', 'Zoom', 'Phone', 'Hangouts', 'WebEx', 'Skype', 'Others'];
  http: any;
  editRowIndex: number;
  showConfirmationDialog: boolean;
  deleteIndex: number;
  reviewService: any;
  placementList: any;
  candidateID:any;
  submissionList:any;


  constructor(private route: ActivatedRoute,private cookieService: CookieService, private service: ReviewService, private messageService: MessageService, private formBuilder: FormBuilder,private AppService:AppService, private router:Router) {
    
    this.candidateID = this.route.snapshot.params["traineeID"];
    console.log(this.candidateID);
    this.tabIndex = this.route.snapshot.params["tabIndex"];
    this.OrgID = this.cookieService.get('OrgID');
    this.userName = this.cookieService.get('userName1');
    this.TraineeID = this.cookieService.get('TraineeID');
   }

  ngOnInit(): void {
    this.fetchinterviewlist();
    this.getPlacementList();
    this.fetchCandidateInfo();
    this.getSubmissionList() ;
    this.getOrgUserList();
    this.currentTabIndex = 0;

    this.FormGeneral = this.formBuilder.group({
      phoneNumberG: ['', [Validators.required]],
      generalEmail: ['', [Validators.required]],
      recruiterName: [''],
      legalStatusVal: [''],
      firstname: [''],
      middleName: [''],
      lastName: [''],
      refered: [''],
      DealOffered: [''],
      ReferredBy: [''],
      ssnInput: [''],
      statusDate: [''],
      duiFelonyInfo: [''],
      status: [''],
      legalStatusValend: [''],
      selectedLegalStatus: [''],
      ftcNotes: [''],
      otherNotes: [''],
      division: [''],
      dob: [''],

    });
    
    this.myForm = this.formBuilder.group({
      interviewInfo: ['', [Validators.required, Validators.minLength(3)]],
      client: ['', [Validators.required, Validators.minLength(3)]],
      vendor: ['', [Validators.required, Validators.minLength(3)]],
      subVendor: ['', [Validators.required, Validators.minLength(3)]],
      assistedBy: ['', [Validators.required, Validators.minLength(3)]],
      typeOfAssistance: ['', [Validators.required, Validators.minLength(3)]],
      interviewMode: ['', [Validators.required, this.atLeastOneSelectedValidator]],
      interviewDate: ['', [Validators.required, this.futureDateValidator]],
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
       FinancialNotes: [''],
      salaryinfo: [''],
      maritalStatus: ['Married'],
      legalStatus: [''],
      Perdeium: [''],
      federalAddAllowance: [''],
      federalTaxAllowance: [''],
      stateTaxExemptions: [''],
      stateTaxAllowance: [''],
      lcaRate: [''],
      lcaDate: [''],
      gcWages: [''],
      gcDate: [''],
      State: [''],
      healthInsurance: [''],
      lifeInsurance: [false],

      Bankname1: [''],
      Bankname2: [''],
      accountType1: [''],
      accountType2: [''],
      salaryDepositType: [''],
      howMuch: [''],
      routingnum1: [''],
      routingnum2: [''],
    });



    // this.disableFormGroup(this.myFormFinancial);
    var viewaccess = this.AppService.checkViewOnly(2);
    if(!viewaccess){
      this.disableGeneralFields();
      this.disableInterviewFields();
      this.disableSubmissionFields();
      this.disableFinancialFields();
    }
    
  }

  disableGeneralFields() {
    Object.keys(this.FormGeneral.controls).forEach(controlName => {
      this.FormGeneral.get(controlName)?.disable();
    });
  }
  disableInterviewFields() {
    Object.keys(this.myForm.controls).forEach(controlName => {
      this.myForm.get(controlName)?.disable();
    });
  }
  disableSubmissionFields() {
    Object.keys(this.myFormSubmission.controls).forEach(controlName => {
      this.myFormSubmission.get(controlName)?.disable();
    });
  }
  disableFinancialFields() {
    Object.keys(this.myFormFinancial.controls).forEach(controlName => {
      this.myFormFinancial.get(controlName)?.disable();
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

  validTimeValidator(control: { value: string; }) {
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    if (!timeRegex.test(control.value)) {
      return { invalidTimeFormat: true };
    }
    return null;
  }

  atLeastOneSelectedValidator(control: AbstractControl) {
    const selectedMode = control.value;

    if (selectedMode === null || selectedMode === '') {
      return { atLeastOneSelected: true };
    }
    return null;
  }

  // Submission - form - validation - function 

  ngOnChanges(): void {
  }


  getPlacementList() {
    this.TraineeID = this.cookieService.get('TraineeID');

    const Req = {
      TraineeID: this.candidateID
    };

    this.service.getPlacementList(Req).subscribe((x: any) => {
      this.placementList = x.result;
    });
    // this.TraineeID = this.cookieService.get('TraineeID');
    // this.reviewService.getPlacementList({}).subscribe((response: { result: any; }) => {
    //   this.placementList = response.result; 
    // });
  }

  getSubmissionList() {
    this.TraineeID = this.cookieService.get('TraineeID');

    const Req = {
      TraineeID: this.candidateID
    };

    this.service.getSubmissionList(Req).subscribe((x: any) => {
      this.submissionList = x.result;
    });
  }
  
  fetchinterviewlist() {
    let Req = {
      TraineeID: this.candidateID,
    };
    this.service.getInterviewList(Req).subscribe((x: any) => {
      this.interview = x.result;
    });
  }

  getOrgUserList() {
    let Req = {
      TraineeID: this.candidateID,
      OrgID:this.OrgID
    };
    this.service.getOrgUserList(Req).subscribe((x: any) => {
    this.referedby = x.result;
    this.recruiterName = x.result;
    });
  }
  
  fetchCandidateInfo() {
    let Req = {
      TraineeID: this.candidateID,
    };
    this.service.getCandidateInfo(Req).subscribe((x: any) => {
      this.FormGeneral.patchValue({
    phoneNumberG: x.result[0].PhoneNumber || '', // Patching respective values to form controls
    generalEmail: x.result[0].UserName || '',
    recruiterName: x.result[0].RecruiterName || '',
    legalStatusVal: x.result[0].LegalStatus || '',
    firstname: x.result[0].FirstName || '',
    middleName: x.result[0].MiddleName || '',
    lastName: x.result[0].LastName || '',
    refered: x.result[0].refered || '',
    DealOffered: x.result[0].DealOffered || '',
    ReferredBy: x.result[0].ReferredBy_external || '',
    ssnInput: x.result[0].SSn || '',
    statusDate: x.result[0].statusdate || '',
    duiFelonyInfo: x.result[0].DuiFelonyInfo || '',
    status: x.result[0].Candidatestatus || '',
    legalStatusValend: x.result[0].Legalenddate || '',
    selectedLegalStatus: x.result[0].LegalStatus || '',
    ftcNotes: x.result[0].FTCNotes || '',
    otherNotes: x.result[0].Notes || '',
    division: x.result[0].division || '',
    dob: x.result[0].DOB || '',
  
      });
      this.myFormFinancial.patchValue({
        accountnum1: x.result[0].Bank1AccountNumber || '',
        accountnum2: x.result[0].Bank2AccountNumber || '',
         FinancialNotes: x.result[0]. FinancialNotes || '',
        salaryinfo: x.result[0].Salary || '',
        maritalStatus: x.result[0].MaritalStatus || 'Married',
        legalStatus: x.result[0].LegalStatus || '',
        Perdeium: x.result[0].Perdeium || '',
        federalAddAllowance: x.result[0].FederalTaxAdditionalAllowance || '',
        federalTaxAllowance: x.result[0].FederalTaxAllowance || '',
        stateTaxExemptions: x.result[0].StateTaxExemptions || '',
        stateTaxAllowance: x.result[0].StateTaxAllowance || '',
        lcaRate: x.result[0].LCARate || '',
        lcaDate: x.result[0].LCADate || '',
        gcWages: x.result[0].GCWages || '',
        gcDate: x.result[0].GCDate || '',
        State: x.result[0].FState || '',
        healthInsurance: x.result[0].HealthInsurance || '',
        lifeInsurance: x.result[0].LifeInsurance || false,
        Bankname1: x.result[0].Bank1Name || '',
        Bankname2: x.result[0].Bank2Name || '',
        accountType1: x.result[0].Bank1AccountType || '',
        accountType2: x.result[0].Bank2AccountType || '',
        salaryDepositType: x.result[0].SalaryDepositType || '',
        howMuch: x.result[0].HowMuch || '',
        routingnum1: x.result[0].Bank1RoutingNumber || '',
        routingnum2: x.result[0].Bank2RoutingNumber || '',
      });
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

  currentStatusOptions: string[] = ['ON TRAINING', 'DIRECT MARKETING', 'REQUIREMENT BASED MARKETING/SOURCING', 'ON BENCH', 'MARKETING ON HOLD', 'HAS OFFER', 'PLACED/WORKING AT THE CLIENT LOCATION', 'FIRST TIME CALLER', 'DROPPED-TRAINING', 'DROPPED-MARKETING', 'DROPED-OTHER', 'TERMINATE', 'REPLACED AS CLIENT SITE'];
  selectOptions: string = '';
  workStartDate: string = '';
  workEndDate: string = '';
  positionTitle: string = '';
  endClientName: string = '';
  vendorplacement: string = '';
  endClientAddress: string = '';

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
  legalStatusOptions: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa'];
  selectedOption: string = '';
  GoTonext() {
    this.router.navigate(['/candidateView/:id/sitevisit']);
  }

  // Education
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

  // deleteRow(index: number) {
  //   this.educations.splice(index, 1);
  // }

  //Above function will remove all row in education tab

  deleteRow(index: number) {
    if (this.educations.length > 1) {
      this.educations.splice(index, 1);
    }
  }

  // Experience

  experienceForm: FormGroup;
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
    if (this.experiences.length > 1) {
      this.experiences.splice(index, 1);
    }
  }

}
