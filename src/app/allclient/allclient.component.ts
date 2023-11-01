import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AllClientService } from './allclient.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allclient',
  templateUrl: './allclient.component.html',
  providers: [CookieService, AllClientService, MessageService],
  styleUrls: ['./allclient.component.scss']
})
export class AllclientComponent implements OnInit {

  deleteIndex: number;
  showConfirmationDialog: boolean = false;
  TraineeID: string = '';
  clients: any[];
  noResultsFound: boolean = false;


  // client1 = [
  //   { id: 1, ClientName: 'client A', EmailID: 'client_a@example.com', Website: 'www.client_a.com', PrimaryOwner: 'John Doe', },
  //   { id: 2, clientName: 'client A', EmailID: 'client_a@example.com', Website: 'www.client_a.com', PrimaryOwner: 'John Doe', },
  // ];

  constructor(private fb: FormBuilder, private cookieService: CookieService, private service: AllClientService, private messageService: MessageService) {

  }
  
  ngOnInit(): void {
    this.TraineeID = this.cookieService.get('TraineeID');
    this.fetchclientlist();
  }

  ngOnChanges(): void {
    // this.fetchclientlist();
  }


  fetchclientlist() {
    let Req = {
      TraineeID: this.TraineeID,
    };
    this.service.getTraineeClientList(Req).subscribe((x: any) => {
      this.clients = x.result;
      this.noResultsFound = this.clients.length === 0;
    });
  }
  

  deleteclient(ClientID: number) {
    this.deleteIndex = ClientID;
    console.log(this.deleteIndex);
    this.showConfirmationDialog = true;
  }


  confirmDelete() {
    console.log(this.deleteIndex);
    let Req = {
      ClientID: this.deleteIndex,
    };
    this.service.deleteClientAccount(Req).subscribe((x: any) => {
      var flag = x.flag;
      this.fetchclientlist();
      if (flag === 1) {
        this.messageService.add({
          severity: 'success',
          summary: 'Client Deleted Sucessfully',
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
}
