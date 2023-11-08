import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CreateProjectService } from './create-project.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  providers: [CookieService, CreateProjectService, MessageService],
})
export class CreateProjectComponent implements OnInit {
  adminlist:any;
  projectname:any
  clientname:any
  netterms:any;
  userlist:any;
  project:any;
  allusers:any;
  orgID:string;
  TraineeID: string = '';
  clients: any[];
  constructor( private cookieService: CookieService, private service: CreateProjectService, private messageService: MessageService) { }

  ngOnInit(): void {
    
    this.TraineeID = this.cookieService.get('TraineeID');
    this.orgID = this.cookieService.get('OrgID');
    this.fetchclientlist();
    this.fetchgetProjectList();
  }

  fetchclientlist() {
    let Req = {
      TraineeID: this.TraineeID,
    };
    this.service.getTraineeClientList(Req).subscribe((x: any) => {
      this.clients = x.result;
      console.log(this.clients);
    });
  }

  fetchgetProjectList() {
    let Req = {
      orgid: this.orgID,
    };
    this.service.getProjectList(Req).subscribe((x: any) => {
      this.project = x.result;
      console.log(this.projectname);
    });
  }

  createproject(){
    console.log(this.clientname)
    let Req = {
      orgID: this.orgID,
      clientid:this.clientname,
      projectname:this.projectname,
      netterms:this.netterms,
      TraineeID:this.TraineeID
    };
    this.service.createtimesheetproject(Req).subscribe((x: any) => {
      this.clients = x.result;
      console.log(this.clients);
    });
    this.fetchgetProjectList();
  }
}
