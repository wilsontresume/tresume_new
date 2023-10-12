import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.scss']
})
export class AddclientComponent {
  content: string = '';
  activeTab: string = 'basicInfo';
  form: FormGroup;
  Ownership: any[]=[{name:'Parvathy'}, {name:'abc'}, {name:'DEF'}, {name:'def'}];
  selectedOwnership: any[] = [];
  filteredOwnership: any[] = [];
  clientLeads: any[] ;
  requiredDocuments: any[] ;
  selectedClientLeads: any[] = [];
  selectedRequiredDocuments: any[] = [];
  filteredClientLeads: any[] = [];
  filteredRequiredDocuments: any[] = [];

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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      description: [''],
    });
    this.clientLeads = [{name:'Lead 1'}, {name:'Lead 2'}, {name:'Lead 3'}, {name:'Lead 4'}];
    this.requiredDocuments = [{name:'Document 1'}, {name:'Document 2'}, {name:'Document 3'}, {name:'Document 4'}];
  }

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }
}
