import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-addvendor',
  templateUrl: './addvendor.component.html',
  styleUrls: ['./addvendor.component.scss']
})
export class AddvendorComponent {
  
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

    add () {
      console.log('Vendor added successfully.');
      this.vendor.push("New Item"); 
    } 
  
    cancel (){
      this.vendor = [];
    }  
  }
  

