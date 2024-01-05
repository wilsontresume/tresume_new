import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DashboardService, RequestItem } from '../dashboard/dashboard.service';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../app.service';



interface IRange {
    value: Date[];
    label: string;
}

@Component({
    selector: 'app-reports',
    templateUrl: './reports-home.component.html',
    styleUrls: ['./reports.component.scss'],
    providers: [DashboardService]
})
export class ReportsHomeComponent implements OnInit {
    userName: any;
    traineeId: any;

    constructor(private router: Router, private cookieService: CookieService, private service: AppService,) { }

    ngOnInit() {
        this.userName = this.cookieService.get('userName1')
        let req = {
            userName: this.userName
        }
        this.service.getLoggedUser(req).subscribe((x: any) => {
            if (x) {
                this.traineeId = x[0].TraineeID;
                sessionStorage.setItem("TraineeID", this.traineeId);
            }
        });
    }

    public routeLinks(route: string) {
        this.router.navigate(['reports/' + route])
    }

    reports = [
      { title: 'FTC Report', description: 'Generates a list of First Time Callers' },
      { title: 'Interviews Report', description: 'Generates a list of Interviews scheduled during a time period' },
      { title: 'Bench Tracker Report', description: 'Generates a list of Candidates currently on bench' },

    ];


}
