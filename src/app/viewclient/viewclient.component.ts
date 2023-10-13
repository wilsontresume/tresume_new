import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewclient', 
  templateUrl: './viewclient.component.html', 
  styleUrls: ['./viewclient.component.scss'] 
})
export class ViewclientComponent implements OnInit { 
  content: string = '';
  items: any[] = [
    {
      clientName: 'Client A',
      EmailID: 'clienta@example.com',
      Designation: 'Director',
      Owner: 'John Doe',
    },
  ];
  showConfirmationDialog: boolean = false;
  sortByColumn: string = '';
  sortDirection: string = 'asc';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.sortBy('ClientName');
    this.sortBy('EmailID');
    this.sortBy('Designation');
    this.sortBy('Owner');
    this.sortBy('Action');
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
