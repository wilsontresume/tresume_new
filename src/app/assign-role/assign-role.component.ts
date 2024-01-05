import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AssignRoleService } from './assign-role.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.scss'],
  providers: [CookieService,AssignRoleService,MessageService],
})
export class AssignRoleComponent implements OnInit {
  adminlist:any;
  userlist: String[];
  allusers:any;
  project:any;
  timesheetrole: any;
  tableData: any [];
  showConfirmationDialog: boolean = false;
  router: any;
  OrgID:string = '';
  TraineeID:string = '';
  noResultsFound: boolean = false;
  public userName: string = '';
  timesheetadmin:any;
  timesheetproject:any;
  candidateid:any;
  constructor(private cookieService: CookieService, private service: AssignRoleService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.userName = this.cookieService.get('userName1');
    this.OrgID = this.cookieService.get('OrgID');
    this.TraineeID = this.cookieService.get('TraineeID');
    // this.adminlist = [{id:1,name:'wilson'},{id:2,name:'bala'}];
    // this.userlist = [{id:1,name:'Nagaraj'},{id:2,name:'Maria'}];
    this.project = [{id:1,name:'Tresume'}];
    // this.allusers = [{id:1,name:'Nagaraj',admin:'wilson',project:'tresume'},{id:2,name:'Maria',admin:'bala',project:'tresume'}];

    this.fetchtimesheetuser();
    this.fetchtimesheetcandidates();
    this.fetchtimesheetadmin();
    this.fetchtimesheetproject();
  }

  fetchtimesheetadmin(){
    let Req = {
      OrgID: this.OrgID,
    };
    this.service.fetchtimesheetadmins(Req).subscribe((x: any) => {
      this.adminlist = x.result;
    });
  }
  fetchtimesheetuser(){
    let Req = {
      OrgID: this.OrgID,
    };
   
    this.service.fetchtimesheetcandidate(Req).subscribe((x: any) => {
      this.userlist = x.result;
      console.log(this.userlist);
      
    });
  }
  fetchtimesheetproject(){
    let Req = {
      OrgID: this.OrgID,
    };
   
    this.service.fetchtimesheetprojects(Req).subscribe((x: any) => {
      this.project = x.result;
      console.log(this.userlist);
      
    });
  }
  fetchtimesheetcandidates(){
    let Req = {
      OrgID: this.OrgID,
    };
   
    this.service.fetchtimesheetallcandidate(Req).subscribe((x: any) => {
      this.allusers = x.result;
      console.log(this.userlist);
    });
  }


  assignproject(){

    let Req = {
      timesheetadmin: this.timesheetadmin,
      timesheetproject: this.timesheetproject,
      candidateid: this.candidateid,
    };
   console.log(Req);
    this.service.assignproject(Req).subscribe((x: any) => {
      this.allusers = x.flag;
      this.fetchtimesheetcandidates();
    });
  }
  
}

