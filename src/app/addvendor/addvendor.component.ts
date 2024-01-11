
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
  
  loading: boolean = false;
  addVendor: any;
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
  allvendorService: any;
  formBuilder: any;
  TraineeID: any;

  //dropdowns
  state: string[] = [];
  selectedstate:any=0;
  selectedcity:any=0;
  city: string[] = [];
  VendorStatusID: string[] = [];
  VendorCategoryID: string[] = [];
  PrimaryOwner: string[] = [];
  country: string[] = ['United States'];
  PaymentTerms: string[] = ['Net 10', 'Net 15', 'Net 30', 'Net 45', 'Net 60', 'Net 7', 'Net 90'];
  Industry: string[] = [
    "Select",
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
    private service: addVendorService,
    private cookieService: CookieService
  ) {
    const documents = this.requiredDocuments.map(doc => doc.name).join(', ');
    console.log(documents);
    this.OrgID = this.cookieService.get('OrgID');
    this.TraineeID = this.cookieService.get('TraineeID');
  }

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
      Country: [''],
      state: [''],
      city: [''],
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

    this.getVendorCategories();
    this.getVendorStatus();
    this.getState();
    this.getPrimaryOwnerName();

  }


  onRequiredDocumentsSearch(event: any) {
    this.filteredRequiredDocuments = this.requiredDocuments.filter(option =>
      option.name.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  addVendorbutton() {
    let Req = {
      VendorName: this.addVendor.value.VendorName,
      ContactNumber: this.addVendor.value.ContactNumber,
      Website: this.addVendor.value.Website,
      Address: this.addVendor.value.Address,
      VMSVendorName: this.addVendor.value.VMSVendorName,
      FederalID: this.addVendor.value.FederalID,
      ZipCode: this.addVendor.value.ZipCode,
      VendorWebsite: this.addVendor.value.VendorWebsite,
      Fax: this.addVendor.value.Fax,
      Industry: this.addVendor.value.Industry,
      Country: this.addVendor.value.Country,
      State: this.selectedstate,
      City: this.selectedcity,
      VendorStatusID: this.addVendor.value.VendorStatusID,
      VendorCategoryID: this.addVendor.value.VendorCategoryID,
      PrimaryOwner: this.addVendor.value.PrimaryOwner,
      PaymentTerms: this.addVendor.value.PaymentTerms,
      AboutCompany: this.addVendor.value.AboutCompany,
      posting: this.addVendor.value.posting,
      sendingEmail: this.addVendor.value.sendingEmail,
      Access: this.addVendor.value.Access,
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
    this.selectedRequiredDocuments = [];
    this.Notes = '';
  }

  getVendorCategories() {
    let Req = {
      TraineeID: this.TraineeID,
    };
    this.service.getClientCategoryID(Req).subscribe((x: any) => {
      this.VendorCategoryID = x.result;
    });
  }

  getVendorStatus() {
    let Req = {
      TraineeID: this.TraineeID,
    };
    this.service.getClientStatusID(Req).subscribe((x: any) => {
      this.VendorStatusID = x.result;
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
      // this. getCity();
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

