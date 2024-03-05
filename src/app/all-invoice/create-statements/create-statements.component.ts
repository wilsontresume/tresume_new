import { Component, ElementRef, OnInit } from '@angular/core';
declare var $: any; 
@Component({
  selector: 'app-create-statements',
  templateUrl: './create-statements.component.html',
  styleUrls: ['./create-statements.component.scss']
})
export class CreateStatementsComponent implements OnInit {
  showInfo = false;
  startDate: string = '';
  endDate: string = '';
  showHiddenContent: boolean = false;
  balanceAmount: number = -69384.55;
  tableData = [
    { checkbox: false, recipients: 'Tek System Inc', emailAddress: '', balance: this.balanceAmount }
    // Add more data rows as needed
  ];
  applyChanges() {
    // Check if both start and end dates are selected
    if (this.startDate && this.endDate) {
      // Perform any logic you need with the selected dates
      // For demonstration purposes, we're just toggling the visibility of hidden content
      this.showHiddenContent = !this.showHiddenContent;
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    // Initialize Bootstrap tooltips in the ngAfterViewInit lifecycle hook
    $(this.elementRef.nativeElement).find('[data-toggle="tooltip"]').tooltip();
  }  ngOnInit(): void {
  }

}
