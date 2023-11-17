import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.scss']
})
export class AddclientComponent implements OnInit {

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
  clientForm: FormGroup;
  showFormError: boolean = false;
  allclientService: any;

  ngOnInit(): void {
    const contactNumberPattern = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/;
    const addressPattern = /^[a-zA-Z0-9\s\-,./]+$/;
  
      this.clientForm = this.fb.group({
      ClientName: ['', Validators.required, Validators.nullValidator],
      ContactNumber: ['', [Validators.required,Validators.nullValidator, Validators.pattern(contactNumberPattern)]],
      ClientEmailID: ['', [Validators.required,Validators.email, Validators.pattern(emailPattern)]],
      Address: ['', [Validators.required,Validators.minLength(100), Validators.pattern(addressPattern)]],
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
    this.clientForm = this.fb.group({
      description: [''],
    });
    this.clientLeads = [{name:'Lead 1'}, {name:'Lead 2'}, {name:'Lead 3'}, {name:'Lead 4'}];
    this.requiredDocuments = [{name:'Document 1'}, {name:'Document 2'}, {name:'Document 3'}, {name:'Document 4'}];
  }

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }
  
  add() {
    if (this.clientForm.valid) {
      const formData = this.clientForm.value;
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
      Object.keys(this.clientForm.controls).forEach(field => {
        const control = this.clientForm.get(field);
        if (control?.invalid) { 
          console.log(`Field '${field}' has validation errors:`, control.errors);
        }
      });
    }
  }
  cancel() {
    this.client = [];
    this.showFormError = false;
    this.clientForm.reset(); 
  }
  
}
