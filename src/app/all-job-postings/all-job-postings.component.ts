import { AllJobPostingsService } from './all-job-postings.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-job-postings',
  templateUrl: './all-job-postings.component.html',
  styleUrls: ['./all-job-postings.component.scss'],
  providers: [AllJobPostingsService, CookieService,MessageService],
})

export class AllJobPostingsComponent implements OnInit{
  OrgID:string = '';
  JobID:string = '';
  TraineeID:string = '';
  jobs:any[];
  noResultsFound:boolean = false;

roles: string[] = ["Recruiter", "Admin", "User"];
ngOnInit(): void {
  this.OrgID = this.cookieService.get('OrgID');
  this.JobID = this.cookieService.get('userName1');
  this.TraineeID = this.cookieService.get('TraineeID');
  this.fetchjobpostinglist();


  this.jobs = [
    {
      jobTitle: 'Software Developer',
      company: 'ABC Inc.',
      location: 'City A',
      payRate: '$80,000',
      newApplicants: 5,
      totalApplicants: 20,
      postedOn: new Date(),
      postedBy: 'John Doe',
      jobType: 'Full-time',
      selectedRole: 'Role A'
    },
    {
      jobTitle: 'UX Designer',
      company: 'XYZ Ltd.',
      location: 'City B',
      payRate: '$70,000',
      newApplicants: 3,
      totalApplicants: 15,
      postedOn: new Date(),
      postedBy: 'Jane Doe',
      jobType: 'Part-time',
      selectedRole: 'Role B'
    },
    // Add more job entries as needed
  ];
}
  constructor(private dialog: MatDialog,private cookieService: CookieService, private service:AllJobPostingsService,private messageService: MessageService) {}


ngOnChanges(): void{
  // this.fetchuserlist();
}


fetchjobpostinglist(){
  let Req = {
    OrgID: this.OrgID,
  };
  this.service.getJobPostingList(Req).subscribe((x: any) => {
    this.jobs = x.result;
    this.noResultsFound = this.jobs.length === 0;
  });
}

jobOptions = ['My Jobs', 'Assigned Jobs', 'All Jobs'];


}
