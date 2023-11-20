import { Component, OnInit } from '@angular/core';
import { JobApplicationService } from './job-application.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-appication',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.scss'],
  providers: [JobApplicationService, CookieService, MessageService],
})
export class JobApplicationComponent implements OnInit {
jobs: any;
editmode: boolean = false;
selectedDate: string = ''; // You may initialize it with the current date
selectedOption: string = '';
showDateOptions: boolean = false;
OrgID:string = '';
JobID:string = '';
TraineeID:string = '';
noResultsFound:boolean = false;

ngOnInit(): void {
  this.OrgID = this.cookieService.get('OrgID');
  this.JobID = this.cookieService.get('userName1');
  this.TraineeID = this.cookieService.get('TraineeID');
  this.fetchjobApplicationlist();
}


  fetchjobApplicationlist(){
    let Req = {
      OrgID: this.OrgID,
    };
    this.service.getJobApplicationList(Req).subscribe((x: any) => {
      this.jobs = x.result;
      this.noResultsFound = this.jobs.length === 0;
    });
  }
  
  container: any;
  constructor(private dialog: MatDialog, private cookieService: CookieService, private service: JobApplicationService, private messageService: MessageService, private fb: FormBuilder,
    ){ }


  saveAs(format: string): void {
    // Handle the logic for saving as Excel or PDF
    console.log(`Save as ${format}`);
    // You can implement the logic to generate and download Excel or PDF here
  }
  scrollLeft() {
    this.container.nativeElement.scrollLeft -= 50;
  }

  scrollRight() {
    this.container.nativeElement.scrollLeft += 50;
  }
  
  saveDate() {
    console.log('Selected Date:', this.selectedDate);
    console.log('Selected Option:', this.selectedOption);
    // Add your save logic here
  }

  cancelDate() {
    this.showDateOptions = false;
    // Add your cancel logic here
  }
  }


