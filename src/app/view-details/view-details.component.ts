import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ViewDetailsService } from './view-details.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss'],
  providers: [CookieService,ViewDetailsService,MessageService],
})
export class ViewDetailsComponent {
  loading:boolean = false;

  isAdmin: boolean = true;
  OrgID:string = '';
  TraineeID:string = '';
  timesheetrole: any;
  rowdata: any [] = [];
  noResultsFound: boolean = false;


  projects: any[] = [
    {
      projectName: 'Project 1',
      sunday: 'Sun Data 1',
      status: 'Approved'
    },
    {
      projectName: 'Project 2',
      sunday: 'Sun Data 2',
      status: 'Rejected'
    }
  ];

  constructor(private router: Router,private cookieService: CookieService,private service: ViewDetailsService,private messageService: MessageService,) { }

  ngOnInit(): void {
    this.OrgID = this.cookieService.get('OrgID');
    this.TraineeID = this.cookieService.get('TraineeID');
  }

  fetchPendingResult(){
    let Req = {
      traineeID: this.TraineeID,
      timesheetrole:this.timesheetrole,
    };
    this.service.getPendingTimesheetResult(Req).subscribe((x: any) => {
      this.rowdata = x.result;
      // this.noResultsFound = this.rowdata.length === 0;
    });
  }
  reject(){
    let Req = {
    };
    this.service.UpdateRejectStatus(Req).subscribe((x: any) => {
      this.rowdata = x.result;
    });
  }

  Accept(){
    let Req = {
    };
    this.service.UpdateAcceptStatus(Req).subscribe((x: any) => {
      this.rowdata = x.result;
    });
  }

  downloadDocument(cartNumber: number): void {
    console.log(`Downloading document for Cart ${cartNumber}`);
  }

  
}







