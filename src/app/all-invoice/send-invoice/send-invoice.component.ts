import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-invoice',
  templateUrl: './send-invoice.component.html',
  styleUrls: ['./send-invoice.component.scss']
})
export class SendInvoiceComponent implements OnInit {
  showPopup: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  selectFile(inputId: string): void {
    document.getElementById(inputId)?.click();
  }

  handleFileChange(event: any): void {
    // Handle the file change event here
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
  }
  togglePopup(event: Event): void {
    event.preventDefault();
    this.showPopup = !this.showPopup;
  }

  closePopup(): void {
    this.showPopup = false;
  }

}
