import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { CreateInvoiceService } from './create-invoice.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
  providers: [CookieService, CreateInvoiceService, MessageService],

})
export class CreateInvoiceComponent implements OnInit {

  TraineeID: any;
  OrgID: string = '';
  showPopup: boolean = false;
  showConfirmationDialog2: any;
  showConfirmationDialog: any;
  showConfirmationModal: boolean = false;
  showModal: boolean = false;
  previousOption: string = '';
  clients: any;
  ClientName: any;
  state: any;
  files: File[] = [];
  invoiceLines: any[] = [];
  selectedRowIndex: number | null = null;
  subtotal: number = 0;
  total: number = 0;



  lines = [
    { qty: 1, rate: 10, editable: false, amount: 0 },
    { qty: 2, rate: 15, editable: false, amount: 0 },
    // Add more lines as needed
  ];

  

  toggleEditable(index: number) {
    if (this.selectedRowIndex !== null) {
      this.invoiceLines[this.selectedRowIndex].editable = false;
    }
    this.selectedRowIndex = index;
    this.invoiceLines[index].editable = true;
  }

  addDefaultRows(count: number) {
    for (let i = 0; i < count; i++) {
      this.addLine();
    }
  }

  addLine() {
    this.invoiceLines.push({
      sno: '',
      serviceDate: '',
      productService: '',
      description: '',
      qty: 0,
      rate: 0,
      // attachment: '' // Uncomment if needed
    });
  }

  removeLine(index: number) {
    this.invoiceLines.splice(index, 1);
  }

  clearLines() {
    this.invoiceLines = [];
    // Add 2 default rows after clearing
    this.addDefaultRows(2);
  } 
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  maxSize: number = 20; // Maximum file size in MB

  onFilesSelected(event: any) {
    const fileList: FileList | null = event.target.files;
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        this.files.push(fileList[i]);
      }
    }
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  uploadFiles() {
    for (let i = 0; i < this.files.length; i++) {
      const fileSizeMB = this.files[i].size / (1024 * 1024);
      if (fileSizeMB > this.maxSize) {
        alert("Please upload a file with a size less than " + this.maxSize + " MB.");
        return;
      }
    }

    // Handle file upload logic here
    console.log('Uploading files:', this.files);
    // You can implement file upload logic using services or APIs here
  }
  ngOnInit(): void {
    this.OrgID = this.cookieService.get('OrgID');
    this.fetchclientlist();
    this.getClientName();
    this.getState();
  }

  constructor(private messageService: MessageService, private cookieService: CookieService,private Service: CreateInvoiceService ) {    
    this.OrgID = this.cookieService.get('OrgID');
    
    this.addDefaultRows(2);}

  onOptionChanges(event: any) {
    this.previousOption = this.selectedOption;
    this.selectedOption = event.target.value;
  }

  goToPreviousOption() {
    if (this.previousOption === 'example1' || this.previousOption === 'example2') {
      this.selectedOption = this.previousOption;
      this.selectedOption = 'example1';
    }
  }
  selectedFilter: string = '';

  onFilterChanges(value: string) {
    this.selectedFilter = value;
  }

  onOptionChange(event: any) {
    this.selectedOption = event.target.value;
    if (this.selectedOption === 'example2') {
    } else {
    }
  }

  addAll() {
  }


  onDropdownChange(event: any) {
    if (event.target.value === 'addNew') {
      this.showModal = true;
    }
  }


  closeModal2() {
    this.showModal = false;
  }


  confirmDelete() {
    this.showConfirmationModal = true;
  }

  deleteItems() {
    console.log("Item deleted!");

    this.closeModal();
  }

  closeModal1() {
    this.showConfirmationModal = false;
  }

  togglePopup(event: Event): void {
    event.preventDefault();
    this.showPopup = !this.showPopup;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  selectedOption: string = '';
  showAdditionalInputs: boolean = false;
  showButtons: any;

  onFilterChange(value: string) {
    this.selectedOption = value;
    this.showAdditionalInputs = this.selectedOption === 'option3';
    console.log('Selected Option:', this.selectedOption);
    console.log('showAdditionalInputs:', this.showAdditionalInputs);
  }

  fetchclientlist() {
    let Req = {
      TraineeID: this.TraineeID,
      OrgID: this.OrgID,
    };
    this.Service.getTimesheetClientList(Req).subscribe((x: any) => {
      this.clients = x.result;
      console.log(this.clients);
    });
  }


  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];

  selectedItem: any;

  openDeleteModal(item: any) {
    this.selectedItem = item;
  }

  deleteItem() {
    console.log('Deleting item:', this.selectedItem);
    this.closeModal();
  }

  closeModal() {
    this.selectedItem = null;
  }

  getClientName() {
    let Req = {
      TraineeID: this.TraineeID,
    };
    this.Service.getTraineeClientList(Req).subscribe((x: any) => {
      this.ClientName = x.result;
    });
  }

  getState() {
    let req = {
      OrgID: this.OrgID,
    };
    this.Service.getLocationList(req).subscribe((x: any) => {
      this.state = x.result;
    });
  }
  
  getDropdownOption() {
    return this.state; // Use this.state instead of this.city
  }
  
  onDropdownChanges(selectedOption: any, row: any) {
    row.location = selectedOption.city;
  }
}