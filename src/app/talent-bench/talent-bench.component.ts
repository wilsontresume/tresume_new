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
  candidates: string[] = ['Candidate 1', 'Candidate 2', 'Candidate 3'];
  formData: any = {};
  tableData: any[];
  OrgID:string = '';
  JobID:string = '';
  TraineeID:string = '';
  addCandidate: any;
  noResultsFound:boolean = true;

  constructor(private dialog: MatDialog,private cookieService: CookieService, private service:TalentBenchService,private messageService: MessageService,private formBuilder: FormBuilder) {}
  
  recruiterNames: string[] = ['Recruiter 1', 'Recruiter 2', 'Recruiter 3'];
  candidateStatuses: string[] = ['Active', 'Inactive', 'On Hold'];
  marketerNames: string[] = ['Marketer 1', 'Marketer 2', 'Marketer 3'];
  referralTypes: string[] = ['Type 1', 'Type 2', 'Type 3'];
  item = {
    groupName: 'group1'
  };

  groupOptions: any[] = [
    { value: 'group1', label: 'Group 1' },
    { value: 'group2', label: 'Group 2' },
    { value: 'group3', label: 'Group 3' }
  ];


  onSubmit() {
    console.log('Form Data:', this.formData);
  }
  
  dataArray: any[] = [
    { groupName: 'Group A', candidateCount: 10 },
    { groupName: 'Group B', candidateCount: 5 },
  ];

  onIconClick() {
    alert('are you sure want to delete?'); 
  }

  ngOnInit(): void {
    this.OrgID = this.cookieService.get('OrgID');
    this.JobID = this.cookieService.get('userName1');
    this.TraineeID = this.cookieService.get('TraineeID');
    this.fetchtalentbenchlist();

    this.addCandidate = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(3)]],
      marketerName: ['', Validators.required],
    });
    
  }  
    fetchtalentbenchlist(){
    let Req = {
      OrgID: this.OrgID,
    };
  this.service.getTalentBenchList(Req).subscribe((x: any) => {
    this.tableData = x.result;
    this.noResultsFound = this.tableData.length === 0;
  });
  
}
  
}
