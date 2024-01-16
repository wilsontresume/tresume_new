import { TalentBenchService} from './talent-bench.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-talent-bench',
  templateUrl: './talent-bench.component.html',
  styleUrls: ['./talent-bench.component.scss'],
  providers: [TalentBenchService, CookieService,MessageService],
})
export class TalentBenchComponent implements OnInit {
  loading:boolean = false;
  candidates: string[] = ['Candidate 1', 'Candidate 2', 'Candidate 3'];
  // formData: any = {};
  OrgID:string = '';
  userName:string = '';
  TraineeID:string = '';
  addCandidate: any;
  recruiterName: any;
  selectedcurrentstatus: any;
  currentStatusOptions: any = [];
  legalStatusOptions: any;
  legalStatus: string[] = [];
  tableData: any[] = []; 
  searchTerm: string = '';
  noResultsFound: boolean = false;
  
  constructor(private dialog: MatDialog,private cookieService: CookieService, private service:TalentBenchService,private messageService: MessageService,private formBuilder: FormBuilder) {
    }

  recruiterNames: string[] = [];
  candidateStatuses: string[] = [];
  marketerNames: string[] = [''];
  marketerName: string[] = [''];
  referralTypes: string[] = ['Phone', 'Email', 'Others'];
  referralType: string[] = [''];
  item = {
    groupName: 'group1'
  };

  groupOptions: any[] = [
    { value: 'group1', label: 'Group 1' },
    { value: 'group2', label: 'Group 2' },
    { value: 'group3', label: 'Group 3' }
  ];


  // onSubmit() {
  //   console.log('Form Data:', this.formData);
  // }

  dataArray: any[] = [
    { groupName: 'Group A', candidateCount: 10 },
    { groupName: 'Group B', candidateCount: 5 },
  ];

  onIconClick() {
    alert('are you sure want to delete?');
  }


  ngOnInit(): void {
    // this.cookieService.set('userName1','karthik@tresume.us');
    // this.cookieService.set('OrgID','82');
    // this.cookieService.set('TraineeID','569');
    // this.cookieService.set('TimesheetRole','1');
    // this.cookieService.set('RoleID','17');
    this.OrgID = this.cookieService.get('OrgID');
    this.userName = this.cookieService.get('userName1');
    this.TraineeID = this.cookieService.get('TraineeID');
    this.fetchtalentbenchlist();
    this.getcandidaterstatus();
    this.getLegalStatusOptions();
    this.getOrgUserList();


    this.addCandidate = this.formBuilder.group({
      FirstName: ['', [Validators.required, Validators.minLength(3)]],
      MiddleName: [''],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.minLength(3)]],
      Phone: ['', [Validators.required, Validators.minLength(3)]],
      Gender: ['male'],
      RecruiterName: [''],
      Degree: [''],
      University: [''],
      CandidateStatus: [''],
      Groups: [''],
      LegalStatus: [''],
      marketerName: ['', Validators.required],
      LocationConstraint: ['yes'],
      ReferralType: [''],
      Notes: [''],
    });

  }
  getcandidaterstatus(){
    const Req = {
         };
    this.service.candidatestatus(Req).subscribe((x: any) => {
      this.currentStatusOptions = x;
      console.log(this.currentStatusOptions);
    });
  }

  getLegalStatusOptions() {
    const request = {};
  
    this.service.getLegalStatus(request).subscribe((response: any) => {
      this.legalStatusOptions = response;
      console.log(this.legalStatusOptions);
    });
  }

  saveData(){
    let Req = {
      firstName: this.addCandidate.value.FirstName,
      middleName: this.addCandidate.value.MiddleName,
      lastName: this.addCandidate.value.LastName,
      email: this.addCandidate.value.Email,
      Phone: this.addCandidate.value.Phone,
      gender: this.addCandidate.value.Gender,
      recruiterName: this.recruiterName,
      degree: this.addCandidate.value.Degree,
      University: this.addCandidate.value.University,
      candidateStatus: this.selectedcurrentstatus,
      Groups: this.addCandidate.value.Groups,
      legalStatus: this.addCandidate.value.LegalStatus,
      MaketerName: this.marketerName,
      locationConstraint: this.addCandidate.value.LocationConstraint,
      referralType: this.addCandidate.value.referralType,
      notes: this.addCandidate.value.Notes,
      orgID:this.OrgID,
      createby:this.userName,
      followupon:'',
      currentLocation:''
    };

    console.log(Req);
    this.service.AddTalentBenchList(Req).subscribe(
      (x: any) => {
        this.handleSuccess(x);
        this.fetchtalentbenchlist();
      },
      (error: any) => {
        this.handleError(error);
      }
    );
  }
  
  private handleSuccess(response: any): void {
    this.messageService.add({ severity: 'success', summary: response.message });
    this.loading = false;
    console.log(response);
  }
  
  private handleError(response: any): void {
    this.messageService.add({ severity: 'error', summary:  response.message });
    this.loading = false;
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
//   fetchtalentbenchlist(){
//     let Req = {
//       OrgID: this.OrgID,
//     };
//   this.service.getTalentBenchList(Req).subscribe((x: any) => {
//     this.tableData = x.result;
//     this.noResultsFound = this.tableData.length === 0;
//   });
// }
fetchtalentbenchlist() {
  let Req = {
    traineeID: this.TraineeID,
    OrganizationID:this.OrgID
  };
  this.service.getTalentBenchList(Req).subscribe((x: any) => {
    this.tableData = x.result;
    this.noResultsFound = this.tableData.length === 0;
  });
}

searchInput: string = '';


}
