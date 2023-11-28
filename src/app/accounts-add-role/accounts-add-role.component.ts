import { Component, OnInit } from '@angular/core';
import { AccountService } from '../accounts-add-user/accounts-add-user.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-accounts-add-role',
  templateUrl: './accounts-add-role.component.html',
  providers: [CookieService,AccountService,MessageService],
  styleUrls: ['./accounts-add-role.component.scss'],
})
export class AccountsAddRoleComponent implements OnInit {

  tableData1:any;
  viewaccess:any;
  fullaccess:any;
  OrgID:string = '';
  TraineeID:string = '';
  RoleName:string='';
  userName:string = '';
  rolelist:any;
  selectedrolelist:any;
  userForm: any;
  
  constructor(private cookieService: CookieService, private service:AccountService) {
   
  }

  ngOnInit(): void {
    this.OrgID = this.cookieService.get('OrgID');
    this.userName = this.cookieService.get('userName1');
    this.TraineeID = this.cookieService.get('TraineeID');
    this.fetchOrganizationAccess();
    this.fetchOrgrole();
  }
 

  fetchOrganizationAccess(){
    let Req = {
      OrgID: this.OrgID,
    };
    this.service.getOrganizationaccess(Req).subscribe((x: any) => {
      this.tableData1 = x.result;
      this.tableData1.map((items: any) => {
        items.viewonly = false;
        items.fullaccess = false;
      })
    });
  }

  fetchOrgrole(){
    let Req = {
      OrgID: this.OrgID,
    };
    this.service.fetchOrgrole(Req).subscribe((x: any) => {
      this.rolelist = x.result;
     
    });
  }

  confirmAddRole() {

    console.log(this.tableData1);

    this.viewaccess = this.tableData1
      .filter((item: { viewonly: any; }) => item.viewonly)
      .map((item: { id: any; }) => item.id);
    this.fullaccess = this.tableData1
      .filter((item: { fullaccess: any; }) => item.fullaccess)
      .map((item: { id: any; }) => item.id);
      this.viewaccess = this.viewaccess.join(',');
      this.fullaccess = this.fullaccess.join(',');
      let Req = {
        OrgID: this.OrgID,
        rolename:this.RoleName,
        viewaccess:this.viewaccess,
        fullaccess:this.fullaccess,
        createby:this.userName
      };
      this.service.addrole(Req).subscribe((x: any) => {
        console.log(x);
       
      });
  }

 
}
