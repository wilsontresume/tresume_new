import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GridOptions, ColDef, RowNode, Column, GridApi } from 'ag-grid-community';
import { JobBoardsService } from './job-boards.service';
import { CookieService } from 'ngx-cookie-service';
import * as FileSaver from 'file-saver';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-search-resumes',
    templateUrl: './search-resumes.component.html',
    styleUrls: ['./search-resumes.component.scss'],
    providers: [JobBoardsService, CookieService]
})


export class SearchResumesComponent implements OnInit {

    form = new FormGroup({});
    model: any = {};
    options: FormlyFormOptions = {};
    fields: FormlyFieldConfig[] = [
        {
            key: 'keyword',
            type: 'input',
            templateOptions: {
                label: 'Keywords',
                placeholder: 'Enter the search keyword',
                required: true,
            },
        },
    ];

    // states: any[] = [
    //     'Alabama',
    //     'Alaska',
    //     'Arizona',
    //     'Arkansas',
    //     'California',
    //     'Colorado',
    //     'Connecticut',
    //     'Delaware',
    //     'Florida',
    //     'Georgia',
    //     'Hawaii',
    //     'Idaho',
    //     'Illinois',
    //     'Indiana',
    //     'Iowa',
    //     'Kansas',
    //     'Kentucky',
    //     'Louisiana',
    //     'Maine',
    //     'Maryland',
    //     'Massachusetts',
    //     'Michigan',
    //     'Minnesota',
    //     'Mississippi',
    //     'Missouri',
    //     'Montana',
    //     'Nebraska',
    //     'Nevada',
    //     'New Hampshire',
    //     'New Jersey',
    //     'New Mexico',
    //     'New York',
    //     'North Dakota',
    //     'North Carolina',
    //     'Ohio',
    //     'Oklahoma',
    //     'Oregon',
    //     'Pennsylvania',
    //     'Rhode Island',
    //     'South Carolina',
    //     'South Dakota',
    //     'Tennessee',
    //     'Texas',
    //     'Utah',
    //     'Vermont',
    //     'Virginia',
    //     'Washington',
    //     'Washington DC',
    //     'West Virginia',
    //     'Wisconsin',
    //     'Wyoming'
    // ];

    Jobboard: any[] = [
        { value: 'all', name: 'All' },
        { value: 'Dice', name: 'Dice' },
        { value: 'CB', name: 'Career Builder' },
        { value: 'Monster', name: 'Monster' },

      ];

    selectedJobboard: any[] = [];
    states:any[];
    rowData: any;
    columnDefs: any;
    public gridOptions: GridOptions = {};
    public gridApi: GridApi;
    public selectedState: string;
    public resumeHTMLContent: string;
    traineeId: string | null;
    private cookieValue: any;
    modalRef?: BsModalRef;
    loggedTraineeId: any;
    currentResumeID: any;
    resultsFound: boolean = false;
    totalResults: any;
    totalItems: number;
    itemsPerPage: number = 10;
    currentPage: number = 1;
    responseData: any;

    daysWithin: number;
    yearsOfExp: number;
    yearsOfExpmin: number;
    jobTitle: string = '';

    loading: boolean = false;
    recruiterList:any;
    selectedRecruiter:any;

    @ViewChild('lgModal', { static: false }) lgModal?: ModalDirective;
    @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
    visibleSidebar2: boolean = false;
    OrgID: string;
    userName1: string;

    searchType:number = 1;
    startdate:Date;
    enddate:Date;
    constructor(private route: ActivatedRoute, private service: JobBoardsService, private cookieService: CookieService, private modalService: BsModalService) {
        this.traineeId = this.cookieService.get('TraineeID');
        // this.traineeId = '36960';
    }

    ngOnInit(): void {
        this.loading = true;
        this.cookieValue = this.cookieService.get('userName1')
        this.OrgID = this.cookieService.get('OrgID');
        this.userName1 = this.cookieService.get('userName1');
        let req1 = {}
        this.service.getcandidatelocation(req1).subscribe(x => {
            let response = x.result;
            this.states = response;
            console.log(this.states)
        });
        this.FetchRecruiterbyOrg();
        this.initGrid();
        if (this.traineeId) {
            let req = {
                "traineeId": this.traineeId,
                "keyword": ''
            }

            this.service.getResumes(req).subscribe(x => {
                
                let response = x.result;
                this.resultsFound = true;
                this.responseData = response;

                this.rowData = this.responseData.slice(0, 10);
                this.rowData.map((items: any) => {
                   items.editMode = false;
                });
                this.totalResults = this.responseData.length;
                this.sizeToFit();
                console.log(this.rowData)
                this.loading = false;
            });
            

            
        }
        else {
            let req = {
                userName: this.cookieValue
            }
            this.service.getLoggedUser(req).subscribe((x: any) => {
                if (x) {
                    this.traineeId = x[0].TraineeID;
                }
                let req = {
                    "traineeId": this.traineeId,
                    "keyword": ''
                }
                this.service.getResumes(req).subscribe(x => {
                    let response = x.result;
                    this.rowData = response;
                    this.sizeToFit();

                });
            });
        }
    }

    public initGrid() {
        let cellRendererFn = function (params: any): any { return null; };
        this.columnDefs = [
            { headerName: 'Source', field: 'Source', sortable: true, resizable: true, filter: true },
            { headerName: 'Name', field: 'FullName', sortable: true, resizable: true, filter: true },
            { headerName: 'Years of Exp', field: 'YRSEXP', sortable: true, resizable: true, valueFormatter: this.yearsRender.bind(this), filter: true },
            { headerName: 'Location', field: 'CurrentLocation', sortable: true, resizable: true, filter: true },
            { headerName: 'Legal Status', field: 'LegalStatus', sortable: true, resizable: true, filter: true },
            { headerName: 'Title', field: 'TraineeTitle', sortable: true, resizable: true, filter: true },
            { headerName: 'Last Update', field: 'LastUpdateTime', resizable: true, valueFormatter: this.renderCell.bind(this) }
        ];

        this.columnDefs.push({
            headerName: '', field: 'download', minWidth: 60, maxWidth: 60,
            onCellClicked: this.download.bind(this),
            cellClass: "fa fa-info-circle",
            cellStyle: { cursor: 'pointer' },
            headerClass: "ag-header-cell-action",
            cellRenderer: cellRendererFn,
            suppressMenu: true, suppressMovable: true,
            pinned: "right"
        });

        this.gridOptions = {
            rowData: this.rowData,
            columnDefs: this.columnDefs,
            pagination: true
        }


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

    public async FetchRecruiterbyOrg(){
        
        let req = {
            OrgID: this.OrgID
        }
       await this.service.FetchRecruiterList(req).subscribe((x: any) => {
            console.log(x);
            this.recruiterList = x.result;
            this.recruiterList.unshift({
                "value": 0,
                "name": "All"
            });
            
        });
        console.log(this.recruiterList);
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

    private yearsRender(params: any) {
        if (params.value && params.value > 11) {
            return Math.floor(params.value / 12);
        }
        else if (params.value > 0) {
            return params.value + ' Month';
        }
        else {
            return '';
        }
    }

    private renderCell(params: any) {
        if (params.value && params.value != '1900-01-01') {
            return params.value;
        }
        else {
            return '';
        }
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
    }

    public sizeToFit() {
        let ids: string[] = [];
        this.columnDefs.forEach((column: any) => {
            ids.push(column.field || "");
        });
        if (this.gridOptions.columnApi) {
            this.gridOptions.columnApi.autoSizeColumns(ids);
        }
        if (this.gridOptions.api) {
            this.gridOptions.api.sizeColumnsToFit();
        }
    }

    public onSearch() {
        this.loading = true;
        this.resultsFound = false;
        console.log(this.selectedRecruiter.value);
        let req = {
            "traineeId": this.traineeId,
            'keyword': this.model.keyword,
            'location': this.selectedState,
            'daysWithin':this.daysWithin,
            'yearsOfExpmin':this.yearsOfExpmin,
            'yearsOfExp':this.yearsOfExp,
            'jobTitle':this.jobTitle,
            'Jobboard':this.selectedJobboard,
            'recruiter':this.selectedRecruiter.value,
            'OrgID':this.OrgID
        }
        console.log(req);
        this.service.getResumes2(req).subscribe(x => {
            this.loading = false;
            this.resultsFound = true;
            let response = x.result;
            this.responseData = response;
            this.rowData = this.responseData.slice(0, 10);
            this.totalResults = this.responseData.length;
            this.sizeToFit();

        });
    }

    public onSearch2() {
        this.loading = true;
        this.resultsFound = false;
        console.log(this.selectedRecruiter.value);
        let req = {
            "traineeId": this.traineeId,
            'keyword': this.model.keyword,
            'location': this.selectedState,
            'startdate':this.startdate,
            'enddate':this.enddate,
            'recruiter':this.selectedRecruiter.value,
            'OrgID':this.OrgID
        }
        console.log(req);
        this.service.getResumes3(req).subscribe(x => {
            this.loading = false;
            this.resultsFound = true;
            let response = x.result;
            this.responseData = response;
            this.rowData = this.responseData.slice(0, 10);
            this.totalResults = this.responseData.length;
            this.sizeToFit();

        });
    }
    

    pageChanged(event: PageChangedEvent): void {
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.rowData = this.responseData.slice(startItem, endItem)
        window.scrollTo(0, 0);

    }


    public goBack() {
        window.history.back();
    }

    public migrate(id:string){
        let req = {
            traineeId: id
          };
          this.service.atsmigrateprofile(req).subscribe((x) => {
            if (this.traineeId) {
                let req = {
                  traineeId: this.traineeId,
                  keyword: '',
                };
          
                this.service.getResumes(req).subscribe((x) => {
                  let response = x.result;
                  this.resultsFound = true;
                  this.responseData = response;
                  this.rowData = this.responseData.slice(0, 10);
                  this.totalResults = this.responseData.length;
                  this.sizeToFit();
                });
              } else {
                let req = {
                  userName: this.cookieValue,
                };
                this.service.getLoggedUser(req).subscribe((x: any) => {
                  if (x) {
                    this.traineeId = x[0].TraineeID;
                  }
                  let req = {
                    traineeId: this.traineeId,
                    keyword: '',
                  };
                  this.service.getResumes(req).subscribe((x) => {
                    let response = x.result;
                    this.rowData = response;
                    this.sizeToFit();
                  });
                });
              }          
          });
          
      }

      enableEditMode(index: number): void {
        console.log(index);
        this.rowData[index].editMode = true;
        let req = {
            Notes: this.rowData[index].Notes,
            traineeID:this.rowData[index].TraineeID
        }
        this.service.updateCandidateNotes(req).subscribe((x: any) => {
          console.log(x); 
        });
      }
    
      saveChanges(index: number): void {
        this.rowData[index].editMode = false;
        let req = {
            Notes: this.rowData[index].Notes,
            traineeID:this.rowData[index].TraineeID
        }
        this.service.updateCandidateNotes(req).subscribe((x: any) => {
          console.log(x); 
        });
      }
    
      cancelEdit(index: number): void {
        // Cancel edit mode
        this.rowData[index].editMode = false;
      }

}
