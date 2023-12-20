import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResetPasswordService } from './reset-password.service';
import { ActivatedRoute,Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  isPasswordMatch: boolean = false;
  passwordPattern: RegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
  resetkey: any;
  result:boolean = false;


  constructor(private fb: FormBuilder, private resetPasswordService: ResetPasswordService,private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.resetkey = this.route.snapshot.params["resetkey"];
    this.validatekey();
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      confirmPassword: ['', Validators.required],
    });
  }
  password: string = '';
  confirmPassword: string = '';
  isButtonEnabled: boolean = false;


  validatekey(){
    const Req = {
      validatekey: this.resetkey
    };

    this.resetPasswordService.validatekey(Req).subscribe((x: any) => {
      var result = x.flag;
      if(result === 1){
        this.result = true;
      }else{
        this.result = false;
        alert("Invalid Reset Key");
        var url = '/';
        this.router.navigateByUrl(url);
      }
    });
  }

  validatePassword() {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (this.password === this.confirmPassword && passwordRegex.test(this.password)) {
      this.isButtonEnabled = true;
    } else {
      this.isButtonEnabled = false;
    }
  }
  resetPassword(){
    const Req = {
      password:this.password,
      resetkey:this.resetkey
    };

    this.resetPasswordService.updatepassword(Req).subscribe((x: any) => {
      var result = x.flag;
      if(result === 1){
      alert("Reset Password Successful");
      var url = '/';
      this.router.navigateByUrl(url);
      }
    });
  }
}
