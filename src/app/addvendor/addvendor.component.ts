
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addvendor',
  templateUrl: './addvendor.component.html',
  styleUrls: ['./addvendor.component.scss']
})
export class AddvendorComponent implements OnInit {
  addVendor: any;
onKeyPress($event: any) {
throw new Error('Method not implemented.');
}

  content: string = '';
  activeTab: string = 'basicInfo';
  Ownership: any[]=[{name:'Parvathy'}, {name:'abc'}, {name:'DEF'}, {name:'def'}];
  selectedOwnership: any[] = [];
  filteredOwnership: any[] = [];
  vendorLeads: any[] ;
  requiredDocuments: any[] ;
  selectedVendorLeads: any[] = [];
  selectedRequiredDocuments: any[] = [];
  filteredVendorLeads: any[] = [];
  filteredRequiredDocuments: any[] = [];
  vendor: string[] = [];
  showFormError: boolean = false;
  allvendorService: any;

  ngOnInit(): void {  
      this.addVendor = this.fb.group({
        vendorName: ['', [Validators.required, Validators.minLength(3)]],
        ContactNumber: ['', [Validators.required, Validators.maxLength(10)]],
        VendorEmailID: ['', [Validators.required, Validators.maxLength(10)]],
        Address: ['', [Validators.required, Validators.maxLength(10)]],
        
    });
   
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

  constructor(private fb: FormBuilder, private router: Router) {

    this.vendorLeads = [{name:'Lead 1'}, {name:'Lead 2'}, {name:'Lead 3'}, {name:'Lead 4'}];
    this.requiredDocuments = [{name:'Document 1'}, {name:'Document 2'}, {name:'Document 3'}, {name:'Document 4'}];
  }

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }
  
  add() {
    if (this.addVendor.valid) {
      const formData = this.addVendor.value;
      this.allvendorService.addVendor(formData).subscribe(
        (response: any) => {
          console.log('Vendor added successfully:', response);
          this.router.navigate(['/viewvendor', response.vendorId]);
        },
        (error: any) => {
          console.error('Error adding vendor:', error);
  
          if (error.status === 400) {
            console.log('Validation error:', error.error);
          } else if (error.status === 401) {
            console.log('Unauthorized error');
          } else {
            console.log('Unexpected error:', error);
          }
        }
      );
    } else {
      this.showFormError = true;
      Object.keys(this.addVendor.controls).forEach(field => {
        const control = this.addVendor.get(field);
        if (control?.invalid) { 
          console.log(`Field '${field}' has validation errors:`, control.errors);
        }
      });
    }
  }
  cancel() {
    this.vendor = [];
    this.showFormError = false;
    this.addVendor.reset(); 
  }
  
}
