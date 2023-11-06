import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AddAdminService } from './add-admin.services';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
  providers: [CookieService,AddAdminService,MessageService]
})
export class AddAdminComponent implements OnInit {  
  selectedOption: string;
  roles: string[] = [];
  
  // candidates: string[] = ['Candidate 1', 'Candidate 2', 'Candidate 3'];

 public userName:string='';
 public orgID:string='';
 public TraineeID:string='';
 public allusers:any;
public alladmins:any;
  constructor(private cookieService: CookieService,private service: AddAdminService, private messageService: MessageService) { 
   
  }

  ngOnInit(): void {
     this.userName = this.cookieService.get('userName1');
     this.orgID = this.cookieService.get('OrgID');
     this.TraineeID = this.cookieService.get('TraineeID');
    this.fetchusers();
    this.fetchadmin();
  }

  fetchusers(){
    let Req = {
      OrgID: this.orgID,
    };
    this.service.fetchtimesheetusers(Req).subscribe((x: any) => {
      this.allusers = x.result;
    });
  }

  addtimesheetadmin(){
    console.log(this.selectedOption);
    let Req = {
      TraineeID: this.selectedOption,
    };
    this.service.addtimesheetadmin(Req).subscribe((x: any) => {
      
      this.fetchadmin()
      this.fetchusers();
    });
   
  }

  fetchadmin(){
    let Req = {
      OrgID: this.orgID,
    };
    this.service.fetchtimesheetadmins(Req).subscribe((x: any) => {
      this.alladmins = x.result;
    });
  }

  deleteRow(traineeID:string){
    let Req = {
      TraineeID: traineeID,
    };
    this.service.deletetimesheetadmin(Req).subscribe((x: any) => {
      
      this.fetchadmin()
      this.fetchusers();
    });
  }
  
}
