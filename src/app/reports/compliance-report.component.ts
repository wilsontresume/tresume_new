import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DashboardService, RequestItem } from '../dashboard/dashboard.service';
import { ReportsService } from './reports.service';
import { GridOptions, ColDef, RowNode, Column, GridApi } from 'ag-grid-community';



interface IRange {
    value: Date[];
    label: string;
}

@Component({
    selector: 'app-jobboard-audit-reports',
    templateUrl: './compliance-report.component.html',
    styleUrls: ['./reports.component.scss'],
    providers: [DashboardService, ReportsService]
})
export class ComplianceReportComponent implements OnInit {

    public gridOptions: GridOptions = {};
    public gridApi: GridApi;
    rowData: any;

    columnDefs = [
        { field: 'CandidateName', headerName: 'Candidate Name', sortable: true, filter: true, resizable: true },
        { field: 'Recruiter', headerName: 'Recruiter', sortable: true, filter: true, resizable: true },
        { field: 'Title', headerName: 'Title', sortable: true, filter: true, resizable: true },
        { field: 'StartDate', headerName: 'Start Date', sortable: true, filter: true, resizable: true },
        { field: 'ClientAddress', headerName: 'Client Address', sortable: true, filter: true, resizable: true },
        { field: 'ClientSupervisor', headerName: 'Client Supervisor', sortable: true, filter: true, resizable: true },
        { field: 'VendorName', headerName: 'Vendor', sortable: true, filter: true, resizable: true },
        { field: 'VendorLocation', headerName: 'Vendor Location', sortable: true, filter: true, resizable: true },
        { field: 'JobDuties', headerName: 'Job Duties', sortable: true, filter: true, resizable: true },
        { field: 'Salary', headerName: 'Pay Rate', sortable: true, filter: true, resizable: true },
        { field: 'EmploymentStartDate', headerName: 'Employment Start Date', sortable: true, filter: true, resizable: true },
        { field: 'Address', headerName: 'Address', sortable: true, filter: true, resizable: true }
    ];

    public traineeId: any;

    constructor(private http: HttpClient, private service: DashboardService, private reportService: ReportsService) {
        this.traineeId = sessionStorage.getItem("TraineeID");
        sessionStorage.setItem("Route", 'Reports');
    }

    ngOnInit() {
        this.gridOptions = {
            rowData: this.rowData,
            columnDefs: this.columnDefs,
            pagination: true
        }
        this.getComplianceReport();

    }

    public getComplianceReport(startDate?: string, endDate?: string) {
        let requestItem: any = {
            traineeId: this.traineeId,
        }
        this.reportService.getSiteVisitReport(requestItem).subscribe(x => {
            let response = x.result;
            if (response) {
                this.rowData = response;
                this.sizeToFit();
            }
        });
    }

    public sizeToFit() {
        let ids: string[] = [];
        this.columnDefs.forEach(column => {
            ids.push(column.field || "");
        });
        if (this.gridOptions.columnApi) {
            this.gridOptions.columnApi.autoSizeColumns(ids);
        }
        if (this.gridOptions.api) {
            this.gridOptions.api.sizeColumnsToFit();
        }
    }

    public onExport() {
        this.gridApi.exportDataAsCsv();
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
    }

    @HostListener('window:resize', ['$event'])
    onResize(e: Event) {
        setTimeout(() => {

            this.sizeToFit();

        }, 10);
    }

}