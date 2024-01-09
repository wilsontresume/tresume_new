import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { JobBoardAccountService } from './job-board-account.service';
import { JobBoardAccountService } from './job-board-account.service'
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { AppService } from '../app.service';
import { ReviewService } from '../review-tresume/review.service';
interface Account {
  accountName: string;
  status: string;
  selectedJobBoard:any;
}

@Component({
  selector: 'app-job-board-account',
  templateUrl: './job-board-account.component.html',
  styleUrls: ['./job-board-account.component.scss'],
  providers: [CookieService, ReviewService, MessageService,AppService,JobBoardAccountService],
})
export class JobBoardAccountComponent implements OnInit {
  loading:boolean = false;

  TraineeID: string;

  constructor(private formBuilder: FormBuilder, private cookieService: CookieService,private service:JobBoardAccountService) {
    this.TraineeID = this.cookieService.get('TraineeID');
  }

  options: string[] = ['Dice', 'Monster', 'CareerBuilder'];

  showPassword: boolean = false;
  passwordInputType: string = 'password';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordInputType = this.showPassword ? 'text' : 'password';
  }

  jobBoard:any;
  accountName: string = '';
  selectedJobBoard: string = '';
  accounts: Account[] = [];

  // addAccount() {
  //   const newAccount: Account = {
  //     accountName: this.accountName,
  //     selectedJobBoard:this.options,
  //     status: 'active'
  //   };
  //   this.accounts.push(newAccount);
  // }

  deleteAccount(index: number) {
    this.accounts.splice(index, 1);
  }

  ngOnInit(): void {
    // this.TraineeID = this.cookieService.get('TraineeID');
    this.jobBoard = this.formBuilder.group({
      accountName: ['', [Validators.required, Validators.minLength(3)]],
      fromDate: [''],
      toDate: [''],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  addAccount() {

    let Req = {
      accountName: this.jobBoard.value.accountName,
      fromDate: this.jobBoard.value.fromDate,
      toDate: this.jobBoard.value.toDate,
      zipRecruiter: this.jobBoard.value.zipRecruiter,
      username: this.jobBoard.value.username,
      password: this.jobBoard.value.password,
    };

    console.log(Req);

    this.service.insertJobBoardAccountList(Req).subscribe((x: any) => {
      console.log(x);
    });
  }

}
