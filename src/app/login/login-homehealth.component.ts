import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
// import { LoginService } from './login.component.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login-homehealth',
  templateUrl: './login-homehealth.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginHomeHealthComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string;
  form = new FormGroup({});
  isHomeHealth: boolean = false;

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService, private activatedRoute: ActivatedRoute
    // private service: LoginService
  ) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        let navEnd = <NavigationEnd>e;
        if (navEnd.url.includes("/homehealth")) {
          this.isHomeHealth = true;
        }
      }
    });
  }

  ngOnInit() {

  }

  login() {

    const isAuthenticated = true;

    const secretKey = 'Tresume@123';
    const password = this.password;
    const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
    const ssoLoginUrl = environment.apiUrl + 'ssologin';
    const body = JSON.stringify({ username: this.username, password: encryptedPassword });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.post(ssoLoginUrl, body, { headers }).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        const accesstoken = response.accessToken;
        const userName = response.data.UserName
        const orgID = response.data.Organization
        const traineeID = response.data.TraineeID
        this.cookieService.set('userName1', userName);
        this.cookieService.set('OrgID', orgID);
        this.cookieService.set('TraineeID', traineeID);
        this.cookieService.set('accesstoken', accesstoken);
        if (orgID == '98') {
          //var url = 'https://tresume.us/TresumeNG/onboardingList';
          this.router.navigate(['/onboardingList']);
        }
        else {
          //var url = 'https://tresume.us/TresumeNG/dashboard/' + traineeID;
          var url = '/dashboard/' + traineeID;
          this.router.navigate([url]);
        }
        // var url = '/dashboard/'+traineeID;
        // this.router.navigate([url]);
        //window.location.href = url;
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
        alert(this.errorMessage);
      }
    );

  }


}
