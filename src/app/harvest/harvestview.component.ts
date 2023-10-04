import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GridOptions, ColDef, RowNode, Column, GridApi } from 'ag-grid-community';
import { HarvestService } from './harvest.service';
import { CookieService } from 'ngx-cookie-service';
import * as FileSaver from 'file-saver';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-harvestview',
    templateUrl: './harvestview.component.html',
    styleUrls: ['./harvest.component.scss'],
    providers: [HarvestService, CookieService]
})


export class HarvestViewComponent implements OnInit {

    public OrgID: any;
    public userName: any;
    public TraineeID: any;
    public keywords:string;
    public Jobdescription:string;
    public JobTitle:string;
    public Location:string;
    public Radius:string;
    public Lastupdated:string;
    public downlodlimit:number;
    public shedule:string;
    public harvestlist:any;
    currentResumeID: any;
    public resumeHTMLContent: string;
    visibleSidebar2: boolean = false;
    resultsFound: boolean = false;
    responseData: any;
    totalResults: any;
    rowData: any;
  
    showcrediterror: boolean = false;
     //division 
     creditcount: number = 0;
     usedcount: number = 0;
     clientip: any;
     userName1: any;
     divID: any;
     jobID: any = 3;
     isallowed: any = true;
     divcandidateemail: any = '';
     harvestid:any='';
     loading:boolean = true;


    constructor(
        private cookieService: CookieService,
        private service: HarvestService,
        private route: ActivatedRoute,
      ) { }

    ngOnInit(): void {
        this.OrgID = this.cookieService.get('OrgID');
        this.userName = this.cookieService.get('userName1');
        this.TraineeID = this.cookieService.get('TraineeID');
        this.harvestid = this.route.snapshot.params["id"];
        // this.OrgID = 82;
        // this.userName = 'karthik@tresume.us';
        // this.TraineeID = 36960;
        
        let Req = {
            harvestid: this.harvestid,
            
          };
          console.log(this.OrgID);
          this.service.fetchharvestcandidate(Req).subscribe((x: any) => {
            this.loading = false;
            let response = x.result;
            this.resultsFound = true;
            this.responseData = response;
            this.rowData = this.responseData.slice(0, 10);
            this.totalResults = this.responseData.length;
          });

      }

      private download(params: any) {
        console.log('params', params)
        if (params) {
            let req = {
                traineeID: params.TraineeID
            }
            this.currentResumeID = params.UserName;
            this.service.getResumeDetails(req).subscribe((x: any) => {
                if (x[0].HtmlResume) {
                    this.resumeHTMLContent = x[0].HtmlResume;
                }
                else {
                    this.resumeHTMLContent = "No Resume found"
                }
                //this.modalRef = this.modalService.show();
                //this.lgModal?.show()
                this.visibleSidebar2 = true;
            });
        }
    }

    public downloadAsPdf() {
        let req = {
            userName: this.currentResumeID
        }
        this.service.getResumePath(req).subscribe((x: any) => {
            console.log('x', x)
            FileSaver.saveAs("https://tresume.us/" + x[0].ResumePath, x[0].ResumeName);
        });
    }
      
      

}
