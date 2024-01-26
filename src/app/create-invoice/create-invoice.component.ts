import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
  cookieService: any;
  TraineeID: any;
  service: any;
  clients: any;

OrgID: string = '';
showPopup: boolean = false;
showConfirmationDialog2: any;
showConfirmationDialog: any;
showConfirmationModal: boolean = false;


showModal: boolean = false;




previousOption: string = '';

onOptionChanges(event: any) {
  this.previousOption = this.selectedOption;
  this.selectedOption = event.target.value;
}

goToPreviousOption() {
  if (this.previousOption === 'example1' || this.previousOption === 'example2') {
    this.selectedOption = this.previousOption;
    this.selectedOption = 'example1';}
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
  constructor() { }

  
  onFilterChange(value: string) {
    this.selectedOption = value;
    this.showAdditionalInputs = this.selectedOption === 'option3'; 
    console.log('Selected Option:', this.selectedOption);
    console.log('showAdditionalInputs:', this.showAdditionalInputs);
  }
  ngOnInit(): void {
    this.OrgID= this.cookieService.get('OrgID');
    this.fetchclientlist();
    
  }
  fetchclientlist() {
    let Req = {
      TraineeID: this.TraineeID,
      OrgID: this.OrgID,
    };
    this.service.getTimesheetClientList(Req).subscribe((x: any) => {
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
}