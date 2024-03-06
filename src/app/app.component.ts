import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from './app.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
import { PermissionsProvider } from '../app/security/permissions.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService, PermissionsProvider]
})
export class AppComponent implements OnInit {
  public url: string;
  public traineeID: any;
  public traineeDetails: any = {};
  public enableNav: boolean = false;
  public onboardView: boolean = false;
  public onboardSession: any;
  public sessionDetails: any;
  public name: any;
  public userName: string
  public orgID: string;
  public accesstoken: string;
  public timesheetrole: string;
  FullAccess: number[]
  ViewOnly: number[]
isScrolled: any;
  constructor(private service1: AppService, private router: Router, private cookieService: CookieService) {

  }

  async ngOnInit() {
    /* this.url = environment.routeUrl;
    setTimeout(() => {
      if (window.location.hostname === 'localhost') {
        return;
      } else {
        this.traineeID = this.cookieService.get('TraineeID')
        console.log('this.traineeID', this.traineeID)
        this.traineeDetails.FirstName = sessionStorage.getItem("FirstName");
        this.traineeDetails.LastName = sessionStorage.getItem("LastName");
        sessionStorage.setItem("TraineeID", this.traineeID);
        localStorage.setItem("TraineeID", this.traineeID);

      }
    }, 500);
    this.userName = this.cookieService.get('userName1');
    if (this.userName) {
      console.log('this.userName', this.userName)
    }
    this.orgID = this.cookieService.get('OrgID');
    this.traineeID = this.cookieService.get('TraineeID');
    this.accesstoken = this.cookieService.get('accesstoken');
    this.timesheetrole = this.cookieService.get('TimesheetRole');
    var FullAccess = this.cookieService.get('FullAccess');
    this.FullAccess = FullAccess.split(',').map(Number);
    var VewAccess = this.cookieService.get('ViewOnly');
    this.ViewOnly = VewAccess.split(',').map(Number);
    await this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        let navEnd = <NavigationEnd>e;
        console.log(navEnd);
        this.enableNav = true;
        if (navEnd.url.includes("/onboard/employee/")) {
          this.onboardSession = navEnd.url.split('/')[3];
          this.onboardView = true;
          this.getOnboardDetails();
        }
        if (navEnd.url.includes("/login") || navEnd.url.includes("/candidateView") || navEnd.url.includes("/timesheet")  || navEnd.urlAfterRedirects.includes("/login")|| navEnd.urlAfterRedirects.includes("/features") || navEnd.urlAfterRedirects.includes("/homelanding") || navEnd.urlAfterRedirects.includes("/about") || navEnd.urlAfterRedirects.includes("/ats") || navEnd.urlAfterRedirects.includes("/workforce") || navEnd.urlAfterRedirects.includes("/talent-suite")|| navEnd.urlAfterRedirects.includes("/yahoo") || navEnd.urlAfterRedirects.includes("/adobe")|| navEnd.urlAfterRedirects.includes("/opt-nation") || navEnd.urlAfterRedirects.includes("/joblee")  || navEnd.urlAfterRedirects.includes("/market") || navEnd.urlAfterRedirects.includes("/monster") || navEnd.urlAfterRedirects.includes("/contact") || navEnd.urlAfterRedirects.includes("/dice") || navEnd.urlAfterRedirects.includes("/career") || navEnd.urlAfterRedirects.includes("/joble") || navEnd.url.includes("/resetpassword") || navEnd.urlAfterRedirects.includes("/forgetPassword")) {
          this.enableNav = false;
          console.log(this.enableNav);
        }
        console.log(this.enableNav);
      }
    });

    const Req = {
      username: this.userName
    };

    await this.service1.getuseraccess(Req).subscribe((x: any) => {
      const ViewOnly = x.result[0].ViewOnly
        const FullAccess = x.result[0].FullAccess
        const DashboardPermission = x.result[0].DashboardPermission
        const RoleID = x.result[0].RoleID
        this.cookieService.set('ViewOnly',ViewOnly);
        this.cookieService.set('FullAccess',FullAccess);
        this.cookieService.set('DashboardPermission',DashboardPermission);
        this.cookieService.set('RoleID',RoleID);
    }); */
  }
  /* checkFullAccess(numberToCheck: number): boolean {
    return this.FullAccess.includes(numberToCheck) || this.ViewOnly.includes(numberToCheck);
  } */

  async ngOnChanges() {
    /* await this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        let navEnd = <NavigationEnd>e;
        console.log(navEnd);
        this.enableNav = true;
        if (navEnd.url.includes("/onboard/employee/")) {
          this.onboardSession = navEnd.url.split('/')[3];
          this.onboardView = true;
          this.getOnboardDetails();
        }
        if (navEnd.url.includes("/login") || navEnd.url.includes("/candidateView") || navEnd.urlAfterRedirects.includes("/login")) {
          this.enableNav = false;
          console.log(this.enableNav);
        }
        console.log(this.enableNav);
      }
    }); */
  }

  public hasToken() {
    let url = this.router.url;
    return url !== "/" && url.indexOf("/login") === -1 && url.indexOf("/homelanding") === -1 && url.indexOf("/ats") === -1 && url.indexOf("/contact") === -1 && url.indexOf("/talent-suite") === -1  && url.indexOf("/workforce") === -1 && url.indexOf("/timesheet") === -1  && url.indexOf("/market") === -1  && url.indexOf("/features") === -1  && url.indexOf("/about") === -1 && url.indexOf("/monster") === -1    && url.indexOf("/dice") === -1 && url.indexOf("/career") === -1 && url.indexOf("/opt-nation") === -1 && url.indexOf("/joble") === -1 && url.indexOf("/yahoo") === -1 && url.indexOf("/adobe") === -1 && url.indexOf("/forgetPassword") === -1&& url.indexOf("/resetpassword") === -1 && url.indexOf("refresh") === -1 ;
  }

  /* getOnboardDetails() {
    this.service1.getOnboardingSession(this.onboardSession).subscribe((x: any) => {z
      if (x[0]) {
        this.sessionDetails = x[0];
        this.service1.getTraineeDetails(this.sessionDetails.TraineeID).subscribe((x: any) => {
          let response = x.result;
          if (response) {
            this.traineeDetails = response[0];
            this.name = this.traineeDetails.FirstName + ' ' + this.traineeDetails.LastName
          }
        });
      }
    });
  } */
}
