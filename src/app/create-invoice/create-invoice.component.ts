import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { CreateInvoiceService } from './create-invoice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
  providers: [CookieService, CreateInvoiceService, MessageService],

})
export class CreateInvoiceComponent implements OnInit {

  loading: boolean = false;
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
  clientEmail: any;
  billingAddress: any;
  invoiceDate: any;
  dueDate: any;
  selectedTerm: any;
  invoiceNo: any;
  routeType: any;

  ngOnInit(): void {
    this.OrgID = this.cookieService.get('OrgID');
    this.TraineeID = this.cookieService.get('TraineeID');
    this.getState();
    this.fetchclientlist();
  }

  constructor(private messageService: MessageService, private cookieService: CookieService, private Service: CreateInvoiceService, private router: Router, private route: ActivatedRoute) {

    this.OrgID = this.cookieService.get('OrgID');    
    this.routeType = this.route.snapshot.params["routeType"];
    this.addDefaultRows(2);
  }

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

  fetchclientlist() {
    let Req = {
      TraineeID: this.TraineeID,
    };
    this.Service.getTraineeClientList(Req).subscribe((x: any) => {
      this.clients = x.result;
      this.loading = false;
    });
  }
  
  addinvoice() {
    this.loading = true;
    let Req = {
      client: this.ClientName,
      clientEmail: this.clientEmail,
      billingAddress: this.billingAddress,
      invoiceDate: this.invoiceDate,
      dueDate: this.dueDate,
      terms: this.selectedTerm,
      invoiceNo: this.invoiceNo,
      state: this.state,
    };
    console.log(Req);
    this.Service.createInvoice(Req).subscribe(
      (x: any) => {
        this.handleSuccess(x);
        this.loading = false;
      },
      (error: any) => {
        this.handleError(error);
        this.loading = false;
      }
    );
  }
  private handleSuccess(response: any): void {
    this.messageService.add({ severity: 'success', summary: response.message });
    console.log(response);
    this.loading = false;
    this.router.navigate(['/all-invoice/'+this.routeType]);
  }
  
  private handleError(error: any): void {
    let errorMessage = 'An error occurred';
    if (error.error && error.error.message) {
      errorMessage = error.error.message; 
    }
    this.messageService.add({ severity: 'error', summary: errorMessage });
    console.error('Error occurred:', error);
    this.loading = false;
  }
  
}