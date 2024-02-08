import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { HrmsService, } from './hrms.service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-hrms',
  templateUrl: './hrms.component.html',
  providers: [CookieService, HrmsService, MessageService],
  styleUrls: ['./hrms.component.scss']
})

export class HrmsComponent implements OnInit {
  candidateID:any;
  interviewData: any[];
  candidates1: string[] = ['Candidate 1', 'Candidate 2', 'Candidate 3'];
  recruiterNames: any ='';
  recruiterName:any;
  candidateStatuses: string[] = ['', '', ''];
  marketerNames: string[] = ['Marketer 1', 'Marketer 2', 'Marketer 3'];
  referralTypes: string[] = ['Phone', 'Email', 'Others'];
  LegalStatus: string[] = [];
  formData: any = {};
  datecreated: Date[];
  followupon: Date[];
  candidates: any[] = [];
  noResultsFound: boolean = false;
  TraineeID: string;
  addCandidate: any;
  OrgID: string;
  userName: string;
  emailvalidation: boolean = false;
  emailvalidationmessage: string = '';
  routeType: any;
  currentStatusOptions:any;
  legalStatusOptions:any;
  selectedcurrentstatus: any;
  currentLocation: any;
  filteredCandidates: any[];
  specifiedDate: string = ''; 
  modalService: any;

    onFollowUpOptionChange() {
    }

  selectedFollowUpOption: any;
  Locations: any;
  followUpStartDate: string = '';
  followUpEndDate: string = '';
  dateCreatedStartDate: string = '';
  dateCreatedEndDate: string = '';

  title: string;
  submissionDate: Date;
  notes: string;
  vendorName: string;
  rate: number;
  clientName: string;

  constructor(private cookieService: CookieService, private service: HrmsService, private messageService: MessageService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.OrgID = this.cookieService.get('OrgID');
    this.userName = this.cookieService.get('userName1');
    this.TraineeID = this.cookieService.get('TraineeID');
    this.routeType = this.route.snapshot.params["routeType"];
    this.candidateID = this.route.snapshot.params["traineeID"];
    
  }

  ngOnInit(): void {
    this.TraineeID = this.cookieService.get('TraineeID');
    this.getOrgUserList();
    this.getcandidaterstatus();
    this.getLegalStatusOptions();
    this.fetchhrmscandidatelist();
    this.gethrmsLocation();

    this.addCandidate = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(3)]],
      recruiterName: ['', [Validators.required, this.atLeastOneSelectedValidator()]],
      degree: [''],
      groups: [''],
      LegalStatus: [''],
      locationConstraint: ['yes'],
      marketerName: [''],
      notes: [''],
      referralType: [''],
      university: [''],
      middleName: [''],
      gender: ['male'],
      Location:['']
    });

    // TimeSheet Module /////////////////////////////////////////////////////////////////////////////////////////
    // for Admin Dropdown
    // document.addEventListener('DOMContentLoaded', function () {
    //   const dummyNames: string[] = ['', 'Name 1', 'Name 2', 'Name 3', 'Name 4', 'Name 5'];
    
    //   const adminSelect: HTMLSelectElement = document.getElementById('adminSelect') as HTMLSelectElement;
    
    //   dummyNames.forEach((name: string, index: number) => {
    //     const option: HTMLOptionElement = document.createElement('option');
    //     option.value = `value_${index + 1}`;
    //     option.text = name;
    //     adminSelect.add(option);
    //   });
    // });
    

    //Client Select
    // const clients: string[] = ["", "Client 1", "Client 2", "Client 3", "Client 4", "Client 5", "Client 6"];

    // const clientSelect: HTMLSelectElement = document.getElementById("clientselect") as HTMLSelectElement;
    
    // clients.forEach((client: string, index: number) => {
    //   const option: HTMLOptionElement = document.createElement("option");
    //   option.value = index.toString();
    //   option.text = client;
    //   clientSelect.add(option);
    // });
    
  }

  
  // fetchinterviewlist() {
  //   let Req = {
  //     TraineeID: this.candidateID,
  //   };
  //   this.service.getInterviewList(Req).subscribe((x: any) => {
  //   // this.interview = x.result;
  //   });
  // }
  

  onEmailInput() {
    this.checkEmail();
  }

  checkEmail() {
    const email = this.addCandidate.get('email').value;

    if (email) {
      let Req = {
        email: email,
        orgID: this.OrgID
      };
      this.service.checkEmail(Req).subscribe((x: any) => {
        var flag = x.flag;
        if (flag === 2) {
          this.emailvalidation = true;
          this.emailvalidationmessage = x.message;
        } 
        else if (flag === 1){
          this.emailvalidation = false;
          this.emailvalidationmessage = '';

        }
      });
    }
  }


  atLeastOneSelectedValidator() {
    return (control: { value: any; }) => {
      const selectedValue = control.value;
      if (selectedValue && selectedValue.length > 0) {
        return null;
      } else {
        return { atLeastOneSelected: true };
      }
    };
  }
  ngOnChanges(): void {
    // this.fetchhrmscandidatelist();
  }



  getcandidaterstatus(){
    const Req = {

    };
    this.service.candidatestatus(Req).subscribe((x: any) => {
      this.currentStatusOptions = x;
    });
  }

  getLegalStatusOptions() {
    const request = {};
  
    this.service.getLegalStatus(request).subscribe((response: any) => {
      this.legalStatusOptions = response;
      console.log(this.legalStatusOptions);
    });
  }
  
  

  fetchhrmscandidatelist() {

    this.loading = true;
    let Req = {
      TraineeID: this.TraineeID,
    };
    this.service.gethrmscandidateList(Req).subscribe((x: any) => {
      this.candidates = x.result;
      this.noResultsFound = this.candidates.length === 0;
      this.loading = false;
    });
  }

  getOrgUserList() {
    let Req = {
      TraineeID: this.TraineeID,
      orgID: this.OrgID
    };
    this.service.fetchrecruiter(Req).subscribe((x: any) => {
      this.recruiterNames = x;
      this.marketerNames = x;
    });
  }
  loading:boolean = false;

  savehrmsdata() {
    this.loading = true;
    var followupon = '';
    if(this.selectedFollowUpOption == 'SpecifiedDate'){
      followupon = this.specifiedDate;
    }

    let Req = {
      firstName: this.addCandidate.value.firstName,
      middleName: this.formData.middleName,
      lastName: this.addCandidate.value.lastName,
      email: this.addCandidate.value.email,
      phone: this.addCandidate.value.phone,
      gender: this.addCandidate.value.gender,
      recruiterName: this.recruiterName,
      degree: this.addCandidate.value.degree,
      university: this.addCandidate.value.university,
      referralType: this.formData.referralType,
      notes: this.addCandidate.value.notes,
      candidateStatus: this.selectedcurrentstatus,
      LegalStatus: this.LegalStatus,
      recruiteremail: this.userName,
      orgID:this.OrgID,
      creeateby:this.userName,
      followupon:followupon,
      currentLocation:this.currentLocation
      

      // marketerName: this.formData.marketerName,
      // groups: this.addCandidate.value.groups,
      // locationConstraint: this.addCandidate.value.locationConstraint,
    };
    // console.log(Req);
    // console.log(Req);
    // this.service.addHrmsCandidate(Req).subscribe((x: any) => {
    //   console.log(x);
    // });
    console.log(Req);
    //     this.service.insertTrainee(Req).subscribe((ax: any) => {
    //       console.log(ax);
    // this.service.insertTraineeCandidate(Req).subscribe((x: any) => {
    //   console.log(x);
    // });
    this.service.insertTraineeCandidate(Req).subscribe(
      (x: any) => {
        this.handleSuccess(x);
        this.fetchhrmscandidatelist();
      },
      (error: any) => {
        this.handleError(error);
      }
    );
    
  }

  onSubmit() {
    console.log('Form Data:', this.formData);
  }
  
  sortBy: string = 'DateCreated';
  sortOrder: string = 'asc';

  sortTable(column: string) {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }

    this.filteredCandidates = this.sortCandidates();
  }

  sortCandidates(): any[] {
    return this.candidates.sort((a, b) => {
      const dateA = new Date(a.DateCreated).getTime();
      const dateB = new Date(b.DateCreated).getTime();

      if (this.sortOrder === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }


  sortCandidatesdate(sortByField: string) {
    // Your logic to update sortBy and sortOrder based on your requirements for sorting candidates
    if (this.sortBy === sortByField) {
      // If already sorting by the same field, toggle the sort order
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // If sorting by a different field, set the new field and default to ascending order
      this.sortBy = sortByField;
      this.sortOrder = 'asc';
    }} 


  searchInput: string = '';

  isCandidateVisible(candidate: any): boolean {

    console.log(candidate);
    const searchValue = this.searchInput.toLowerCase();
     const followUpDate = new Date(candidate.FollowUpDate);
     const followUpStartDate = this.followUpStartDate ? new Date(this.followUpStartDate) : null;
     const followUpEndDate = this.followUpEndDate ? new Date(this.followUpEndDate) : null;
     const followUpInRange = (!followUpStartDate || followUpDate >= followUpStartDate) &&
       (!followUpEndDate || followUpDate <= followUpEndDate);
 
     const dateCreated = new Date(candidate.DateCreated);
     const dateCreatedStartDate = this.dateCreatedStartDate ? new Date(this.dateCreatedStartDate) : null;
     const dateCreatedEndDate = this.dateCreatedEndDate ? new Date(this.dateCreatedEndDate) : null;
     const dateCreatedInRange = (!dateCreatedStartDate || dateCreated >= dateCreatedStartDate) &&
       (!dateCreatedEndDate || dateCreated <= dateCreatedEndDate);
 

    return (
      candidate.Email.toLowerCase().includes(searchValue) ||
      candidate.Name.toLowerCase().includes(searchValue) ||
      candidate.Phone.toLowerCase().includes(searchValue)
    );
  }

  gethrmsLocation() {
    let Req = {
      TraineeID: this.TraineeID,
      orgID: this.OrgID
    };
    this.service.getLocation(Req).subscribe((x: any) => {
      this.Locations = x;
    });
  }

  fromDateEntered: boolean = false;
  toDateEntered: boolean = false;

  onClear() {
    this.dateCreatedStartDate = '';
    this.dateCreatedEndDate = '';
    this.fromDateEntered = false;
    this.toDateEntered = false;
    this.filteredCandidates = [];
    this.fetchhrmscandidatelist();
  }

  isSearchButtonDisabled(): boolean {
    return !this.fromDateEntered || !this.toDateEntered || this.dateCreatedStartDate > this.dateCreatedEndDate;
  }

  onSearch(): void {
    this.loading = true;
    const Req = {
      TraineeID: this.TraineeID,
    };

    this.service.gethrmscandidateList(Req).subscribe((response: any) => {
      this.candidates = response.result;
      this.candidates = this.candidates.filter(candidate => {
        const candidateDate = new Date(candidate.DateCreated);
        return candidateDate >= new Date(this.dateCreatedStartDate) && candidateDate <= new Date(this.dateCreatedEndDate);
      });
      this.loading = false;
    });
  }

  followstartdate: boolean = false;
  followenddate: boolean = false;
  
  clearAndReload() {
    this.followUpStartDate = '';
    this.followUpEndDate = '';
    this.followstartdate = false;
    this.followenddate = false;
    this.fetchhrmscandidatelist();
  }

  followuponbutton(): boolean{
    return  !this.followstartdate || !this.followenddate || this.followUpStartDate > this.followUpEndDate;
  }

  filterCandidates(): void {
    this.loading = true;
    const Req = {
      TraineeID: this.TraineeID,
    };
  
    this.service.gethrmscandidateList(Req).subscribe((response: any) => {
      this.candidates = response.result;
      this.candidates = this.candidates.filter(candidate => {
        const followUpDate = new Date(candidate.followupon);
        return followUpDate >= new Date(this.followUpStartDate) && followUpDate <= new Date(this.followUpEndDate);
      });
      this.loading = false;
    });
  }

  // Add interview 
  myForm: any;
  interviewFormData: any = {};
  submissionFormData: any = {};
  interviewModes: string[] = ['Face to face', 'Zoom', 'Phone', 'Hangouts', 'WebEx', 'Skype', 'Others'];
  interviewDate: Date; 
  interviewTime: string;
  interviewInfo: string;
  client: string;
  vendor: string;
  subVendor: string;
  assistedBy: string;
  typeOfAssistance: string;
  interviewMode: string;
  submissionList: any[] = []; 

  saveInterviewData() {
    console.log('Saving data for the Interview tab:', this.interviewFormData);
  
    let Req = {
      interviewDate: this.interviewDate,
      interviewTime: this.interviewTime,
      interviewInfo: this.interviewInfo,
      client: this.client,
      vendor: this.vendor,
      subVendor: this.subVendor,
      assistedBy: this.assistedBy,
      typeOfAssistance: this.typeOfAssistance,
      interviewMode: this.interviewMode,
      interviewTimeZone: 'EST',
      traineeID: this.candidateID,
      recruiterID: this.TraineeID,
      recruiteremail: this.userName,
      InterviewStatus: 'SCHEDULED',
    };
    console.log(Req);
    this.service.insertTraineeInterview(Req).subscribe(
      (x: any) => {
        this.handleSuccess(x);
      },
      (error: any) => {
        this.handleError(error);
      }
    );
  }

  openInterviewModal(candidateID: string) {
    this.candidateID = candidateID;
  }

  getSubmissionList() {
    console.log('Saving data for the Submission tab:', this.submissionFormData);

    let Req = {
      title: this.title,
      submissionDate: this.submissionDate,
      notes: this.notes,
      vendorName: this.vendorName,
      rate: this.rate,
      clientName: this.clientName,
      recruiteremail:this.userName,
      MarketerID:this.TraineeID,
      CandidateID:this.candidateID
    };
    console.log(Req);
    this.service.insertSubmissionInfo(Req).subscribe((x: any) => {
      this.handleSuccess(x);
    },
    (error: any) => {
      this.handleError(error);
    }
  );
  }

  openSubmissionModal(candidateID: string) {
    this.candidateID = candidateID;
  }

  private handleSuccess(response: any): void {
    this.messageService.add({ severity: 'success', summary: response.message });
    console.log(response);
    this.loading = false;
    // this.fetchinterviewlist();
  }
  
  private handleError(response: any): void {
    this.messageService.add({ severity: 'error', summary:  response.message });
    this.loading = false;
  }

  updateSelected(selectedId: any, traineeID: number,type:any) {
    this.loading = true;
    var req = {}
   if(type == 1){
    req = {
      traineeid : traineeID,
      followupon : selectedId
    }
   }else{
    req = {
      traineeid : traineeID,
      followupon : selectedId
    }
  }
    this.service.hrmsupdateSelected(req).subscribe((x: any) => {
      if(x.flag == 1){
        this.messageService.add({ severity: 'success', summary: x.message });
        this.loading = false;
      }else{
        this.messageService.add({ severity: 'error', summary: x.message });
        this.loading = false;
      }
    });
  
   }
}


