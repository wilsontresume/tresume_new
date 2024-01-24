import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-viewclient',
  templateUrl: './viewclient.component.html',
  styleUrls: ['./viewclient.component.scss']
})
export class ViewclientComponent implements OnInit {
  loading:boolean = false;

  content: string = '';
  clients: any[] = [
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
  Ownership: any[]=[{name:'Parvathy'}, {name:'abc'}, {name:'DEF'}, {name:'def'}];
  selectedOwnership: any[] = [];
  filteredOwnership: any[] = [];
  clientLeads: any[] ;
  requiredDocuments: any[] ;
  selectedClientLeads: any[] = [];
  selectedRequiredDocuments: any[] = [];
  filteredClientLeads: any[] = [];
  filteredRequiredDocuments: any[] = [];

  onClientLeadsSearch(event: any) {
    this.filteredClientLeads = this.clientLeads.filter(option =>
      option.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  onRequiredDocumentsSearch(event: any) {
    this.filteredRequiredDocuments = this.requiredDocuments.filter(option =>
      option.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  onOwnershipSearch(event: any) {
    this.filteredOwnership = this.Ownership.filter(option =>
      option.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  constructor(private router: Router) {
    this.clientLeads = [{name:'Lead 1'}, {name:'Lead 2'}, {name:'Lead 3'}, {name:'Lead 4'}];
    this.requiredDocuments = [{name:'Document 1'}, {name:'Document 2'}, {name:'Document 3'}, {name:'Document 4'}];
  }

  ngOnInit(): void {
    this.sortBy('ClientName');
    this.sortBy('EmailID');
    this.sortBy('Designation');
    this.sortBy('Owner');
    this.sortBy('Action');
  }

  editing: boolean = false;

  enableEditing() {
    this.editing = true;
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

}
