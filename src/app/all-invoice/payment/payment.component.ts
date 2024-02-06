import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  invoiceData: any[] = [
    { description: 'Invoice # 91047 (12/14/23)', dueDate: new Date('2024-01-11'), originalAmount: 1920.00, openBalance: 1920.00, paymentAmount: 0, selected: false },
    { description: 'Invoice # 91048 (12/15/23)', dueDate: new Date('2024-01-15'), originalAmount: 1500.00, openBalance: 1500.00, paymentAmount: 0, selected: false },
    { description: 'Invoice # 91049 (12/16/23)', dueDate: new Date('2024-01-18'), originalAmount: 2200.00, openBalance: 2200.00, paymentAmount: 0, selected: false },
    { description: 'Invoice # 91049 (12/16/23)', dueDate: new Date('2024-01-18'), originalAmount: 2200.00, openBalance: 2200.00, paymentAmount: 0, selected: false },
    { description: 'Invoice # 91049 (12/16/23)', dueDate: new Date('2024-01-18'), originalAmount: 2200.00, openBalance: 2200.00, paymentAmount: 0, selected: false },
    { description: 'Invoice # 91049 (12/16/23)', dueDate: new Date('2024-01-18'), originalAmount: 2200.00, openBalance: 2200.00, paymentAmount: 0, selected: false },
    { description: 'Invoice # 91049 (12/16/23)', dueDate: new Date('2024-01-18'), originalAmount: 2200.00, openBalance: 2200.00, paymentAmount: 0, selected: false },
  ];
  constructor() {}
  ngOnInit(): void {
  }
}
