import { Component} from '@angular/core';

interface Account {
  accountName: string;
  status: string;
  selectedJobBoard:any;
}

@Component({
  selector: 'app-job-board-account',
  templateUrl: './job-board-account.component.html',
  styleUrls: ['./job-board-account.component.scss']
})
export class JobBoardAccountComponent{
 
  options: string[] = ['Dice', 'Monster', 'CareerBuilder'];

  showPassword: boolean = false;
  passwordInputType: string = 'password';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordInputType = this.showPassword ? 'text' : 'password';
  }


  
  accountName: string = '';
  selectedJobBoard: string = '';
  accounts: Account[] = [];

  addAccount() {
    const newAccount: Account = {
      accountName: this.accountName,
      selectedJobBoard:this.options,
      status: 'active'  
    };
    this.accounts.push(newAccount);
  }

  deleteAccount(index: number) {
    this.accounts.splice(index, 1);
  }

}
