import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SubmittedCandidatesService } from './submitted-candidates.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-submitted-candiates',
  templateUrl: './submitted-candiates.component.html',
  styleUrls: ['./submitted-candiates.component.scss'],
  
  providers: [SubmittedCandidatesService, CookieService, MessageService],
})
export class SubmittedCandiatesComponent implements OnInit {
  loading: boolean = false;
  submittedCandidates: any[] = [];
  noResultsFound: boolean = true;
  traineeID: string = '';
  JobID: string = '';
  candidates: any[];

  constructor(private cookieService: CookieService, private service: SubmittedCandidatesService, private messageService: MessageService, private route: ActivatedRoute,) { 
     this.traineeID = this.cookieService.get('traineeID');
       this.route.params.subscribe(params => {
      this.JobID = params['jobId']; 
    });
  }
  ngOnInit(){
     this.fetchSubmittedCandidateList();
  }

  fetchSubmittedCandidateList() {
    let Req = {
      JobID: this.JobID,
      traineeID: this.traineeID,
    };
    this.loading = true; 
    this.service.getSubmittedCandidateList(Req).subscribe(
      (response: any) => {
        this.submittedCandidates = response.result;
        this.noResultsFound = this.submittedCandidates.length === 0;
        this.loading = false; 
      },
      (error) => {
        console.error('Error fetching submitted candidates:', error);
        this.loading = false;
       
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to fetch submitted candidates. Please try again.'});
      }
    );
  }
}