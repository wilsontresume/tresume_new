import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SubmittedCandidatesService } from './submitted-candidates.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-submitted-candiates',
  templateUrl: './submitted-candiates.component.html',
  styleUrls: ['./submitted-candiates.component.scss'],
  
  providers: [SubmittedCandidatesService, CookieService, MessageService],
})
export class SubmittedCandiatesComponent implements OnInit {

  loading:boolean = false;
  submittedCandidates: any[] =[];
   noResultsFound:boolean = true;
   traineeID:string = '';
   JobID: string='';

  constructor(private cookieService: CookieService, private service: SubmittedCandidatesService, private messageService: MessageService) { 
    
    this.traineeID = this.cookieService.get('traineeID');

  }
  ngOnInit(): void {
    this.fetchSubmittedCandidateList();

  }

fetchSubmittedCandidateList(){
  let Req = {
    JobID:this.JobID,
    traineeID: this.traineeID,
  };
  this.service.getSubmittedCandidateList(Req).subscribe((x: any) => {
    this.submittedCandidates = x.result;
    this.noResultsFound = this.submittedCandidates.length === 0;
  this.loading = false;
  });
}
}
