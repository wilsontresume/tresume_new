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
  submittedCandidates:any[];
   noResultsFound:boolean = true;
  OrgID:string = '';

  constructor(private cookieService: CookieService, private service: SubmittedCandidatesService, private messageService: MessageService) { 
    
    this.OrgID = this.cookieService.get('OrgID');

  }
  ngOnInit(): void {
    this.fetchSubmittedCandidateList();

  }


  
fetchSubmittedCandidateList(){
  let Req = {
    OrgID: this.OrgID,
  };
  this.service.getSubmittedCandidateList(Req).subscribe((x: any) => {
    this.submittedCandidates = x.result;
    this.noResultsFound = this.submittedCandidates.length === 0;
  this.loading = false;
  });
}

}
