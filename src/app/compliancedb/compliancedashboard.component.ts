import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { Chart } from 'chart.js';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, MultiDataSet, SingleDataSet, Color } from 'ng2-charts';
import { zip } from 'rxjs';
import { ResponseDetails, CardType } from './model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ReportsService } from '../reports/reports.service';
import { ComplianceDashboardService, RequestItem } from './compliancedashboard.service';
import { CookieService } from 'ngx-cookie-service';

interface IRange {
  value: Date[];
  label: string;
}

@Component({
  selector: 'app-compliancedashboard',
  templateUrl: './compliancedashboard.component.html',
  styleUrls: ['./compliancedashboard.component.scss'],
  providers: [ComplianceDashboardService, ReportsService]
})
export class ComplianceDashboardComponent implements OnInit {

  loading:boolean = false;

  public title = 'Tresume-NG';
  public traineeID: number = 5;
  public traineeDetails: any = {};
  public hidePlacementFields: boolean = true;
  public hideBenchFields: boolean = true;
  public hideLegalFields: boolean = true;
  public hideInterviewsFields: boolean = true;
  public hideSubmissionsFields: boolean = true;
  public hideFTCFields: boolean = true;

  public active_toogle = "dropdown_display";
  public isOpen: boolean = false;
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartLabels: Label[] = [];
  public doughnutChart: any[] = [];

  public complianceChartData: SingleDataSet = [];
  public complianceChartLabels: Label[] = [];

  public barChartData1: ChartDataSets[] = [];
  public legalChartData: ChartDataSets[] = [];

  public doughnutBenchChartData: SingleDataSet = [];
  public doughnutBenchChartLabels: Label[] = [];

  public doughnutSubChartData: SingleDataSet = [];
  public doughnutSubChartLabels: Label[] = [];

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  public barChartLabels: Label[] = [''];
  public legalChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartType1: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public chartOptions: ChartOptions = {
    responsive: true,
    legend: {
      /* position: 'right', */
      display: this.hide(),
      fullWidth: false,
      position: this.position()
    }
  }

  public complianceChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      /* position: 'right', */
      display: this.hide(),
      fullWidth: false,
      position: this.position()
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem: any, data: any) => {
          return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
        }
      }
    }
  }

  position() {

    if (window.innerWidth < 1200) {
      return "bottom";
    }
    return "right";
  }
  hide() {

    if (window.innerWidth < 1200) {
      return false;
    }
    return true;
  }

  public chartColors: any[] = [
    { backgroundColor: ["#6F295B", "#EA6A47", "#c874b3", "#ff20c8", "#B9E8E0"] },
    //{ backgroundColor: ["#EA6A47", "#6F295B", "#c874b3", "#ff20c8", "#B9E8E0"] },
    { backgroundColor: ["#B9E8E0", "#ff20c8", "#c874b3", "#940571", "#665191"] }
  ]

  public doughnutChartData1: SingleDataSet = [
    [10, 22, 56],
  ];

  public doughnutChartType: ChartType = 'doughnut';

  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    scales: {
      yAxes: [{
        stacked: false
      }],
      xAxes: [{
        stacked: false
      }]
    }
  };

  public interviewChartOptions1: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    scales: {
      yAxes: [{
        stacked: true
      }],
      xAxes: [{
        stacked: true
      }]
    }
  };

  public legalChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
      display: false
    },
    scales: {
      yAxes: [{
        stacked: true
      }],
      xAxes: [{
        stacked: true
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartData: ChartDataSets[] = [
    { data: [65], label: 'H1-B' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Others' }
  ];

  public barchartColors: any[] = [
    { backgroundColor: ["#223175", "#327c2b", "#62b4f7", "#c874b3"] },
    { backgroundColor: ["#327c2b", "#940571", "#940571"] },
    { backgroundColor: ["#62b4f7", "#c874b3", "#c874b3"] },
    { backgroundColor: ["#c874b3", "#c874b3", "#c874b3"] },
    { backgroundColor: ["#44ea51", "#c874b3", "#c874b3"] }
  ]

  public InterviewchartColors: any[] = [
    { backgroundColor: ["#845EC2", "#845EC2", "#845EC2", "#845EC2", "#845EC2", "#845EC2", "#845EC2"] },
    { backgroundColor: ["#D65DB1", "#D65DB1", "#D65DB1", "#D65DB1", "#D65DB1", "#D65DB1", "#D65DB1"] },
    { backgroundColor: ["#FF6F91", "#FF6F91", "#FF6F91", "#FF6F91", "#FF6F91", "#FF6F91", "#FF6F91"] },
    { backgroundColor: ["#FF9671", "#FF9671", "#FF9671", "#FF9671", "#FF9671", "#FF9671", "#FF9671"] },
    { backgroundColor: ["#FFC75F", "#FFC75F", "#FFC75F", "#FFC75F", "#FFC75F", "#FFC75F", "#FFC75F"] },
    { backgroundColor: ["#FFC75F", "#FFC75F", "#FFC75F", "#FFC75F", "#FFC75F", "#FFC75F", "#FFC75F"] },

  ]

  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#940571',
      /* backgroundColor: ["#940571"], */
    },
    {
      borderColor: '#665191',
      /* backgroundColor: ["#665191"], */
    },
    {
      borderColor: '#c874b3',
      /* backgroundColor: ["#c874b3"] */
    },
  ];

  public lineChartData: ChartDataSets[] = [];
  public totalFTC: number = 0;
  public totalInterviews: number = 0;
  public totalSubmissions: number = 0;
  public defaultStartDate: string;
  public defaultEndDate: string;
  public currentDate: Date;
  public currentSD: string;
  public currentED: any;
  public lastMonthSD: string;
  public lastMonthED: any;
  public prevMonthED: any;
  public prevMonthSD: any;
  public next30days: any;
  public todayDate: any;
  public compliancePercentage: any;
  public totalCompleteProfiles: any;
  public totalIncompleteProfiles: any;

  public I9ChartData: SingleDataSet = [];
  public I9ChartLabels: Label[] = [];

  public DocChartData: SingleDataSet = [];
  public DocChartLabels: Label[] = [];

  public HChartData: SingleDataSet = [];
  public HChartLabels: Label[] = [];

  public h1bexpcurrentMonth: any[] = [];

  bsConfig?: Partial<BsDatepickerConfig>;

  public ranges: IRange[] = [{
    value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
    label: 'Last 7 Days'
  }, {
    value: [new Date(new Date().setDate(new Date().getDate() - 30)), new Date()],
    label: 'Last 30 Days'
  }, {
    value: [new Date(new Date().setDate(new Date().getDate() - 90)), new Date()],
    label: 'Last 90 Days'
  }];

  constructor(private route: ActivatedRoute, private service: ComplianceDashboardService, private router: Router, private reportService: ReportsService, private cookieService: CookieService,) {
    this.traineeID = this.route.snapshot.params["traineeId"];
    this.defaultStartDate = this.dateFormatter(this.ranges[1].value[0]);
    this.defaultEndDate = this.dateFormatter(this.ranges[1].value[1]);
    sessionStorage.setItem("Route", 'Dashboard');

    /* this.currentMonthDates = ((new Date().setDate(new Date().getMonth(), new Date().getFullYear())));
    console.log('this.currentMonthDates', this.currentMonthDates) */

    this.currentDate = new Date(new Date());
    this.currentSD = this.dateFormatter(new Date(this.currentDate.getUTCFullYear(), this.currentDate.getUTCMonth(), 1));
    this.currentED = this.dateFormatter(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0));
    this.currentDate.toLocaleDateString('default', { month: 'long' })
    this.lineChartLabels[2] = new Date(this.currentED).toLocaleDateString('default', { month: 'long' });

    this.next30days = this.newDateFormatter(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0));
    this.prevMonthSD = this.dateFormatter(new Date(this.currentDate.getUTCFullYear(), this.currentDate.getUTCMonth() - 1, 1));
    this.prevMonthED = this.dateFormatter(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0));
    this.lineChartLabels[1] = new Date(this.prevMonthED).toLocaleDateString('default', { month: 'long' });

    this.todayDate = this.newDateFormatter(new Date(this.currentDate.getUTCFullYear(), this.currentDate.getUTCMonth(), 1));

    this.lastMonthSD = this.dateFormatter(new Date(this.currentDate.getUTCFullYear(), this.currentDate.getUTCMonth() - 2, 1));
    this.lastMonthED = this.dateFormatter(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 0));
    this.lineChartLabels[0] = new Date(this.lastMonthED).toLocaleDateString('default', { month: 'long' });

    var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

  }

  ngOnInit() {
    // this.loading = true;
    //this.getTimeSheetReport();
    this.getI9Comp();
    this.getDocComp();
    this.getHComp();
  }


  public toggle() {
    this.isOpen = !this.isOpen;
  }


  public dateFormatter(value: any) {
    let formattedDate = formatDate(value, 'yyyy-MM-dd', "en-US");
    return formattedDate;
  }

  public newDateFormatter(value: any) {
    let formattedDate = formatDate(value, 'yyyy/MM/dd', "en-US");
    return formattedDate;
  }

  public getTimeSheetReport() {
    let requestItem: any = {
      startDate: this.defaultStartDate,
      endDate: this.defaultEndDate,
      OrganizationId: this.cookieService.get('OrgID')
    }
    this.compliancePercentage = [];
    let groupArr: any = [];
    this.reportService.getTimeSheetReport(requestItem).subscribe((x: any) => {
      console.log('x', x)
      this.complianceChartData = [x['result']['completed'], x['result']['incomplete']];
      this.complianceChartLabels = ['100% Compliant', 'Non-compliant'];
    });
  }

  public getI9Comp() {
    this.I9ChartData = [92, 8];

    this.I9ChartLabels = ['Complete', 'Incomplete'];
  }

  public getDocComp() {
    this.DocChartData = [76, 24];

    this.DocChartLabels = ['Valid documents', 'Expired documents'];
  }

  public getHComp() {
    this.HChartData = [83.19, 16.81];
    this.HChartLabels = ['100% Compliant', 'Non-compliant'];
  }

  public compReportMore() {
    this.router.navigate(['/reports/timesheet']);
  }

}
