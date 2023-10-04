import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { GridOptions, ColDef, RowNode, Column, GridApi } from 'ag-grid-community';
import { Router } from "@angular/router";
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { OnboardingService } from '../onboarding.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-import-details',
    templateUrl: './import-details.component.html',
    providers: [OnboardingService],
    styleUrls: ['../onboarding.component.scss']
})
export class ImportDetailsComponent implements OnInit {


    public selectedState: string;
    public isCandidateSelected: boolean = false;
    public selectedEmployee: any;
    public OrgID: any;

    constructor(private service: OnboardingService, private router: Router, private cookieService: CookieService) {
    }

    public candidateNames: any;

    ngOnInit(): void {
        this.OrgID = this.cookieService.get('OrgID')
        console.log('this.OrgID', this.OrgID)
        let requestItem: any = {
            OrgID: this.OrgID || 9,
        }
        this.service.getCandidateByStatusList(requestItem).subscribe(x => {
            this.candidateNames = x;
        });
    }


    typeaheadOnSelect(e: TypeaheadMatch): void {
        this.isCandidateSelected = true;
        if (e.item) {
            this.selectedEmployee = e.item;
        }
        console.log('Selected value: ', e.value);
    }

    startOnboard() {
        let requestItem: any = {
            OrgID: this.OrgID || 9,
            traineeID: this.selectedEmployee.TraineeID,
            FirstName: this.selectedEmployee.FirstName,
            LastName: this.selectedEmployee.LastName

        }
        sessionStorage.setItem("OnBoardTraineeID", this.selectedEmployee.TraineeID.toString());
        this.service.createOnboarding(requestItem).subscribe((x: any) => {
            this.router.navigate(['/onboard/step/' + x[0].ID]);
        });
    }
}