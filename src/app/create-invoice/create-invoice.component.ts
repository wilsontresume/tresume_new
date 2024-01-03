import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
submitForm() {
throw new Error('Method not implemented.');
}
  showPopup: boolean = false;

  togglePopup(event: Event): void {
    event.preventDefault(); // Prevent the default link behavior
    this.showPopup = !this.showPopup;
  }

  closePopup(): void {
    this.showPopup = false;
  }
addRow() {
throw new Error('Method not implemented.');
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
  }

}
