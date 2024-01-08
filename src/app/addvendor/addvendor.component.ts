
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { addVendorService } from './addvendor.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-addvendor',
  templateUrl: './addvendor.component.html',
  styleUrls: ['./addvendor.component.scss'],
  providers: [CookieService, addVendorService, MessageService],
})
export class AddvendorComponent implements OnInit {
  loading:boolean = false;

  addVendor: any;
  formData: any;
  // onKeyPress($event: any) {
  //   throw new Error('Method not implemented.');
  // }
  customCheck1:boolean=false;
  customCheck:boolean=false;
  content: string = '';
  activeTab: string = 'basicInfo';
  selectedOwnership: any[] = [];
  filteredOwnership: any[] = [];
  vendorLeads: any[];
  Ownership: any[];
  requiredDocuments: any[];
  selectedVendorLeads: any[] = [];
  selectedRequiredDocuments: any[] = [];
  filteredVendorLeads: any[] = [];
  filteredRequiredDocuments: any[] = [];
  allvendorService: any;
  formBuilder: any;
  OrgID: any;
  userName: string;
  TraineeID: string;

  ngOnInit(): void {
    this.addVendor = this.fb.group({
      VendorName: ['', [Validators.required, Validators.minLength(3)]],
      ContactNumber: ['', [Validators.required, Validators.maxLength(10)]],
      VendorEmailID: ['', [Validators.required, Validators.email]],
      Address: ['', [Validators.required, Validators.minLength(3)]],
      VMSVendorName: [''],
      FederalID: [''],
      ZipCode: [''],
      VendorWebsite: [''],
      Fax: [''],
      Country: ['United States'],
      State: [''],
      City: [''],
      Industry: [''],
      VendorStatus: [''],
      VendorCategory: [''],
      PrimaryOwner: [''],
      PaymentTerms: [''],
      AboutCompany: [''],
      flexRadioDefault: ['Yes'],
      customCheck1: [''],
      customCheck: [''],
    });
  }

  constructor(private fb: FormBuilder, private router: Router, private service: addVendorService,private cookieService: CookieService) {
    this.userName = this.cookieService.get('userName1');
    this.TraineeID = this.cookieService.get('TraineeID');
    this.addVendor = this.fb.group({
      description: [''],
    });
    this.vendorLeads = [{ name: 'Lead 1' }, { name: 'Lead 2' }, { name: 'Lead 3' }, { name: 'Lead 4' }];
    this.requiredDocuments = [{ name: 'Document 1' }, { name: 'Document 2' }, { name: 'Document 3' }, { name: 'Document 4' }];
    this.Ownership = [{ name: 'Owner 1' }, { name: 'Owner 2' }, { name: 'Owner 3' }, { name: 'Owner 4' }];
  }

  onVendorLeadsSearch(event: any) {
    this.filteredVendorLeads = this.vendorLeads.filter(option =>
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
      VendorEmailID: this.addVendor.value.VendorEmailID,
      Address: this.addVendor.value.Address,

      //input
      VMSVendorName: this.addVendor.value.VMSVendorName,
      FederalID: this.addVendor.value.FederalID,
      ZipCode: this.addVendor.value.ZipCode,
      VendorWebsite: this.addVendor.value.VendorWebsite,
      Fax: this.addVendor.value.Fax,

      //dropdown
      Industry: this.addVendor.value.Industry,
      Country: this.addVendor.value.Country,
      State: this.addVendor.value.State,
      City: this.addVendor.value.City,
      VendorStatus: this.addVendor.value.VendorStatus,
      VendorCategory: this.addVendor.value.VendorCategory,
      PrimaryOwner: this.TraineeID,
      PaymentTerms: this.addVendor.value.PaymentTerms,

      //textarea
      AboutCompany: this.addVendor.value.AboutCompany,
      
      //radiocheck
      flexRadioDefault: this.addVendor.value.flexRadioDefault,
      customCheck: this.addVendor.value.customCheck,
      customCheck1: this.addVendor.value.customCheck1,

      //ngmodel
      Ownership: this.selectedOwnership,
      vendorLeads: this.selectedVendorLeads,
      requiredDocuments: this.selectedRequiredDocuments,
      content: this.content,

    };
    console.log(Req);
    this.service.addVendor(Req).subscribe((x: any) => {
      console.log(x);
    });
  }

  cancel() {
    this.addVendor.reset();
  }

}
