import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AllInvoiceService } from './all-invoice.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-all-invoice',
  templateUrl: './all-invoice.component.html',
  styleUrls: ['./all-invoice.component.scss'],
  providers: [ CookieService, AllInvoiceService, MessageService],

})
export class AllInvoiceComponent implements OnInit {
  @Output() confirmed = new EventEmitter<boolean>();
   @Output() modalClosed = new EventEmitter<void>();
  makeInactiveModal: any;
isModal3Open: any;
// openMakeInactiveModal: any;
deleteAction() {
throw new Error('Method not implemented.');
}

  isRowSelected = false;
  isContentVisible = false;
  showContent1 = false;
  showContent2 = false;
  isModalOpen = false;
  shareLink = '';
  row: any;


openModal1() {
  // Show the modal and overlay
  this.isModalOpen = true;
}

openModal(event: Event) {
  // Prevent the default behavior of the anchor link
  event.preventDefault();

  // Show the modal by manipulating the DOM directly
  const modalElement = document.getElementById('myModal');
  if (modalElement) {
    modalElement.classList.add('show');
    modalElement.style.display = 'block';
  }
}

closeModal4() {
  // Close the modal by manipulating the DOM directly
  const modalElement = document.getElementById('myModal');
  if (modalElement) {
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
  }
}


confirmDelete() {
  this.confirmed.emit(true);
}

cancelDelete() {
  this.confirmed.emit(false);
}

  Clients: any[] = [];

  duplicateActions(): void {
    // Your delete logic here
    console.log('Deleting...');
  }

  uploadFile(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
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
    private Service: AllInvoiceService,

  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
    this.fetchClients();
  }

  fetchClients(){
    let Req = {
      // traineeID: this.TraineeID,
      // timesheetrole:this.timesheetrole
    };
    this.Service.getClientDropdowns(Req).subscribe((x: any) => {
        this.Clients = x.result;
      },
      (error) => {
        console.error('Error fetching dropdown options:', error);
      }
    );
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






