
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { addVendorService } from './addvendor.component.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-addvendor',
  templateUrl: './addvendor.component.html',
  styleUrls: ['./addvendor.component.scss'],
  providers: [CookieService, addVendorService, MessageService],
})
export class AddvendorComponent implements OnInit {
 
 
  addVendor: any;
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
  allvendorService: any;
  formBuilder: any;

//have to change in ts tomorrow

  ngOnInit(): void {
    this.addVendor = this.fb.group({
      VendorName: ['', [Validators.required, Validators.minLength(3)]],
      ContactNumber: ['', [Validators.required, Validators.maxLength(10)]],
      EmailID: ['', [Validators.required, Validators.email]],
      Address: ['', [Validators.required, Validators.minLength(3)]],
      VMSVendorName: [''],
      FederalID: [''],
      ZipCode: [''],
      Website: [''],
      Fax: [''],
      Country: ['United States'],
      State: [''],
      City: [''],
      Industry: [''],
      VendorStatusID: [''],
      VendorCategoryID: [''],
      PrimaryOwner: [''],
      PaymentTerms: [''],
      AboutCompany: [''],
      posting: ['Yes'],
      Access: [''],
      sendingEmail: [''],
    });
  }

  constructor(private fb: FormBuilder, private router: Router, private service: addVendorService,) {
    this.addVendor = this.fb.group({
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
  //   if (this.addVendor.valid) {
  //     const formData = this.addVendor.value;
  //     this.allvendorService.addVendor(formData).subscribe(
  //       (response: any) => {
  //         console.log('Vendor added successfully:', response);
  //         this.router.navigate(['/viewvendor', response.vendorId]);
  //       },
  //       (error: any) => {
  //         console.error('Error adding vendor:', error);

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
  //     Object.keys(this.addVendor.controls).forEach(field => {
  //       const control = this.addVendor.get(field);
  //       if (control?.invalid) {
  //         console.log(`Field '${field}' has validation errors:`, control.errors);
  //       }
  //     });
  //   }
  // }

  add() {
    let Req = {

      //validation
      VendorName: this.addVendor.value.VendorName,
      ContactNumber: this.addVendor.value.ContactNumber,
      EmailID: this.addVendor.value.EmailID,
      Address: this.addVendor.value.Address,

      //input
      VMSVendorName: this.addVendor.value.VMSVendorName,
      FederalID: this.addVendor.value.FederalID,
      ZipCode: this.addVendor.value.ZipCode,
      Website: this.addVendor.value.Website,
      Fax: this.addVendor.value.Fax,

      //dropdown
      Industry: this.addVendor.value.Industry,
      Country: this.addVendor.value.Country,
      State: this.addVendor.value.State,
      City: this.addVendor.value.City,
      VendorStatusID: this.addVendor.value.VendorStatusID,
      VendorCategoryID: this.addVendor.value.VendorCategoryID,
      PrimaryOwner: this.addVendor.value.PrimaryOwner,
      PaymentTerms: this.addVendor.value.PaymentTerms,

      //textarea
      AboutCompany: this.addVendor.value.AboutCompany,
      
      //radiocheck
      posting: this.addVendor.value.posting,
      sendingEmail: this.addVendor.value.sendingEmail,
      Access: this.addVendor.value.Access,

      //ngmodel
      requiredDocuments: this.selectedRequiredDocuments,
      Notes: this.Notes,

    };
    console.log(Req);
    this.service.addVendor(Req).subscribe((x: any) => {
      console.log(x);
    });
  }

  cancel() {
    this.addVendor.reset();
    this.selectedRequiredDocuments=[];
    this.Notes='';
  }

}
