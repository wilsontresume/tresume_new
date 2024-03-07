import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-activity',
  templateUrl: './time-activity.component.html',
  styleUrls: ['./time-activity.component.scss']
})

export class TimeActivityComponent implements OnInit {
  isBillable: boolean = false;
  billableRate: number = 0;
  isBillables: boolean = false;
  billableRates: number = 0; // Initialize to a default value
  time: number = 0; // Initialize to a default value
  billableAmount: number | undefined;
  price: number = 0;
  quantity: number = 1;
  total: number = this.price * this.quantity;

  updateTotal(): void {
    this.total = this.price * this.quantity;
  }

  
  onPriceChange(event: any): void {
    this.price = parseFloat(event.target.value) || 0;
    this.updateTotal();
  }

  onQuantityChange(event: any): void {
    this.quantity = parseFloat(event.target.value) || 0;
    this.updateTotal();
  }

  calculateBillableAmount(): void {
    // Calculate billable amount only if both billableRate and time are provided
    if (this.isBillable && this.billableRate !== undefined && this.time !== undefined) {
      this.billableAmount = this.billableRate * this.time;
    } else {
      // Reset billableAmount if any of the conditions are not met
      this.billableAmount = undefined;
    }
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
