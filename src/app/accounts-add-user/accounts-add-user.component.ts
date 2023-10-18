import { Component } from '@angular/core';


@Component({
  selector: 'app-accounts-add-user',
  templateUrl: './accounts-add-user.component.html',
  styleUrls: ['./accounts-add-user.component.scss']
})
export class AccountsAddUserComponent {

  CreatedDate: Date = new Date();
  RemainingDate: Number = 52;
  Recruiters: Number = 14;

  User_Accounts: any[] = [
    {
      First_Name: 'Wilson',
      Last_Name: 'AM',
      User_Email: 'wilson@gmail.com',
      Dice_Allocated: '100',
      Dice_Used: '55',
      CB_Allocated: '100',
      CB_Used: '0',
      Role: 'Admin',
      Lead: '--',
    },
    {
      First_Name: 'Romanuse',
      Last_Name: 'Ravi',
      User_Email: 'romanuseravi@gmail.com',
      Dice_Allocated: '90',
      Dice_Used: '50',
      CB_Allocated: '90',
      CB_Used: '20',
      Role: 'Admin',
      Lead: '--',
    },
  ];

  displayedUsers: number = this.User_Accounts.length;
  totalUsers: number = this.User_Accounts.length;

  performSearch(searchTerm: string) {
    this.User_Accounts = this.User_Accounts.filter(userAccount =>
    (userAccount.First_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userAccount.Last_Name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    this.displayedUsers = this.User_Accounts.length;
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


  showConfirmationDialog: boolean = false;
  deleteIndex: number = -1;

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