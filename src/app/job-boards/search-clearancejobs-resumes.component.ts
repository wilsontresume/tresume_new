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
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import * as FileSaver from 'file-saver';
//import * as htmlDocx from 'html-docx-js';
//import * as html2pdf from 'html2pdf.js';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgxExtendedPdfViewerService, TextLayerRenderedEvent } from 'ngx-extended-pdf-viewer';

const b64toBlob = (b64Data: any, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

@Component({
    selector: 'app-search-clearancejobs-resumes',
    templateUrl: './search-clearancejobs-resumes.component.html',
    providers: [JobBoardsService, CookieService, MessageService, NgxExtendedPdfViewerService],
    styleUrls: ['./search-resumes.component.scss']
})


export class SearchResumesClearanceComponent implements OnInit {

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

    states: any[] = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Dakota',
        'North Carolina',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'Washington DC',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
    ];

    workStatus: any[] = [
        { value: 'CTAY', name: 'Can work for any employer' },
        { value: 'CTCT', name: 'US Citizen' },
        { value: 'CTEM', name: 'H1 Visa' },
        { value: 'CTGR', name: 'Green Card Holder' },
        { value: 'CTNO', name: 'Need H1 Visa Sponsor' },
        { value: 'CTNS', name: 'Not Specified' },
        { value: 'EATN', name: 'TN Permit Holder' },
        { value: 'EAEA', name: 'Employment Authorization Document' },

    ];

    educationDegree: any[] = [
        { value: 'CE5', name: 'Not Specified' },
        { value: 'CE30', name: 'Vocational' },
        { value: 'CE31', name: 'High School' },
        { value: 'CE32', name: 'Associate Degree' },
        { value: 'CE321', name: 'Bachelor\'s Degree' },
        { value: 'CE3210', name: 'Master\'s Degree' },
        { value: 'CE3211', name: 'Doctorate' },

    ];

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
    skills: any[] = [];
    edgeIDs: any[] = [];
    resultsFound: boolean = false;
    loading: boolean = false;
    searchRequestItem: CLSearchRequestItem = {};
    daysWithin: string;
    searchSkill: string;
    yearsOfExp: string;
    schoolName: string;
    willingToRelocate: boolean;
    hasSecurityClearance: boolean;
    selectedWorkstatus: any[] = [];
    selectedEducationDegree: any;
    migratedProfiles: any[] = [];
    isProfileLoaded: boolean = false;
    currentResumeContent: any;
    visibleSidebar2: boolean = false;
    application: any;
    fileReady: boolean = false;
    isPDFSrc: boolean = false;
    objUrl: any;
    componentInitialized: boolean;
    currentResumeResp: any;
    currentEdgeID: any;
    currentResumeID: any;
    isMigratedProfile: boolean = false;

    @ViewChild('lgModal', { static: false }) lgModal?: ModalDirective;
    @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
    accessToken: any;
    totalResults: any;
    quota: any;

    constructor(private route: ActivatedRoute, private service: JobBoardsService, private cookieService: CookieService,
        private messageService: MessageService, private sanitizer: DomSanitizer, private pdfViewerService: NgxExtendedPdfViewerService) {
        this.traineeId = sessionStorage.getItem("TraineeID");
        if (this.traineeId == '') {
            this.traineeId = localStorage.getItem("TraineeID");
        }
        //this.traineeId = '1';
        //(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
    }

    ngOnInit(): void {
        this.cookieValue = this.cookieService.get('employeruser')
        this.initGrid();
        this.service.getClearanceToken().subscribe((x: any) => {
            if (x.code != 460) {
                this.accessToken = x.access_token;
                console.log(this.accessToken);
            }
            else {

            }
        });
        console.log(this.traineeId);

        let migrateCheckReq = {
            source: 'CB',
            traineeId: this.traineeId
        }
        this.service.checkIfProfileMigrated(migrateCheckReq).subscribe((response: any) => {
            console.log('response', response)
            this.migratedProfiles = response;

        })
        /* if (this.traineeId) {
            let req = {
                "traineeId": this.traineeId,
                "keyword": ''
            }
            this.service.getResumes(req).subscribe(x => {
                let response = x.result;
                this.rowData = response;
                this.paginatedArray = this.rowData.slice(0, 10);
                console.log('this.rowData', this.rowData)
                this.sizeToFit();

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
                    console.log('this.rowData', this.rowData)
                    this.sizeToFit();

                });
            });
        } */
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

    public downloadDoc() {
        const blob = b64toBlob(this.currentResumeResp.Content, this.currentResumeResp.ContentType);
        FileSaver.saveAs(blob, this.currentResumeResp.Filename);
    }

    public download() {
        if (this.isMigratedProfile) {
            this.messageService.add({ severity: 'error', summary: 'Resume Migrated. Get details from Quick View' });
            return;
            //let docBlob: any = htmlDocx.asBlob(this.objUrl);
            //html2pdf().from(this.objUrl).save(this.currentEdgeID + '.pdf');
            //FileSaver.saveAs(docBlob, this.currentEdgeID + '.docx');
            /* let req = {
                userName: this.currentResumeID
            }
            this.service.getResumePath(req).subscribe((x: any) => {
                console.log('x', x)
                FileSaver.saveAs("https://tresume.us/" + x[0].ResumePath, x[0].ResumeName);
            }); */
        }
        else {
            let req = {
                edgeID: this.currentEdgeID,
                token: this.accessToken,
                userName: this.traineeId
            }
            this.loading = true;
            this.service.downloadCBpdf(req).subscribe((x: any) => {
                console.log('x', x)
                this.isPDFSrc = (x.ContentType === "application/pdf") ? true : false;
                let b64Data: any = x.Content;
                this.currentResumeResp = x;
                this.currentResumeContent = x.Content;
                let contentType = x.ContentType;
                const blob = b64toBlob(b64Data, contentType);
                this.loading = false;
                //this.isProfileLoaded = true;
                /* let req22 = {
                    file: blob,
                    fileName: x.Filename,
     
                }
                this.service.uploadJobBoardResume(req22).subscribe(y => {
                    console.log('y', y)
     
                }); */
                FileSaver.saveAs(blob, x.Filename);
            });
        }
    }

    private yearsRender(params: any) {
        if (params.value && params.value > 11) {
            return params.value / 12;
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
        let req = {
            token: this.accessToken
        }
        
        if (this.searchRequestItem.page == undefined) {
            let auditReq = {
                jobBoard: 'ClearanceJobs',
                query: this.model.keyword,
                dateTime: new Date(),
                userName: this.cookieValue
            }
            this.service.jobBoardAudit(auditReq).subscribe(x => { });
        }
        this.loading = true;
        //this.resultsFound = false;
        this.searchRequestItem.keywords = this.model.keyword;
        this.searchRequestItem.token = this.accessToken;
        this.searchRequestItem.limit = 10;
        this.searchRequestItem.locations_us = this.selectedState;
        // this.searchRequestItem.filters = this.getFilterValues();
        // this.searchRequestItem.facetFilter = this.getFacetFilterValues();
        this.edgeIDs = [];
        this.service.getClearanceResumes(req).subscribe((x: any) => {
            this.loading = false;
            this.resultsFound = true;
            let data = x.data;
            let meta = x.meta.pagination;
            this.totalResults = meta.total;
            this.rowData = data;
        });
    }

    private getFilterValues() {
        let filter: string = '';
        if (this.daysWithin) {
            filter = 'ResumeModified:[NOW-' + this.daysWithin + 'DAYS/DAY TO *]';
        }
        if (this.searchSkill) {
            filter += 'Skill:[' + this.searchSkill + ']';
        }
        return filter;
    }

    public getFacetFilterValues() {
        let facetFilter: string = '';
        if (this.yearsOfExp) {
            facetFilter = 'YearsOfExperience:' + this.yearsOfExp;
        }
        if (this.schoolName) {
            facetFilter = 'School:[' + this.schoolName + ']';
        }
        if (this.willingToRelocate) {
            facetFilter += ' WillingToRelocate:' + this.willingToRelocate;
        }
        if (this.hasSecurityClearance) {
            facetFilter += ' SecurityClearance:' + this.hasSecurityClearance;
        }
        if (this.selectedWorkstatus.length > 0) {
            facetFilter += ' WorkStatus:' + this.selectedWorkstatus[0].value;
        }
        if (this.selectedEducationDegree) {
            facetFilter += ' HighestEducationDegreeCode:' + this.selectedEducationDegree.value;
        }
        return facetFilter;
    }

    public selecteWorkstatus(value: any) {
        console.log('value', value)

    }

    public onPreview(params: any) {
        let req = {
            token: this.accessToken,
            member_id: params.member_id
        }
        this.loading = true;
        this.service.getClreancePdf(req).subscribe((profileDetails: any) => {
            console.log(profileDetails);
      
        });
    }


    public goBack() {
        window.history.back();
    }

    pageChanged(event: PageChangedEvent): void {
        this.searchRequestItem.page = event.page;
        this.onSearch();
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        window.scrollTo(0, 0);

    }

    public onReady(): void {
        this.componentInitialized = true;
        this.application = (window as any).PDFViewerApplication;
        // this.info('PDF loading starts', this.application != null);
    }

    public close(result?: void) {
        // unbind offending event listeners
        const unbindWindowEvents = this.application?.unbindWindowEvents?.bind(this.application);
        if (typeof unbindWindowEvents === 'function') {
            unbindWindowEvents();
        } else {
            console.log('Error unbind pdf viewer')
        }
    }

}

export interface CLSearchRequestItem {
    keywords?: string;
    token?: string;
    locations_us?: string;
    page?: number;
    limit?: number;
    radius?: number;
    zip_text?:string;
    only_title?: string;
    // edu?: string;
    // clearance?: string;
}


export interface CBProfileRequestItem {
    emailID?: string;
    firstName?: string;
    lastName?: string;
    title?: string;
    currentLocation?: string;
    yearsOfExpInMonths?: string;
    skills?: string;
    htmlResume?: string;
    source?: string;
    ATSID?: string;
    traineeId?: string | null;
}

