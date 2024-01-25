import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-time-sheet-report',
  templateUrl: './new-time-sheet-report.component.html',
  styleUrls: ['./new-time-sheet-report.component.scss']
})
export class NewTimeSheetReportComponent implements OnInit {

sort_mode: any;
sortOptionsList: any;
showIcon = false;


sortGrid() {
throw new Error('Method not implemented.');
}
sort_by: any;
isEditEnabled = false;

toggleEdit() {
  this.isEditEnabled = !this.isEditEnabled;
}

  constructor() { }
  dateRangeOptions = ["All Dates", "Today", "This Week", "This Week-To-Date", "This Month", "This-to-month", "This Quarter", "This-Quarter-to-Date", "This Year", "This-Year-To-Date"];
  employeeGroupByOptions = ["None", "Client", "Employe", "Product/service", "location", "Day", "Week", "Work Week","Month","Quarter","Year"];

  ngOnInit(): void {
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
