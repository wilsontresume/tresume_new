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


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    providers: [JobBoardsService, CookieService],
    styleUrls: ['./search-resumes.component.scss']
})


export class SearchComponent implements OnInit {

    private cookieValue: any;
    UserOrganizationID: any;
    constructor(private route: ActivatedRoute, private cookieService: CookieService) {
        
    }

    ngOnInit(): void {
        
        this.cookieValue = this.cookieService.get('userName')
        console.log(this.cookieValue);
    }
}