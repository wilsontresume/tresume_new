import { Component, OnInit } from '@angular/core';
import { ForgetPasswordService } from './forget-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  providers: [ForgetPasswordService]

})
export class ForgetPasswordComponent implements OnInit {
  http: any;
  apiUrl: string = 'your_backend_api_url';
  email:string;
  candidates: any;
  noResultsFound: boolean;

  constructor(private service:ForgetPasswordService) { }

  ngOnInit(): void {

    document.addEventListener('DOMContentLoaded', () => {
      const emailInput = document.getElementById('emailInput') as HTMLInputElement;
      const submitButton = document.getElementById('submitButton') as HTMLButtonElement;

      emailInput.addEventListener('input', () => {
        const isValidEmail = this.validateEmail(emailInput.value);
        submitButton.disabled = !isValidEmail;
      });
    });
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  }

  

  checkEmailValidator() {
    let Req = {
      email: this.email,
    };
    this.service.validateemail(Req).subscribe((x: any) => {
      if(x.flag == 1){
        alert('Password Reset has been sent to your email address.');
      }else{
        alert('Check your Email ID and Try again');
      }
    });
  }
}
