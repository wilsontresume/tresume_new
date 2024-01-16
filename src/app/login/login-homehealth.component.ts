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
  loading:boolean = false;

  username: string;
  password: string;
  errorMessage: string;
  form = new FormGroup({});
  isHomeHealth: boolean = false;
  invalidCount: number = 0;

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

    const ssoLoginUrl = environment.apiUrl + 'login';
    const body = JSON.stringify({ username: this.username, password: this.password });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.post(ssoLoginUrl, body, { headers }).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        const flag = response.flag;
        if (flag === 1) {
          const userName = response.data[0].UserName
          const orgID = response.data[0].OrganizationID
          const traineeID = response.data[0].TraineeID
          const ViewOnly = response.result[0].ViewOnly
          const FullAccess = response.result[0].FullAccess
          const DashboardPermission = response.result[0].DashboardPermission
          const RoleID = response.result[0].RoleID
          const timesheet_role = response.data[0].timesheet_role
          const timesheet_admin = response.data[0].timesheet_admin
          this.cookieService.set('userName1', userName);
          this.cookieService.set('OrgID', orgID);
          this.cookieService.set('TraineeID', traineeID);
          this.cookieService.set('ViewOnly', ViewOnly);
          this.cookieService.set('timesheet_role', timesheet_role);
          this.cookieService.set('timesheet_admin', timesheet_admin);
          this.cookieService.set('FullAccess', FullAccess);
          this.cookieService.set('DashboardPermission', DashboardPermission);
          this.cookieService.set('RoleID', RoleID);

          if (orgID == '98') {
            this.router.navigate(['/onboardingList']);
          }
          else {
            //var url = 'https://tresume.us/TresumeNG/dashboard/' + traineeID;
            var url = '/dashboard/' + traineeID;
            this.router.navigate([url]);
          }


         /*  var url = '/dashboard/' + traineeID;
          this.router.navigate(['/dashboard/' + traineeID]); */
          //this.router.navigateByUrl(url);
        } else {
          alert('Please reset your password.');
          var url = '/forgetPassword';
          this.router.navigateByUrl(url);
        }


      },
      (error) => {
        console.error('Login error:', error);

        this.invalidCount++;

        if (this.invalidCount >= 3) {
          alert('Please reset your password.');
          var url = '/forgetPassword';
          this.router.navigateByUrl(url);
        } else {
          this.errorMessage = 'Login failed. Please check your credentials.';
          alert(this.errorMessage);
        }
      }
    );

  }


}
