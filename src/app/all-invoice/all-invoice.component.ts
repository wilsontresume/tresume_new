import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-all-invoice',
  templateUrl: './all-invoice.component.html',
  styleUrls: ['./all-invoice.component.scss']
})
export class AllInvoiceComponent implements OnInit {

  handlePrint() {
    // Add your print functionality here
    console.log("Print icon clicked");
  }

  handleFileUpload() {
    // Add your file upload functionality here
    console.log("File upload icon clicked");
  }

  openSettings() {
    // Add your settings functionality here
    console.log("Settings icon clicked");
  }


feedbackWithIcon() {
throw new Error('Method not implemented.');
}

provideFeedback: any;
closeModal() {
throw new Error('Method not implemented.');
}

 selectedType: string;
  showTable: boolean = false;

  viewRecurringTemplates() {
    this.showTable = true;
   
  }   
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  activeTab: string = 'allinvoices';
  showCustomDateModel: boolean = false;
  startDate: string = '';
  endDate: string = '';

  toggleCustomDateModel() {
    this.showCustomDateModel = !this.showCustomDateModel;
  }

  resetDates() {  
    this.startDate = '';  
    this.endDate = '';
  }

  applyDates() {

    console.log('Start Date:', this.startDate);
    console.log('End Date:', this.endDate);

  }

 
  }






