import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { HrmsService } from './hrms.service';

@Component({
  selector: 'app-hrms',
  templateUrl: './hrms.component.html',
  providers: [CookieService, HrmsService, MessageService],
  styleUrls: ['./hrms.component.scss']
})

export class HrmsComponent implements OnInit {

  candidates1: string[] = ['Candidate 1', 'Candidate 2', 'Candidate 3'];
  recruiterNames: string[] = ['Recruiter 1', 'Recruiter 2', 'Recruiter 3'];
  candidateStatuses: string[] = ['Active', 'Inactive', 'On Hold'];
  marketerNames: string[] = ['Marketer 1', 'Marketer 2', 'Marketer 3'];
  referralTypes: string[] = ['Type 1', 'Type 2', 'Type 3'];
  legalStatus: string[] = ['legal', 'illegal'];
  formData: any = {};
  datecreated: Date[];
  followupon: Date[];
  candidates: any[]=[{CreatedBy:'maria'}];
  noResultsFound: boolean = false;
  TraineeID: string;
  addCandidate: any;
  
  constructor(private cookieService: CookieService, private service: HrmsService, private messageService: MessageService, private formBuilder: FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.TraineeID = this.cookieService.get('TraineeID');
    this.fetchhrmscandidatelist();

    this.addCandidate = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
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
      gender:['male']
    });
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

  fetchhrmscandidatelist() {
    let Req = {
      TraineeID: this.TraineeID,
    };
    this.service.gethrmscandidateList(Req).subscribe((x: any) => {
      this.candidates = x.result;
      this.noResultsFound = this.candidates.length === 0;
    });
  }

  savehrmsdata() {
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
        candidateStatus: this.formData.candidateStatus,
        legalStatus: this.formData.legalStatus,
        marketerName: this.formData.marketerName,

    };
    console.log(Req);
    this.service.addHrmsCandidate(Req).subscribe((x: any) => {
      console.log(x);
    });
  }


  onSubmit() {
    console.log('Form Data:', this.formData);
  }
}


