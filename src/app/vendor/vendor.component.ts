import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { VendorService } from './vendor.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  providers: [CookieService, VendorService, MessageService],
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  
  loading:boolean = false;
  deleteIndex: number;
  showConfirmationDialog: boolean = false;
  TraineeID: string = '';
  vendors: any[];
  noResultsFound:boolean = true;

  constructor(private fb: FormBuilder, private cookieService: CookieService, private service: VendorService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.TraineeID = this.cookieService.get('TraineeID');
    this.fetchvendorlist();
  }

  ngOnChanges(): void {
    // this.fetchvendorlist();
  }


  fetchvendorlist() {
    let Req = {
      TraineeID: this.TraineeID,
    };
    this.service.getTraineeVendorList(Req).subscribe((x: any) => {
      this.vendors = x.result;
      this.noResultsFound = this.vendors.length === 0;
    });
  }


  deletevendor(VendorID: number) {
    this.deleteIndex = VendorID;
    console.log(this.deleteIndex);
    this.showConfirmationDialog = true;
  }


  confirmDelete() {
    console.log(this.deleteIndex);
    let Req = {
      VendorID: this.deleteIndex,
    };
    this.service.deleteVendorAccount(Req).subscribe((x: any) => {
      var flag = x.flag;
      this.fetchvendorlist();
      if (flag === 1) {
        this.messageService.add({
          severity: 'success',
          summary: 'Vendor Deleted Sucessfully',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Please try again later',
        });
      }

    });
    this.showConfirmationDialog = false;
  }

  cancelDelete() {
    console.log(this.showConfirmationDialog);
    this.showConfirmationDialog = false;
  }

  searchInput: string = '';

  isVendorVisible(vendor: any): boolean {
    const searchValue = this.searchInput.toLowerCase();
    return (
      vendor.emailid.toLowerCase().includes(searchValue) ||
      vendor.vendorname.toLowerCase().includes(searchValue)
    );
  }
}
