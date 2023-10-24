import { Component, OnInit,OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from './accounts-add-user.service';

@Component({
  selector: 'app-accounts-add-user',
  templateUrl: './accounts-add-user.component.html',
  providers: [CookieService,AccountService],
  styleUrls: ['./accounts-add-user.component.scss']
})
export class AccountsAddUserComponent implements OnChanges {

  userForm: FormGroup;
  CreatedDate: Date = new Date();
  RemainingDate: Number = 52;
  Recruiters: Number = 14;
  RoleName:string='';
  viewaccess:any;
  fullaccess:any;
  OrgID:string = '';
  userName:string = '';
  TraineeID:string = '';


  tableData1 = [
    { id:1,contents1: 'Job Boards', viewonly: true, fullaccess: true },
    { id:2,contents1: 'Hrms', viewonly: true, fullaccess: true },
    { id:3,contents1: 'Job posting', viewonly: true, fullaccess: true },
    { id:4,contents1: 'Harvest', viewonly: true, fullaccess: true },    
    { id:5,contents1: 'Timesheet', viewonly: true, fullaccess: true },
    { id:6,contents1: 'Talent Bench', viewonly: true, fullaccess: true },
    { id:7,contents1: 'Clients', viewonly: true, fullaccess: true },
    { id:8,contents1: 'Vendor', viewonly: true, fullaccess: true },
    { id:9,contents1: 'Batch', viewonly: true, fullaccess: true },
    { id:10,contents1: 'Workforce', viewonly: true, fullaccess: true },
    { id:11, contents1: 'Reports', viewonly: true, fullaccess: true  },  
  ];
  
  User_Accounts: any[];

  Teamlead: any[] = [{ name: 'Parvathy' }, { name: 'abc' }, { name: 'DEF' }, { name: 'def' }];
  selectedTeamlead: any[] = [];
  filteredTeamlead: any[] = [];
 
  showConfirmationDialog: boolean = false;
  deleteIndex: number = -1;
  showAddUser: boolean = false;
  isEditMode = false;
  userToEdit: any;

  constructor(private fb: FormBuilder,private cookieService: CookieService, private service:AccountService) {
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

 
  performSearch(searchTerm: string) {
    this.User_Accounts = this.User_Accounts.filter(userAccount =>
    (userAccount.First_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userAccount.Last_Name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  }
  onTeamleadSearch(event: any) {
    this.filteredTeamlead = this.Teamlead.filter(option =>
      option.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  enterEditMode(user: any) {
    this.isEditMode = true;
    this.userToEdit = user;

  }


  exitEditMode() {
    this.isEditMode = false;
    this.userToEdit = null;

  }

  saveEditChanges() {

    this.exitEditMode();
  }


  addUser() {
    this.showAddUser = true;
  }

  confirmAddUser() {

  }

  cancelAddUser() {

    console.log(this.showAddUser);

    this.showAddUser = false;
  }

  showAddRole: boolean = false;

  addRole() {
    this.showAddRole = true;
  }

  confirmAddRole() {

    this.viewaccess = this.tableData1
      .filter((item) => item.viewonly)
      .map((item) => item.id);

    this.fullaccess = this.tableData1
      .filter((item) => item.fullaccess)
      .map((item) => item.id);
  
   
    console.log(this.viewaccess);
    console.log(this.fullaccess);

  }

  cancelAddRole() {

    console.log(this.showAddRole);

    this.showAddRole = false;


  }

  deleteAccount(id: number) {
    
console.log(id);

  }

  confirmDelete() {
    if (this.deleteIndex >= 0 && this.deleteIndex < this.User_Accounts.length) {
      this.User_Accounts.splice(this.deleteIndex, 1);
      this.showConfirmationDialog = false;
    }
  }

  cancelDelete() {
    console.log(this.showConfirmationDialog);
    this.deleteIndex = -1;
    this.showConfirmationDialog = false;
  }

  }

 
