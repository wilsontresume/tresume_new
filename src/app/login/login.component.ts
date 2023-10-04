import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
// import { LoginService } from './login.component.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;
  errorMessage:string;
  form = new FormGroup({});

  constructor(private router: Router,private http: HttpClient,private cookieService: CookieService
    // private service: LoginService
    ) {}

  login() {
    const isAuthenticated = true;

    const ssoLoginUrl = environment.apiUrl+'ssologin';
    const body = JSON.stringify({ username: this.username, password: this.password });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.post(ssoLoginUrl, body, { headers }).subscribe(
      (response:any) => {
        
        console.log('Login successful:', response);
        const accesstoken = response.accessToken;
        const userName = response.data.UserName
        const orgID = response.data.Organization
        const traineeID = response.data.TraineeID
        this.cookieService.set('userName1', userName);
        this.cookieService.set('OrgID', orgID);
        this.cookieService.set('TraineeID',traineeID);
        this.cookieService.set('accesstoken',accesstoken);
        var url = '/dashboard/'+traineeID;
        this.router.navigate([url]);
      },
      (error) => {
        // Handle the error response
        console.error('Login error:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
        alert(this.errorMessage);
      }
    );

  }
}
