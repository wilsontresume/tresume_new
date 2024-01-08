import { Component, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from './accounts-add-user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-accounts-add-user',
  templateUrl: './accounts-add-user.component.html',
  providers: [CookieService,AccountService,MessageService],
  styleUrls: ['./accounts-add-user.component.scss']
})
export class AccountsAddUserComponent implements OnChanges {

  loading:boolean = false;

  userForm: FormGroup;
  CreatedDate: Date = new Date();
  RemainingDate: Number = 52;
  Recruiters: Number = 14;
  // RoleName:string='';
  // viewaccess:any;
  // fullaccess:any;
  userName:string = '';
  OrgID:string = '';
  TraineeID:string = '';
  // tableData1:any;
  User_Accounts: any[];
  Teamlead: any[] = [{ name: 'Parvathy' }, { name: 'abc' }, { name: 'DEF' }, { name: 'def' }];
  selectedTeamlead: any[] = [];
  filteredTeamlead: any[] = [];
  showConfirmationDialog: boolean = false;
  deleteIndex: string = '';
  showAddUser: boolean = false;
  isEditMode = false;
  userToEdit: any;
  rolelist:any;
  selectedrolelist:any;
  firstname:string;
  lastname:string;
  emailID:string;


  constructor(private fb: FormBuilder,private cookieService: CookieService, private service:AccountService,private messageService: MessageService) {
    this.userForm = this.fb.group({
      First_Name: ['', Validators.required],
      Last_Name: ['', Validators.required],
      User_Email: ['', [Validators.required, Validators.email]],
      Dice_Allocated: ['0', Validators.min(0)],
      Dice_Used: ['0', Validators.min(0)],
      CB_Allocated: ['0', Validators.min(0)],
      CB_Used: ['0', Validators.min(0)],
      Role: ['Admin', Validators.required],
      Lead: [[]],
      corporateDocs: [false],
      tracker: [false],
    });
  }

  ngOnInit(): void {
    this.OrgID = this.cookieService.get('OrgID');
    this.userName = this.cookieService.get('userName1');
    this.TraineeID = this.cookieService.get('TraineeID');
    this.fetchuserlist();
   
  }

  ngOnChanges(): void{
    // this.fetchuserlist();
  }

  fetchuserlist(){
    let Req = {
      OrgID: this.OrgID,
    };
    this.service.getOrgUserList(Req).subscribe((x: any) => {
      this.User_Accounts = x.result;
    });
  }


  addUser() {
    this.showAddUser = true;
  }

  confirmAddUser() {
    const ids = this.selectedTeamlead.map(item => item.id);
    const teamlead = ids.join(',');
    const roleid = this.selectedrolelist.RoleID
    let Req = {
      OrgId: this.OrgID,
      RoleID:roleid,
      TeamLead:teamlead,
      FirstName:this.firstname,
      LastName:this.lastname,
      UserEmail:this.emailID,
      CreateBy:this.userName
    };
    this.service.addMember(Req).subscribe((x: any) => {
      console.log(x);
      this.showAddUser = false;
      this.fetchuserlist();

    });
  }

  cancelAddUser() {

    console.log(this.showAddUser);

    this.showAddUser = false;
  }


  deleteAccount(email: string) {
    this.deleteIndex = email;
    this.showConfirmationDialog = true;
  
  }

  confirmDelete() {
    console.log(this.deleteIndex);
    let Req = {
      email: this.deleteIndex,
    };
    this.service.deleteUserAccount(Req).subscribe((x: any) => {
      var flag = x.flag;
      this.fetchuserlist();
      if(flag === 1){
        this.messageService.add({
          severity: 'success',
          summary: 'User Account Deleted Sucessfully',
        });
      }else{
        this.messageService.add({
          severity: 'error',
          summary: 'Please try again later',
        });
      }
      
    });
    this.deleteIndex = "";
    this.showConfirmationDialog = false;
  }

  cancelDelete() {
    console.log(this.showConfirmationDialog);
    this.deleteIndex = "";
    this.showConfirmationDialog = false;
  }

  }

 
