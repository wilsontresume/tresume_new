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
  Access:boolean=false;
  sendingEmail:boolean=false;
  Notes: string = '';
  requiredDocuments: any[];
  selectedRequiredDocuments: any[] = [];
  filteredRequiredDocuments: any[] = [];
  allclientService: any;
  formBuilder: any;

//have to change in ts tomorrow

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
      Country: ['United States'],
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

  constructor(private fb: FormBuilder, private router: Router, private service: AddClientService,) {
    this.addClient = this.fb.group({
      description: [''],
    });
    
    this.requiredDocuments = [{ name: 'Document 1' }, { name: 'Document 2' }, { name: 'Document 3' }, { name: 'Document 4' }];
    
  }

  onRequiredDocumentsSearch(event: any) {
    this.filteredRequiredDocuments = this.requiredDocuments.filter(option =>
      option.toLowerCase().includes(event.query.toLowerCase())
    );
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

  addClientbutton() {
    let Req = {

      //validation
      ClientName: this.addClient.value.ClientName,
      ContactNumber: this.addClient.value.ContactNumber,
      EmailID: this.addClient.value.EmailID,
      Address: this.addClient.value.Address,

      //input
      VMSClientName: this.addClient.value.VMSClientName,
      FederalID: this.addClient.value.FederalID,
      ZipCode: this.addClient.value.ZipCode,
      Website: this.addClient.value.Website,
      Fax: this.addClient.value.Fax,

      //dropdown
      Industry: this.addClient.value.Industry,
      Country: this.addClient.value.Country,
      State: this.addClient.value.State,
      City: this.addClient.value.City,
      ClientStatusID: this.addClient.value.ClientStatusID,
      ClientCategoryID: this.addClient.value.ClientCategoryID,
      PrimaryOwner: this.addClient.value.PrimaryOwner,
      PaymentTerms: this.addClient.value.PaymentTerms,

      //textarea
      AboutCompany: this.addClient.value.AboutCompany,
      
      //radiocheck
      posting: this.addClient.value.posting,
      sendingEmail: this.addClient.value.sendingEmail,
      Access: this.addClient.value.Access,

      //ngmodel
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
    this.selectedRequiredDocuments=[];
    this.Notes='';
  }

}
