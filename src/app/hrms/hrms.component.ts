import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  candidates: any[];
  noResultsFound: boolean = false;
  TraineeID: string;
  constructor(private fb: FormBuilder, private cookieService: CookieService, private service: HrmsService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.TraineeID = this.cookieService.get('TraineeID');
    this.fetchhrmscandidatelist();
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


