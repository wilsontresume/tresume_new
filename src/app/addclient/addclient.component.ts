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
 
  email:any;
  loading: boolean = false;
  addClient: any;
  formData: any;
  Access: boolean = false;
  sendingEmail: boolean = false;
  Notes: string = '';
  requiredDocuments: { name: string }[] = [
    { name: 'Driving License' },
    { name: 'Resume' },
    { name: 'EML File' },
    { name: 'SSN' },
    { name: 'Transcripts' },
  ];
  selectedRequiredDocuments: any[] = [];
  filteredRequiredDocuments: any[] = [];
  allclientService: any;
  formBuilder: any;
  TraineeID: any;

  //dropdowns
  state: string[] = [];
  selectedstate:any=0;
  selectedcity:any=0;
  city: string[] = [];
  ClientStatusID: string[] = [];
  ClientCategoryID: string[] = [];
  PrimaryOwner: string[] = [];
  selectedPrimaryOwner: any=0;
  selectedClientStatusID: any=0;
  selectedClientCategoryID: any=0;
  country: string[] = ['United States'];
  PaymentTerms: string[] = ['Net 10', 'Net 15', 'Net 30', 'Net 45', 'Net 60', 'Net 7', 'Net 90'];
  Industry: string[] = [
    "Accounting - Finance",
    "Advertising",
    "Agriculture",
    "Airline - Aviation",
    "Architecture - Building",
    "Art - Photography - Journalism",
    "Automotive - Motor Vehicles - Parts",
    "Banking - Financial Services",
    "Broadcasting - Radio - TV",
    "Building Materials",
    "Chemical",
    "Computer Hardware",
    "Biotechnology",
    "Computer Software",
    "Construction",
    "Consulting",
    "Consumer Products",
    "Credit - Loan - Collections",
    "Defense - Aerospace",
    "Education - Teaching - Administration",
    "Electronics",
    "Employment - Recruiting - Staffing",
    "Energy - Utilities - Gas - Electric",
    "Entertainment",
    "Environmental",
    "Exercise - Fitness",
    "Fashion - Apparel - Textile",
    "Food",
    "Funeral - Cemetery",
    "Government - Civil Service",
    "Healthcare - Health Services",
    "Homebuilding",
    "Hospitality",
    "Hotel - Resort",
    "HVAC",
    "Import - Export",
    "Industrial",
    "Insurance",
    "Internet - ECommerce",
    "Landscaping",
    "Law Enforcement",
    "Legal",
    "Library Science",
    "Managed Care",
    "Manufacturing",
    "Medical Equipment",
    "Merchandising",
    "Military",
    "Mortgage",
    "Newspaper",
    "Not for Profit - Charitable",
    "Office Supplies - Equipment",
    "Oil Refining - Petroleum - Drilling",
    "Other Great Industries",
    "Packaging",
    "Pharmaceutical",
    "Printing - Publishing",
    "Public Relations",
    "Real Estate - Property Mgt",
    "Recreation",
    "Restaurant",
    "Retail",
    "Sales - Marketing",
    "Securities",
    "Security",
    "Semiconductor",
    "Social Services",
    "Telecommunications",
    "Training",
    "Transportation",
    "Travel",
    "Wireless"
  ];
  OrgID: string;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AddClientService,
    private cookieService: CookieService
  ) {
    
    this.OrgID = this.cookieService.get('OrgID');
    this.TraineeID = this.cookieService.get('TraineeID');
  }

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
      Country: [''],
      state: [''],
      city: [''],
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

    this.getClientCategories();
    this.getClientStatus();
    this.getState();
    this.getPrimaryOwnerName();
  }


  onRequiredDocumentsSearch(event: any) {
    this.filteredRequiredDocuments = this.requiredDocuments.filter(option =>
      option.name.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  addClientbutton() {
    const documents = this.selectedRequiredDocuments.map(doc => doc.name).join(', ');
    console.log(documents);
    let Req = {
      ClientName: this.addClient.value.ClientName,
      ContactNumber: this.addClient.value.ContactNumber,
      EmailID:this.addClient.value.EmailID,
      Website: this.addClient.value.Website,
      Address: this.addClient.value.Address,
      VMSClientName: this.addClient.value.VMSClientName,
      FederalID: this.addClient.value.FederalID,
      ZipCode: this.addClient.value.ZipCode,
      ClientWebsite: this.addClient.value.ClientWebsite,
      Fax: this.addClient.value.Fax,
      Industry: this.addClient.value.Industry,
      Country: this.addClient.value.Country,
      State: this.selectedstate,
      City: this.selectedcity,
      ClientStatusID: this.selectedClientStatusID,
      ClientCategoryID: this.selectedClientCategoryID,
      PrimaryOwner: this.selectedPrimaryOwner,
      PaymentTerms: this.addClient.value.PaymentTerms,
      AboutCompany: this.addClient.value.AboutCompany,
      posting: this.addClient.value.posting,
      sendingEmail: this.addClient.value.sendingEmail,
      Access: this.addClient.value.Access,
      RequiredDocuments: documents,
      Notes: this.Notes,
    };
    console.log(Req);
    this.service.addClienta(Req).subscribe((x: any) => {
      console.log(x);
    });
  }

  cancel() {
    this.addClient.reset();
    this.selectedRequiredDocuments = [];
    this.Notes = '';
  }

  getClientCategories() {
    let Req = {
      TraineeID: this.TraineeID,
    };
    this.service.getClientCategoryID(Req).subscribe((x: any) => {
      this.ClientCategoryID = x.result;
    });
  }

  getClientStatus() {
    let Req = {
      TraineeID: this.TraineeID,
    };
    this.service.getClientStatusID(Req).subscribe((x: any) => {
      this.ClientStatusID = x.result;
    });
  }

  getPrimaryOwnerName() {
    let Req = {
      TraineeID: this.TraineeID,
      orgID:this.OrgID
    };
    this.service.getPrimaryOwner(Req).subscribe((x: any) => {
      this.PrimaryOwner = x;
    });
  }

  getState() {
    let Req = {
      TraineeID: this.TraineeID,
    };
    this.service.getLocation(Req).subscribe((x: any) => {
      this.state = x.result;
    });
  }

  getCity() {
    console.log(this.selectedstate);
    let Req = {
      TraineeID: this.TraineeID,
      State: this.selectedstate
    };
    this.service.getCity(Req).subscribe((x: any) => {
      this.city = x.result;
    });
  }
}


