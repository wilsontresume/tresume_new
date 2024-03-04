import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-invoice-report',
  templateUrl: './invoice-report.component.html',
  styleUrls: ['./invoice-report.component.scss']
})
export class InvoiceReportComponent implements OnInit {

  showExportOptions: boolean = false;
  selection: string = 'All';
  options = ['All','This week','This Month','Customize'];
  OrgID:string = '';
  title: string = "ASTA CRS INC";
  subTitle: string = "Invoice List";
  showNotes: boolean = false;


  constructor(private cookieService: CookieService,) { 
    this.OrgID = this.cookieService.get('OrgID');

   }

  ngOnInit(): void {
    this.OrgID = this.cookieService.get('OrgID');

  }

  toggleExportOptions() {
    this.showExportOptions = !this.showExportOptions;
  }

  isCustomizeSelected(): boolean {
    return this.selection === 'Customize';
  }

  toggleNotes(event: Event) {
    event.preventDefault(); 
    this.showNotes = !this.showNotes;
  }

  runReport(): void {
    let Req: any = {
      OrgID: this.OrgID,
      startdate: '',
      enddate: ''
    };
  }

  // getTotalDuration(): string {
  //   let totalMinutes = 0;

  //   for (const row of this.tableData) {
  //     if (row.duration) {
  //       const durationParts = row.duration.split(':');
  //       const hours = parseInt(durationParts[0], 10);
  //       const minutes = parseInt(durationParts[1], 10);
  //       totalMinutes += hours * 60 + minutes;
  //     }
  //   }

  //   const totalHours = Math.floor(totalMinutes / 60);
  //   const remainingMinutes = totalMinutes % 60;

  //   return `${totalHours}:${remainingMinutes}`;
  // }
}
