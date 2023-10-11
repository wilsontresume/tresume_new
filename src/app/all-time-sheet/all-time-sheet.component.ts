import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-time-sheet', 
  templateUrl: './all-time-sheet.component.html',
  styleUrls: ['./all-time-sheet.component.scss'] 
})
export class AllTimeSheetComponent implements OnInit { 
  items: any[] = [
    {
      From_Date: 'Date1',
      To_Date: 'Date2',
      Total_Hours: '8',
      Created_On: '2023-10-05',
      Status: 'Approved',
      Comments: 'Sample Comment',
    },
  ];
  showConfirmationDialog: boolean = false;
  sortByColumn: string = '';
  sortDirection: string = 'asc';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.sortBy('From_Date');
    this.sortBy('To_Date');
    this.sortBy('Total_Hours');
    this.sortBy('Created_On');
    this.sortBy('Status');
    this.sortBy('Comments');
    this.sortBy('Details');
  }

  sortBy(columnName: string) {
    if (this.sortByColumn === columnName) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortByColumn = columnName;
      this.sortDirection = 'asc';
    }
    this.items.sort((a, b) => this.sortDirection === 'asc' ? a[columnName].localeCompare(b[columnName]) : b[columnName].localeCompare(a[columnName]));
  }

 
}
