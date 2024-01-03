import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
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
