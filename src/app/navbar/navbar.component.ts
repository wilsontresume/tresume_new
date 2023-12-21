import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NavigationService } from './navbar.service';

@Component({
    selector: 'ts-nav',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    providers: [NavigationService]
})
export class NavbarComponent implements OnInit {

    public onboardView: boolean = false;
    public traineeID: any;
    public traineeDetails: any = {};
    public userName: string;
    public isLoaded: boolean = false;
    fullAccess: number[];
    viewOnly: number[];

    constructor(private route: ActivatedRoute, private router: Router,
        private cookieService: CookieService, private navService: NavigationService) {

    }

    ngOnInit() {
        this.traineeID = this.cookieService.get('TraineeID')
        this.userName = this.cookieService.get('userName1');
        this.traineeDetails.FirstName = sessionStorage.getItem("FirstName");
        this.traineeDetails.LastName = sessionStorage.getItem("LastName");
        let Req = {
            username: this.userName
        };
        this.navService.getuseraccess(Req).subscribe((x: any) => {
            const ViewOnly = x.result[0].ViewOnly
            const FullAccess = x.result[0].FullAccess
            const DashboardPermission = x.result[0].DashboardPermission
            const RoleID = x.result[0].RoleID
            this.cookieService.set('ViewOnly', ViewOnly);
            this.cookieService.set('FullAccess', FullAccess);
            this.cookieService.set('DashboardPermission', DashboardPermission);
            this.cookieService.set('RoleID', RoleID);
            this.fullAccess = FullAccess.split(',').map(Number);
            var VewAccess = this.cookieService.get('ViewOnly');
            this.viewOnly = VewAccess.split(',').map(Number);
            this.isLoaded = true;
        });

    }

    checkFullAccess(numberToCheck: number): boolean {
        return this.fullAccess.includes(numberToCheck) || this.viewOnly.includes(numberToCheck);
    }

}