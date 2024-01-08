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

  candidates1: string[] = ['Candidate 1', 'Candidate 2', 'Candidate 3'];
  recruiterNames: string[] = ['Recruiter 1', 'Recruiter 2', 'Recruiter 3'];
  candidateStatuses: string[] = ['', '', ''];
  marketerNames: string[] = ['Marketer 1', 'Marketer 2', 'Marketer 3'];
  referralTypes: string[] = ['Phone', 'Email', 'Others'];
  legalStatus: string[] = ['Eligible to work in the US', 'US Citizen','GC','F-1','F1-CPT','F1-OPT EAD','GC-EAD','TPS EAD','H4-EAD','L2-EAD','Asylum EAD','Other EAD','TN Visa','H1-B Visa','L1 Visa','E3 Visa','Other Visa'];
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
  selectedcurrentstatus: any;
  filteredCandidates: any[];

  constructor(private cookieService: CookieService, private service: HrmsService, private messageService: MessageService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.OrgID = this.cookieService.get('OrgID');
    this.userName = this.cookieService.get('userName1');
    this.TraineeID = this.cookieService.get('TraineeID');
    this.routeType = this.route.snapshot.params["routeType"];
  }

  ngOnInit(): void {
    this.TraineeID = this.cookieService.get('TraineeID');
    this.getOrgUserList();
    this.getcandidaterstatus();
    this.fetchhrmscandidatelist();
    this.addCandidate = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(3)]],
      recruiterName: ['', [Validators.required, this.atLeastOneSelectedValidator()]],
      degree: [''],
      groups: [''],
      legalStatus: ['Legal'],
      locationConstraint: ['yes'],
      marketerName: [''],
      notes: [''],
      referralType: [''],
      university: [''],
      middleName: [''],
      gender: ['male']
    });

    // TimeSheet Module /////////////////////////////////////////////////////////////////////////////////////////
    // for Admin Dropdown
    document.addEventListener('DOMContentLoaded', function () {
      const dummyNames = ['','Name 1', 'Name 2', 'Name 3', 'Name 4', 'Name 5'];

      const adminSelect = document.getElementById('adminSelect') as HTMLSelectElement;

      dummyNames.forEach((name, index) => {
        const option = document.createElement('option');
        option.value = `value_${index + 1}`;
        option.text = name;
        adminSelect.add(option);
      });
    });

    //Client Select
    const clients: string[] = ["","Client 1", "Client 2", "Client 3", "Client 4", "Client 5", "Client 6"];

    const clientSelect = document.getElementById("clientselect") as HTMLSelectElement;

    clients.forEach((client, index) => {
      const option = document.createElement("option");
      option.value = index.toString();
      option.text = client;
      clientSelect.add(option);
    });

  }

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
      });
    }
  }


  atLeastOneSelectedValidator() {
    return (control: { value: any; }) => {
      const selectedValue = control.value;
      if (selectedValue && selectedValue.length > 0) {
        return null; // Valid
      } else {
        return { atLeastOneSelected: true }; // Invalid
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
      console.log(this.currentStatusOptions);
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

    let Req = {
      firstName: this.addCandidate.value.firstName,
      middleName: this.formData.middleName,
      lastName: this.addCandidate.value.lastName,
      email: this.addCandidate.value.email,
      phone: this.addCandidate.value.phone,
      gender: this.addCandidate.value.gender,
      recruiterName: this.addCandidate.value.recruiterName,
      degree: this.addCandidate.value.degree,
      university: this.addCandidate.value.university,
      groups: this.addCandidate.value.groups,
      locationConstraint: this.addCandidate.value.locationConstraint,
      referralType: this.formData.referralType,
      notes: this.addCandidate.value.notes,
      candidateStatus: this.selectedcurrentstatus,
      legalStatus: this.formData.legalStatus,
      marketerName: this.formData.marketerName,
      recruiteremail: this.userName,
      orgID:this.OrgID,
      creeateby:this.userName
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

  private handleSuccess(response: any): void {
    this.messageService.add({ severity: 'success', summary: response.message });
    this.loading = false;

    console.log(response);
  }
  
  private handleError(response: any): void {
    this.messageService.add({ severity: 'error', summary:  response.message });
    this.loading = false;

  }


  onSubmit() {
    console.log('Form Data:', this.formData);
  }
  
  sortBy: string = 'DateCreated';
  sortOrder: string = 'asc';

  // Function to handle sorting
  sortTable(column: string) {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }

    this.filteredCandidates = this.sortCandidates();
  }

  // Function to sort the candidates based on the current sort settings
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

  searchInput: string = '';

  isCandidateVisible(candidate: any): boolean {
    const searchValue = this.searchInput.toLowerCase();
    return (
      candidate.Email.toLowerCase().includes(searchValue) ||
      candidate.Name.toLowerCase().includes(searchValue) ||
      candidate.Phone.toLowerCase().includes(searchValue)
    );
  }


}


