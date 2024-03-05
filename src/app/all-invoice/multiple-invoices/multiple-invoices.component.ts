import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-invoices',
  templateUrl: './multiple-invoices.component.html',
  styleUrls: ['./multiple-invoices.component.scss']
})
export class MultipleInvoicesComponent implements OnInit {
  invoiceData: any[] = [
    { description: 'Invoice # 91047 (12/14/23)', dueDate: new Date('2024-01-11'), originalAmount: 1920.00, openBalance: 1920.00, paymentAmount: 0, selected: false },
    { description: 'Invoice # 91048 (12/15/23)', dueDate: new Date('2024-01-15'), originalAmount: 1500.00, openBalance: 1500.00, paymentAmount: 0, selected: false },
    { description: 'Invoice # 91049 (12/16/23)', dueDate: new Date('2024-01-18'), originalAmount: 2200.00, openBalance: 2200.00, paymentAmount: 0, selected: false },
    { description: 'Invoice # 91049 (12/16/23)', dueDate: new Date('2024-01-18'), originalAmount: 2200.00, openBalance: 2200.00, paymentAmount: 0, selected: false },
    { description: 'Invoice # 91049 (12/16/23)', dueDate: new Date('2024-01-18'), originalAmount: 2200.00, openBalance: 2200.00, paymentAmount: 0, selected: false },
    { description: 'Invoice # 91049 (12/16/23)', dueDate: new Date('2024-01-18'), originalAmount: 2200.00, openBalance: 2200.00, paymentAmount: 0, selected: false },
    { description: 'Invoice # 91049 (12/16/23)', dueDate: new Date('2024-01-18'), originalAmount: 2200.00, openBalance: 2200.00, paymentAmount: 0, selected: false },
    // Add more data as needed...
  ];
 // Assuming this is your existing data array

  // Generate S/NO values based on the length of invoiceData
  snoArray: number[] = Array.from({ length: this.invoiceData.length }, (_, index) => index + 1);

i: any;
item: any;
  constructor() { }

  ngOnInit(): void {
  }

}
