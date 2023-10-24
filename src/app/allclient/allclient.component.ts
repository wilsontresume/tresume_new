import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allclient',
  templateUrl: './allclient.component.html',
  styleUrls: ['./allclient.component.scss']
})
export class AllclientComponent implements OnInit {
  
  showConfirmationDialog: boolean = false;
  sortByColumn: string = '';
  sortDirection: string = 'asc';
  
  clients: any[] = [
    {
      clientName: 'client A',
      EmailID: 'client_a@example.com',
      Website: 'www.client_a.com',
      Owner: 'John Doe',
    },
    {
      clientName: 'client A',
      EmailID: 'client_a@example.com',
      Website: 'www.client_a.com',
      Owner: 'John Doe',
    },
  ];
 
ngOnInit(): void {
    this.sortBy('clientName');
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
   this.clients.sort((a, b) => this.sortDirection === 'asc' ? a[columnName].localeCompare(b[columnName]) : b[columnName].localeCompare(a[columnName]));
  }

  deleteclient(){
    this.showConfirmationDialog = true;
   }
   confirmDelete() {
    const index = 1; 
    if (index >= 0 && index < this.clients.length) {
      this.clients.splice(index, 1);
    }
    this.showConfirmationDialog = false;
  }
    

  cancelDelete() {
    
    this.showConfirmationDialog = false;
  }
}
