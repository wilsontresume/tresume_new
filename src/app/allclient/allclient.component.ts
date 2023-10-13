import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allclient',
  templateUrl: './allclient.component.html',
  styleUrls: ['./allclient.component.scss']
})
export class AllclientComponent implements OnInit {
  items: any[] = [
    {
      clientName: 'Client A',
      EmailID: 'clienta@example.com',
      Website: 'www.clienta.com',
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
    this.sortBy('Website');
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

  deleteClient(){
    this.showConfirmationDialog = true;
   }
   confirmDelete() {
   
    this.showConfirmationDialog = false;
  }

  cancelDelete() {
    
    this.showConfirmationDialog = false;
  }
}
