import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.scss']
})
export class AddclientComponent implements OnInit {
addClient: any;
onKeyPress($event: any) {
throw new Error('Method not implemented.');
}

  content: string = '';
  activeTab: string = 'basicInfo';
  Ownership: any[]=[{name:'Parvathy'}, {name:'abc'}, {name:'DEF'}, {name:'def'}];
  selectedOwnership: any[] = [];
  filteredOwnership: any[] = [];
  clientLeads: any[] ;
  requiredDocuments: any[] ;
  selectedClientLeads: any[] = [];
  selectedRequiredDocuments: any[] = [];
  filteredClientLeads: any[] = [];
  filteredRequiredDocuments: any[] = [];
  client: string[] = [];
  showFormError: boolean = false;
  allclientService: any;
  formBuilder:any;

  ngOnInit(): void {  
      this.addClient = this.fb.group({
        ClientName: ['', Validators.required, Validators.minLength(3)],
        ContactNumber: ['', Validators.required, Validators.maxLength(10)],
        ClientEmailID: ['', Validators.required],
        Address: ['', Validators.required, Validators.minLength(3)],
    });
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

  constructor(private fb: FormBuilder, private router: Router) {
    this.addClient = this.fb.group({
      description: [''],
    });
    this.clientLeads = [{name:'Lead 1'}, {name:'Lead 2'}, {name:'Lead 3'}, {name:'Lead 4'}];
    this.requiredDocuments = [{name:'Document 1'}, {name:'Document 2'}, {name:'Document 3'}, {name:'Document 4'}];
  }

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }
  
  add() {
    if (this.addClient.valid) {
      const formData = this.addClient.value;
      this.allclientService.addClient(formData).subscribe(
        (response: any) => {
          console.log('Client added successfully:', response);
          this.router.navigate(['/viewclient', response.clientId]);
        },
        (error: any) => {
          console.error('Error adding client:', error);
  
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
      Object.keys(this.addClient.controls).forEach(field => {
        const control = this.addClient.get(field);
        if (control?.invalid) { 
          console.log(`Field '${field}' has validation errors:`, control.errors);
        }
      });
    }
  }
  cancel() {
    this.client = [];
    this.showFormError = false;
    this.addClient.reset(); 
  }
  
}
