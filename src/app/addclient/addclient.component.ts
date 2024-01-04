import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddClientService } from './addclient.component.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.scss'],
  providers: [CookieService, AddClientService, MessageService],
})

export class AddclientComponent implements OnInit {

  addClient: any;
  formData: any;
  Access: boolean = false;
  sendingEmail: boolean = false;
  Notes: string = '';
  requiredDocuments: any[];
  selectedRequiredDocuments: any[] = [];
  filteredRequiredDocuments: any[] = [];
  allclientService: any;
  formBuilder: any;

//dropdowns
  country: string[] = [];
  state: string[] = [];
  city: string[] = [];
  industry: string[] = [];
  clientStatusID: string[] = [];
  clientCategoryID: string[] = [];
  primaryOwner: string[] = [];
  paymentTerms: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AddClientService
  ) {
    const documents = this.requiredDocuments.map(doc => doc.name).join(', ');
    console.log(documents);
  }

  ngOnInit(): void {
    this.addClient = this.fb.group({
      ClientName: ['', [Validators.required, Validators.minLength(3)]],
      ContactNumber: ['', [Validators.required, Validators.maxLength(10)]],
      EmailID: ['', [Validators.required, Validators.email]],
      Address: ['', [Validators.required, Validators.minLength(3)]],
      VMSClientName: [''],
      FederalID: [''],
      ZipCode: [''],
      Website: [''],
      Fax: [''],
      Country: [''],
      State: [''],
      City: [''],
      Industry: [''],
      ClientStatusID: [''],
      ClientCategoryID: [''],
      PrimaryOwner: [''],
      PaymentTerms: [''],
      AboutCompany: [''],
      posting: ['Yes'],
      Access: [''],
      sendingEmail: [''],
    });
  
  }

  
  onRequiredDocumentsSearch(event: any) {
    this.filteredRequiredDocuments = this.requiredDocuments.filter(option =>
      option.name.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  addClientbutton() {
    let Req = {
      ClientName: this.addClient.value.ClientName,
      ContactNumber: this.addClient.value.ContactNumber,
      Website: this.addClient.value.Website,
      Address: this.addClient.value.Address,
      VMSClientName: this.addClient.value.VMSClientName,
      FederalID: this.addClient.value.FederalID,
      ZipCode: this.addClient.value.ZipCode,
      ClientWebsite: this.addClient.value.ClientWebsite,
      Fax: this.addClient.value.Fax,
      Industry: this.addClient.value.Industry,
      Country: this.addClient.value.Country,
      State: this.addClient.value.State,
      City: this.addClient.value.City,
      ClientStatusID: this.addClient.value.ClientStatusID,
      ClientCategoryID: this.addClient.value.ClientCategoryID,
      PrimaryOwner: this.addClient.value.PrimaryOwner,
      PaymentTerms: this.addClient.value.PaymentTerms,
      AboutCompany: this.addClient.value.AboutCompany,
      posting: this.addClient.value.posting,
      sendingEmail: this.addClient.value.sendingEmail,
      Access: this.addClient.value.Access,
      requiredDocuments: this.selectedRequiredDocuments,
      Notes: this.Notes,
    };
    console.log(Req);
    this.service.addClienta(Req).subscribe((x: any) => {
      console.log(x);
    });
  }

  cancel() {
    this.addClient.reset();
    this.selectedRequiredDocuments = [];
    this.Notes = '';
  }
}


