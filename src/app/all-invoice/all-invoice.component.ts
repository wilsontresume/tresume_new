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
  selectedClient: string = '';
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


  constructor(
    private dialog: MatDialog,
    private Service: AllInvoiceService,

  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
    // this.fetchClients();
    // this.fetchBatchactions();
  }

  Clients: any[] = [];

  fetchClients(){
    let Req = {
      // traineeID: this.TraineeID
    };
    this.Service.getClientDropdowns(Req).subscribe((x: any) => {
        this.Clients = x.result;
      },
      (error) => {
        console.error('Error fetching dropdown options:', error);
      }
    );
  }


  BatchOptions: any[]=[];

  fetchBatchactions(){
    let Req = {
      // traineeID: this.TraineeID
    };
    this.Service.getBatchActions(Req).subscribe((x: any) => {
        this.BatchOptions = x.result;
      },
      (error) => {
        console.error('Error fetching dropdown options:', error);
      }
    );
  }

  invoiceTypes: any[]=[];

  fetchInvoiceTypes(){
    let Req = {
      // traineeID: this.TraineeID
    };
    this.Service.getInvoiceTypes(Req).subscribe((x: any) => {
        this.invoiceTypes = x.result;
      },
      (error) => {
        console.error('Error fetching dropdown options:', error);
      }
    );
  }

  invoiceStatus: any[] =[];
  fetchInvoiceStatus(){
    let Req = {
      // traineeID: this.TraineeID
    };
    this.Service.getInvoiceStatus(Req).subscribe((x: any) => {
        this.invoiceStatus = x.result;
      },
      (error) => {
        console.error('Error fetching dropdown options:', error);
      }
    );
  }

//   newTransaction: any[] = ['abc','bca'];
//  fetchNewTransaction(){
//     let Req = {
//       // traineeID: this.TraineeID
//     };
//     this.Service.getNewTransaction(Req).subscribe((x: any) => {
//         this.invoiceStatus = x.result;
//       },
//       (error) => {
//         console.error('Error fetching dropdown options:', error);
//       }
//     );
//   }
 
  title: string = '';
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  suffix: string = '';
  companyName: string = '';
  clients: any[] = [];

  email: string = '';
  phoneNumber: string = '';
  mobileNumber: string = '';
  fax: string = '';
  other: string = '';
  website: string = '';
  nameToPrint: string = '';
  isSubClient: boolean = false;

  saveFormData(){
    console.log(`
      Title: ${this.title}
      First Name: ${this.firstName}
      Middle Name: ${this.middleName}
      Suffix: ${this.suffix}
      Company Name: ${this.companyName}
      Selected Client: ${this.selectedClient}
      Email: ${this.email}
      Phone Number: ${this.phoneNumber}
      Mobile Number: ${this.mobileNumber}
      Fax: ${this.fax}
      Other: ${this.other}
      Website: ${this.website}
      Name to Print: ${this.nameToPrint}
      Is Sub Client: ${this.isSubClient}
    `);
  }

// formDataArray: any[] = [];
// saveFormData() {
//   const formDataObject = {
//     Title: this.title,
//     FirstName: this.firstName,
//     MiddleName: this.middleName,
//     Suffix: this.suffix,
//     CompanyName: this.companyName,
//     SelectedClient: this.selectedClient,
//     Email: this.email,
//     PhoneNumber: this.phoneNumber,
//     MobileNumber: this.mobileNumber,
//     Fax: this.fax,
//     Other: this.other,
//     Website: this.website,
//     NameToPrint: this.nameToPrint,
//     IsSubClient: this.isSubClient
//   };

//   this.formDataArray.push(formDataObject);

//   console.log("Name and Content:", this.formDataArray);
// }

}






