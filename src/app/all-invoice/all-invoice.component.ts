import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-all-invoice',
  templateUrl: './all-invoice.component.html',
  styleUrls: ['./all-invoice.component.scss']
  
})
export class AllInvoiceComponent implements OnInit {

  isRowSelected = false;
  isContentVisible = false;
  showContent1 = false;
  showContent2 = false;

  isModalOpen = false;
  shareLink = '';
row: any;
  
uploadFile(event: any): void {
  const fileList: FileList = event.target.files;
  if (fileList.length > 0) {
    const file: File = fileList[0];
    // You can perform further actions with the uploaded file
    console.log('File uploaded:', file);
  }
}
selectDocument(event: Event): void {
  event.preventDefault();
  document.getElementById('uploadInput')?.click();
}

  openShareLinkModal(event: Event): void {
    event.preventDefault();
    this.shareLink = 'Your generated link';
    this.isModalOpen = true;
  }

  closeModals(): void {
    this.isModalOpen = false;
  }

  copyLink(): void {
    console.log('Copy Link logic');
  }

  save(): void {
    console.log('Save logic');
  }
  toggleContent(dropdown: string) {
    if (dropdown === 'dropdown1') {
      this.showContent1 = !this.showContent1;
    } else if (dropdown === 'dropdown2') {
      this.showContent2 = !this.showContent2;
    }
  }

  
  toggleContentVisibility() {
    this.isContentVisible = !this.isContentVisible;
  }
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






