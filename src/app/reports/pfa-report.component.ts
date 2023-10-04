import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DashboardService, RequestItem } from '../dashboard/dashboard.service';
import { ReportsService } from './reports.service';
import { GridOptions, ColDef, RowNode, Column, GridApi } from 'ag-grid-community';
import * as FileSaver from 'file-saver';
interface IRange {
    value: Date[];
    label: string;
}

@Component({
    selector: 'app-pfa-reports',
    templateUrl: './pfa-report.component.html',
    styleUrls: ['./reports.component.scss'],
    providers: [DashboardService, ReportsService]
})
export class PFAReportComponent implements OnInit {

    public gridOptions: GridOptions = {};
    public gridApi: GridApi;
    rowData: any;
    public traineeId: any;
    columnDefs: any;

    constructor(private http: HttpClient, private service: DashboardService, private reportService: ReportsService) {
        this.traineeId = sessionStorage.getItem("TraineeID");
        //this.traineeId = 1;
        sessionStorage.setItem("Route", 'Reports');
    }


    ngOnInit(): void {
        let cellRendererFn = function (params: any): any { return null; };
        this.columnDefs = [
            { field: 'CandidateName', headerName: 'Candidate Name', sortable: true, filter: true, resizable: true },
            { field: 'Recruiter', headerName: 'Recruiter', sortable: true, filter: true, resizable: true },
            { field: 'OtherInfo', headerName: 'LCA Info', sortable: true, filter: true, width: 500, resizable: true, valueFormatter: this.renderInfoCell.bind(this) },
            { field: 'DocStartDate', headerName: 'Start Date', sortable: true, filter: true, resizable: true, valueFormatter: this.renderCell.bind(this), comparator: this.dateComparator.bind(this) },
            { field: 'DocExpiryDate', headerName: 'Expiry Date', sortable: true, filter: true, resizable: true, comparator: this.dateComparator.bind(this), valueFormatter: this.renderCell.bind(this) },
            { field: 'CreateTime', headerName: 'Created On', sortable: true, filter: true, resizable: true, comparator: this.dateComparator.bind(this), valueFormatter: this.renderCell.bind(this) }
        ];
        this.columnDefs.push({
            headerName: '', field: 'download', minWidth: 15, maxWidth: 50,
            onCellClicked: this.download.bind(this),
            cellClass: "fa fa-download",
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
        this.getComplianceReport();
    }

    public getComplianceReport(startDate?: string, endDate?: string) {
        let requestItem: any = {
            traineeId: this.traineeId,
        }
        this.reportService.getPFAReport(requestItem).subscribe(x => {
            let response = x.result;
            if (response) {
                this.rowData = response;
                this.sizeToFit();
            }
        });
    }

    private renderCell(params: any) {
        if (params.value && params.value != '01/01/1900') {
            return params.value;
        }
        else {
            return '';
        }
    }

    private download(params: any) {
        if (params.data) {
            FileSaver.saveAs("https://tresume.us/" + params.data.DocumentPath, params.data.DocumentName);
        }
    }

    private renderInfoCell(params: any) {
        if (params.data.OtherInfo) {

            let info = params.data.OtherInfo.split(',');
            let cellInfo = info[0] ? ' Title: ' + info[0] : '';
            cellInfo += info[1] ? ' Client: ' + info[1] : '';
            cellInfo += info[2] ? ' LCA Rate: ' + info[2] : '';
            cellInfo += info[3] ? ' Salary/hr: ' + info[3] : '';
            cellInfo += info[4] ? ' State: ' + info[4] : '';
            return cellInfo;
        }
        else {
            return '';
        }
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

    public onExport() {
        this.gridApi.exportDataAsCsv();
    }

    private dateComparator(date1?: any, date2?: any) {
        var date1Number = this._monthToNum(date1);
        var date2Number = this._monthToNum(date2);

        if (date1Number === null && date2Number === null) {
            return 0;
        }
        if (date1Number === null) {
            return -1;
        }
        if (date2Number === null) {
            return 1;
        }
        return date1Number - date2Number;
    }

    private _monthToNum(date?: any) {
        if (date === undefined || date === null || date.length !== 10) {
            return null;
        }

        var yearNumber = date.substring(6, 10);
        var monthNumber = date.substring(0, 2);
        var dayNumber = date.substring(3, 5);

        var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
        // 29/08/2004 => 20040829
        return result;
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