import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-new-time-sheet-report',
  templateUrl: './new-time-sheet-report.component.html',
  styleUrls: ['./new-time-sheet-report.component.scss']
})
export class NewTimeSheetReportComponent implements OnInit {

  //showReportPanel = false;
  startDate: Date;
  endDate: Date;
  datepickerConfig: Partial<BsDatepickerConfig>;
  showNotes: boolean = false;
  notes: string = '';
  sort_mode: any;
  sortOptionsList: any;
  sort_by: any;
  showSortingOptions = false;
  editMode: boolean = false;
  companyName: string = "ASTA CRS INC";
  timeActivity: string = "Time Activities by Employee Detail";
  Activity: string ="January 1-24, 2024";
  showIcon = false;
  sortbyoptions = ['Default', 'Activity Date', 'Billable', 'Break', 'Client', 'Create Date', 'Created By', 'Duration', 'Employee', 'Endtime', 'Invoice Date', 'Last Modified', 'Last Modified By', 'Location', 'Memo/Description', 'Start Time'];
  // dateRangeOptions = ["All Dates", "Custom", "Today", "This Week", "This Week-To-Date", "This Month", "This-month-to-date", "This Quarter", "This-Quarter-to-Date", "This Year", "This-Year-to-date", "This-Year-to-last-month", "Last Month", "Last Month-to-date", "Last Quarter", "Last Quarter-to-date", "Last Year", "Last Year-to-date", "Since 30 Days Ago", "Since 60 Days Ago", "Since 90 Days Ago", "Since 365 Days Ago", "Next Week", "Next 4 Week", "Next Month", "Next Quarter", "Next Year"];
  // employeeGroupByOptions = ["None", "Client", "Employe", "Product/service", "location", "Day", "Week", "Work Week", "Month", "Quarter", "Year"];

  ngOnInit(): void { }
  constructor() { }

  // toggleStageOpen() {
  //   this.showReportPanel = !this.showReportPanel;
  // }

  toggleSortingOptions(event: Event) {
    event.preventDefault();
    this.showSortingOptions = !this.showSortingOptions;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  toggleNotes() {
    this.showNotes = !this.showNotes;
  }


  getTotalDuration(): string {
    let totalMinutes = 0;

    for (const row of this.tableData) {
      if (row.duration) {
        const durationParts = row.duration.split(':');
        const hours = parseInt(durationParts[0], 10);
        const minutes = parseInt(durationParts[1], 10);
        totalMinutes += hours * 60 + minutes;
      }
    }

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    return `${totalHours}:${remainingMinutes}`;
  }

  tableData = [
    { activeDate: '', client: '', product: '', description: '', rates: '', duration: '', billable: '' },
    { activeDate: '01/01/2024', client: 'I TechSolutions inc,-Abishek....', product: 'Service', description: 'Abhishek Bhimiraj', rates: '74.80', duration: '08:00', billable: 'Yes' },
    { activeDate: '01/01/2024', client: 'I TechSolutions inc,-Abishek....', product: 'Service', description: 'Abhishek Bhimiraj', rates: '74.80', duration: '08:00', billable: 'Yes' },
    { activeDate: '01/01/2024', client: 'I TechSolutions inc,-Abishek....', product: 'Service', description: 'Abhishek Bhimiraj', rates: '74.80', duration: '08:00', billable: 'Yes' },
    { activeDate: '01/01/2024', client: 'I TechSolutions inc,-Abishek....', product: 'Service', description: 'Abhishek Bhimiraj', rates: '74.80', duration: '08:00', billable: 'Yes' },
    { activeDate: '01/01/2024', client: 'I TechSolutions inc,-Abishek....', product: 'Service', description: 'Abhishek Bhimiraj', rates: '74.80', duration: '00:00', billable: 'Yes' },
  ];
}
