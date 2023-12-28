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
  onKeyPress($event: any) {
    throw new Error('Method not implemented.');
  }
  customCheck1:boolean=false;
  customCheck:boolean=false;
  content: string = '';
  activeTab: string = 'basicInfo';
  selectedOwnership: any[] = [];
  filteredOwnership: any[] = [];
  clientLeads: any[];
  Ownership: any[];
  requiredDocuments: any[];
  selectedClientLeads: any[] = [];
  selectedRequiredDocuments: any[] = [];
  filteredClientLeads: any[] = [];
  filteredRequiredDocuments: any[] = [];
  allclientService: any;
  formBuilder: any;

  ngOnInit(): void {
    this.addClient = this.fb.group({
      ClientName: ['', [Validators.required, Validators.minLength(3)]],
      ContactNumber: ['', [Validators.required, Validators.maxLength(10)]],
      ClientEmailID: ['', [Validators.required, Validators.email]],
      Address: ['', [Validators.required, Validators.minLength(3)]],
      VMSClientName: [''],
      FederalID: [''],
      ZipCode: [''],
      ClientWebsite: [''],
      Fax: [''],
      Country: ['United States'],
      State: [''],
      City: [''],
      Industry: [''],
      ClientStatus: [''],
      ClientCategory: [''],
      PrimaryOwner: [''],
      PaymentTerms: [''],
      AboutCompany: [''],
      flexRadioDefault: ['Yes'],
      customCheck1: [''],
      customCheck: [''],
    });
  }

  constructor(private fb: FormBuilder, private router: Router, private service: AddClientService,) {
    this.addClient = this.fb.group({
      description: [''],
    });
    this.clientLeads = [{ name: 'Lead 1' }, { name: 'Lead 2' }, { name: 'Lead 3' }, { name: 'Lead 4' }];
    this.requiredDocuments = [{ name: 'Document 1' }, { name: 'Document 2' }, { name: 'Document 3' }, { name: 'Document 4' }];
    this.Ownership = [{ name: 'Owner 1' }, { name: 'Owner 2' }, { name: 'Owner 3' }, { name: 'Owner 4' }];
  }

  onClientLeadsSearch(event: any) {
    this.filteredClientLeads = this.clientLeads.filter(option =>
      option.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  onRequiredDocumentsSearch(event: any) {
    this.filteredRequiredDocuments = this.requiredDocuments.filter(option =>
      option.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  onOwnershipSearch(event: any) {
    this.filteredOwnership = this.Ownership.filter(option =>
      option.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }

  // add() {
  //   if (this.addClient.valid) {
  //     const formData = this.addClient.value;
  //     this.allclientService.addClient(formData).subscribe(
  //       (response: any) => {
  //         console.log('Client added successfully:', response);
  //         this.router.navigate(['/viewclient', response.clientId]);
  //       },
  //       (error: any) => {
  //         console.error('Error adding client:', error);

  //         if (error.status === 400) {
  //           console.log('Validation error:', error.error);
  //         } else if (error.status === 401) {
  //           console.log('Unauthorized error');
  //         } else {
  //           console.log('Unexpected error:', error);
  //         }
  //       }
  //     );
  //   } else {
  //     this.showFormError = true;
  //     Object.keys(this.addClient.controls).forEach(field => {
  //       const control = this.addClient.get(field);
  //       if (control?.invalid) {
  //         console.log(`Field '${field}' has validation errors:`, control.errors);
  //       }
  //     });
  //   }
  // }

  addClientbtn() {
    let Req = {

      //validation
      ClientName: this.addClient.value.ClientName,
      ContactNumber: this.addClient.value.ContactNumber,
      ClientEmailID: this.addClient.value.ClientEmailID,
      Address: this.addClient.value.Address,

      //input
      VMSClientName: this.addClient.value.VMSClientName,
      FederalID: this.addClient.value.FederalID,
      ZipCode: this.addClient.value.ZipCode,
      ClientWebsite: this.addClient.value.ClientWebsite,
      Fax: this.addClient.value.Fax,

      //dropdown
      Industry: this.addClient.value.Industry,
      Country: this.addClient.value.Country,
      State: this.addClient.value.State,
      City: this.addClient.value.City,
      ClientStatus: this.addClient.value.ClientStatus,
      ClientCategory: this.addClient.value.ClientCategory,
      PrimaryOwner: this.addClient.value.PrimaryOwner,
      PaymentTerms: this.addClient.value.PaymentTerms,

      //textarea
      AboutCompany: this.addClient.value.AboutCompany,
      
      //radiocheck
      flexRadioDefault: this.addClient.value.flexRadioDefault,
      customCheck: this.addClient.value.customCheck,
      customCheck1: this.addClient.value.customCheck1,

      //ngmodel
      Ownership: this.selectedOwnership,
      clientLeads: this.selectedClientLeads,
      requiredDocuments: this.selectedRequiredDocuments,
      content: this.content,

    };
    console.log(Req);
    this.service.addClienta(Req).subscribe((x: any) => {
      console.log(x);
    });
  }

  cancel() {
    this.addClient.reset();
  }

}
