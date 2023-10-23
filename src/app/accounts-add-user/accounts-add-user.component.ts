import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-accounts-add-user',
  templateUrl: './accounts-add-user.component.html',
  styleUrls: ['./accounts-add-user.component.scss']
})
export class AccountsAddUserComponent {
  
  User_Accounts: any[] = [
    {
      First_Name: 'Wilson',
      Last_Name: 'AM',
      User_Email: 'wilson@gmail.com',
      Role: 'Admin',
      Lead: '--',
    },
    {
      First_Name: 'Romanuse',
      Last_Name: 'Ravi',
      User_Email: 'romanuseravi@gmail.com',
      Role: 'Admin',
      Lead: '--',
    },
  ];
  displayedUsers: number = this.User_Accounts.length;
  totalUsers: number = this.User_Accounts.length;
  Teamlead: any[] = [{ name: 'Parvathy' }, { name: 'abc' }, { name: 'DEF' }, { name: 'def' }];
  selectedTeamlead: any[] = [];
  filteredTeamlead: any[] = [];
  userForm: FormGroup;
  CreatedDate: Date = new Date();
  RemainingDate: Number = 52;
  Recruiters: Number = 14;
  showConfirmationDialog: boolean = false;
  deleteIndex: number = -1;
  showAddUser: boolean = false;
  isEditMode = false;
  userToEdit: any;

  constructor(private fb: FormBuilder) {
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

 

  tableData1 = [
    { contents1: 'Job Boards', viewonly: true, fullaccess: true },
    { contents1: 'Hrms', viewonly: true, fullaccess: true },
    { contents1: 'Jobs', viewonly: true, fullaccess: true },
    { contents1: 'Reports', viewonly: true, fullaccess: true },
    { contents1: 'Harvest', viewonly: true, fullaccess: true },
    { contents1: 'Timesheet', viewonly: true, fullaccess: true },
    { contents1: 'Clients', viewonly: true, fullaccess: true },
    { contents1: 'Talent Bench', viewonly: true, fullaccess: true },
    { contents1: 'Batch', viewonly: true, fullaccess: true },
    { contents1: 'Workforce', viewonly: true, fullaccess: true },
  ];

  
  performSearch(searchTerm: string) {
    this.User_Accounts = this.User_Accounts.filter(userAccount =>
    (userAccount.First_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userAccount.Last_Name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    this.displayedUsers = this.User_Accounts.length;
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

  }

  cancelAddRole() {

    console.log(this.showAddRole);

    this.showAddRole = false;
  }

  deleteAccount(index: number) {
    this.deleteIndex = index;
    this.showConfirmationDialog = true;
  }

  confirmDelete() {
    if (this.deleteIndex >= 0 && this.deleteIndex < this.User_Accounts.length) {
      this.User_Accounts.splice(this.deleteIndex, 1);
      this.showConfirmationDialog = false;
      this.displayedUsers = this.User_Accounts.length;
    }
  }

  cancelDelete() {
    console.log(this.showConfirmationDialog);
    this.deleteIndex = -1;
    this.showConfirmationDialog = false;
  }

}