import { Component, OnInit,OnChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AppService } from './app.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  public url: string;
  public traineeID: any;
  public traineeDetails: any = {};
  public enableNav: boolean = true;
  public onboardView: boolean = false;
  public onboardSession: any;
  public sessionDetails: any;
  public name: any;
  public userName: string
  public orgID: string;
  public accesstoken: string;
  public timesheetrole:string;
  public viewaccess:any;
  public fullaccess:any;
  public useraccess:any;
  constructor(private route: ActivatedRoute, private service1: AppService, private router: Router, private cookieService: CookieService) {
    //this.traineeID = this.route.snapshot.params["traineeId"];

  }

  async ngOnInit() {
    //this.enableNav = (sessionStorage.getItem("Route") != "Documents");
    this.url = environment.routeUrl;
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
    if(this.userName){
      console.log('this.userName', this.userName)
    }
    this.orgID = this.cookieService.get('OrgID');
    this.traineeID = this.cookieService.get('TraineeID');
    this.accesstoken = this.cookieService.get('accesstoken');
    this.timesheetrole = this.cookieService.get('TimesheetRole');

    await this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        let navEnd = <NavigationEnd>e;
        console.log(navEnd);
        this.enableNav=true;
        if (navEnd.url.includes("/onboard/employee/")) {
          this.onboardSession = navEnd.url.split('/')[3];
          this.onboardView = true;
          this.getOnboardDetails();
        }
        if (navEnd.url.includes("/login") || navEnd.url.includes("/candidateView") || navEnd.urlAfterRedirects.includes("/login") ) {
          this.enableNav = false;
          console.log(this.enableNav);
        }
        console.log(this.enableNav);
      }
    });
    this.fetchOrganizationAccess();
  }

  async ngOnChanges(){
    await this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        let navEnd = <NavigationEnd>e;
        console.log(navEnd);
        this.enableNav=true;
        if (navEnd.url.includes("/onboard/employee/")) {
          this.onboardSession = navEnd.url.split('/')[3];
          this.onboardView = true;
          this.getOnboardDetails();
        }
        if (navEnd.url.includes("/login") || navEnd.url.includes("/candidateView") || navEnd.urlAfterRedirects.includes("/login") ) {
          this.enableNav = false;
          console.log(this.enableNav);
        }
        console.log(this.enableNav);
      }
    });
  }

  getOnboardDetails() {
    this.service1.getOnboardingSession(this.onboardSession).subscribe((x: any) => {
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
  }

  async fetchOrganizationAccess(){
    let Req = {
      UserName: this.userName,
    };
    await this.service1.getUserModuleAccess(Req).subscribe((x: any) => {
      this.useraccess = x.result;
      this.useraccess.forEach((item: { ViewOnly: string; FullAccess: string; }) => {
        item.ViewOnly = JSON.parse('[' + item.ViewOnly + ']');
        item.FullAccess = JSON.parse('[' + item.FullAccess + ']');
      });
      console.log(this.useraccess);
      this.viewaccess = this.useraccess[0].ViewOnly
      this.fullaccess = this.useraccess[0].FullAccess
      console.log(this.fullaccess);
    });
  }
   searchFullAccess(valueToSearch: any): boolean {
    return  this.fullaccess.includes(valueToSearch);
  }
}
