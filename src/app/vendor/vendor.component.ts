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

  indexMsg: String;
  deleteIndex: number;
  showConfirmationDialog: boolean = false;
  sortByColumn: string = '';
  sortDirection: string = 'asc';
  userName: string = '';
  TraineeID: string = '';
  vendors: any[];

  vendor1 = [
    { id: 1, vendorName: 'vendor A', EmailID: 'vendor_a@example.com', Website: 'www.vendor_a.com', Owner: 'John Doe', },
    { id: 2, vendorName: 'vendor A', EmailID: 'vendor_a@example.com', Website: 'www.vendor_a.com', Owner: 'John Doe', },
  ];

  constructor(private fb: FormBuilder, private cookieService: CookieService, private service: VendorService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.userName = this.cookieService.get('userName1');
    this.TraineeID = this.cookieService.get('TraineeID');
    this.fetchuserlist();
  }

  ngOnChanges(): void {
    // this.fetchuserlist();
  }


  fetchuserlist() {
    let Req = {
      TraineeID: this.TraineeID,
    };
    this.service.getTraineeVendorList(Req).subscribe((x: any) => {
      this.vendors = x.result;
    });
  }


  deletevendor(TraineeID: number) {
    this.deleteIndex = TraineeID;
    this.showConfirmationDialog = true;
  }


  confirmDelete() {
    console.log(this.deleteIndex);
    let Req = {
      TraineeID: this.deleteIndex,
    };
    this.service.deleteVendorAccount(Req).subscribe((x: any) => {
      var flag = x.flag;
      this.fetchuserlist();
      if (flag === 1) {
        this.messageService.add({
          severity: 'success',
          summary: 'User Account Deleted Sucessfully',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Please try again later',
        });
      }

    });
    this.indexMsg = "";
    this.showConfirmationDialog = false;
  }


  cancelDelete() {
    console.log(this.showConfirmationDialog);
    this.indexMsg = "";
    this.showConfirmationDialog = false;
  }
}
