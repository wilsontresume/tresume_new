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




confirmDelete() {
  this.showConfirmationModal = true;
}

deleteItems() {
  // Simulating deletion with a log message
  console.log("Item deleted!"); // Replace this with your actual deletion logic

  // Close the modal after successful deletion (in a real scenario, this would be after deletion request/response)
  this.closeModal();
}

closeModal1() {
  this.showConfirmationModal = false;
}

  togglePopup(event: Event): void {
    event.preventDefault(); // Prevent the default link behavior
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
    this.showAdditionalInputs = this.selectedOption === 'option3'; // Update the condition here
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
    // Add more items as needed
  ];

  selectedItem: any; // To store the item to be deleted

  openDeleteModal(item: any) {
    this.selectedItem = item; // Store the item to be deleted
  }

  deleteItem() {
    // Implement your delete logic here using this.selectedItem.id
    // Once deleted, remove the item from the items array or perform necessary actions
    console.log('Deleting item:', this.selectedItem);
    // Example: this.items = this.items.filter(item => item.id !== this.selectedItem.id);
    this.closeModal(); // Close the modal after deletion
  }

  closeModal() {
    this.selectedItem = null; // Clear the selectedItem
  }
}