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
  formData: any = {};
  datecreated: Date[];
  followupon: Date[];
  candidates: any[]=[
    {CreatedBy:'she'}
  ]
  noResultsFound: boolean = false;
  TraineeID: string;
  addCandidate: any;
  constructor(private cookieService: CookieService, private service: HrmsService, private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.TraineeID = this.cookieService.get('TraineeID');
    this.fetchhrmscandidatelist();

    this.addCandidate = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(3)]],
    });
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

  onSubmit() {
    console.log('Form Data:', this.formData);
  }
}


