import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-all-invoice',
  templateUrl: './all-invoice.component.html',
  styleUrls: ['./all-invoice.component.scss']
})
export class AllInvoiceComponent implements OnInit {

  isRowSelected: boolean = false;

  onRowHover(event: MouseEvent): void {
    this.isRowSelected = true;
  }

  onRowOut(event: MouseEvent): void {
    this.isRowSelected = false;
  }


  
showModal: any;

closeModal2() {
  this.showModal = false;
} 
  

  paymentReceivedAction() {
    console.log('Payment Received');
  }

  duplicateAction() {
    console.log('Duplicate');
  }

  sendAction() {
    console.log('Send');
  }

  handlePrint() {
    console.log("Print icon clicked");
  }

  handleFileUpload() {
    console.log("File upload icon clicked");
  }

  openSettings() {
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
  constructor(
    private dialog: MatDialog,
    
    
    
    
    ) {}
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






