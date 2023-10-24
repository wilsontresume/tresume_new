import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  showConfirmationDialog: boolean = false;
  sortByColumn: string = '';
  sortDirection: string = 'asc';
  
  vendors: any[] = [
    {
      VendorName: 'vendor A',
      EmailID: 'vendor_a@example.com',
      Website: 'www.vendor_a.com',
      Owner: 'John Doe',
    },
    {
      VendorName: 'vendor A',
      EmailID: 'vendor_a@example.com',
      Website: 'www.vendor_a.com',
      Owner: 'John Doe',
    },
  ];
 
ngOnInit(): void {
    this.sortBy('vendorName');
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
   this.vendors.sort((a, b) => this.sortDirection === 'asc' ? a[columnName].localeCompare(b[columnName]) : b[columnName].localeCompare(a[columnName]));
  }

  deletevendor(){
    this.showConfirmationDialog = true;
   }
   confirmDelete() {
    const index = 1; 
    if (index >= 0 && index < this.vendors.length) {
      this.vendors.splice(index, 1);
    }
    this.showConfirmationDialog = false;
  }
    

  cancelDelete() {
    
    this.showConfirmationDialog = false;
  }
}
