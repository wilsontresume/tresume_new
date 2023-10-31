import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-addvendor',
  templateUrl: './addvendor.component.html',
  styleUrls: ['./addvendor.component.scss']
})
export class AddvendorComponent implements OnInit {
  
    content: string = '';
    activeTab: string = 'basicInfo';
    form: FormGroup;
    Ownership: any[]=[{name:'Parvathy'}, {name:'abc'}, {name:'DEF'}, {name:'def'}];
    selectedOwnership: any[] = [];
    filteredOwnership: any[] = [];
    VendorLeads: any[] ;
    requiredDocuments: any[] ;
    selectedVendorLeads: any[] = [];
    selectedRequiredDocuments: any[] = [];
    filteredVendorLeads: any[] = [];
    filteredRequiredDocuments: any[] = [];
    vendor: string[] = [];
    vendorForm: FormGroup;
    showFormError: boolean = false;

    ngOnInit(): void {
      this.vendorForm = this.fb.group({
        VendorName: ['', Validators.required],
        ContactNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        VendorEmailID: ['', [Validators.required, Validators.email]],
        Address: ['', Validators.required],
      });
    }
    onVendorLeadsSearch(event: any) {
      this.filteredVendorLeads = this.VendorLeads.filter(option =>
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
  
    constructor(private fb: FormBuilder) {
      this.form = this.fb.group({
        description: [''],
      });
      this.VendorLeads = [{name:'Lead 1'}, {name:'Lead 2'}, {name:'Lead 3'}, {name:'Lead 4'}];
      this.requiredDocuments = [{name:'Document 1'}, {name:'Document 2'}, {name:'Document 3'}, {name:'Document 4'}];
    }
  
    selectTab(tabId: string) {
      this.activeTab = tabId;
    }

    add() {
      if (this.vendorForm.valid) {
        const formData = this.vendorForm.value;
        console.log('Form Data:', formData);
      } else {
        this.showFormError = true;
      }
    }
  
    cancel (){
      this.vendor = [];
    }  
  }
  

