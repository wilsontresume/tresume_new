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

  // navigateToviewclient(clientId: number, event: Event) {
  //   this.router.navigate(['/viewclient', clientId]);
  //   event.preventDefault();
  // }

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
