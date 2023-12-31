import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from './candidate.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-sitevisit',
    templateUrl: './site-visit.component.html',
    styleUrls: ['../app.component.scss'],
    providers: [CandidateService, DashboardService]
    
})


export class SiteVisitComponent implements OnInit {

    public traineeId: any;
    public details: any;
    public eduDetails: any;
    public H1BStatus: any;
    public newJDDetails: any;
    public toggleView: boolean = false;

    @ViewChild('lgModal', { static: false }) lgModal?: ModalDirective;

    constructor(private route: ActivatedRoute, private service: CandidateService, private dashservice: DashboardService) {
        this.traineeId = this.route.snapshot.params["traineeId"];

    }

    ngOnInit(): void {
        this.service.getSiteVisitDetails(this.traineeId).subscribe(x => {
            let response = x.result;
            if (response) {
                this.details = response[0];
                this.getLegalStatus();
                this.service.getTraineeEduDetails(this.traineeId).subscribe(x => {
                    this.toggleView = true;
                    let response = x.result;
                    if (response) {
                        this.eduDetails = response[0];
                    }

                });
            }

        });


    }

    public getLegalStatus() {
        this.dashservice.getLegalStatus(1).subscribe(x => {
            let response = x.result;
            if (response) {
                this.H1BStatus = response.filter((y: any) => y.LegalStatusID == 14)[0].Total;

            }
        });
    }

    public saveJD() {
        var str;
        str = this.details.JobDuties.replace(/'/g, '\'\'');
        let request = {
            jd: str,
            traineeID: this.traineeId
        }
        this.service.updateJobDuties(request).subscribe(x => {
            this.lgModal?.hide()
        });
    }

    printThisPage() {
        window.print();
    }

    public goBack() {
        window.history.back();
    }
}