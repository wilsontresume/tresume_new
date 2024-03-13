import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-organinfo',
  templateUrl: './organinfo.component.html',
  styleUrls: ['./organinfo.component.scss']
})
export class OrganinfoComponent{
  loading:boolean = false;

  public content:any;
  taxTermsOptions = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ];
  selectedTaxTerm: any;

  departmentOptions = [
    { id: 1, name: 'Department A' },
    { id: 2, name: 'Department B' },
    { id: 3, name: 'Department C' }
  ];
  selectedDepartment: any;

  recruitManager = [
    { id: 1, name: 'Department A' },
    { id: 2, name: 'Department B' },
    { id: 3, name: 'Department C' }
  ];
  selectedrecmanger: any;

  salesManager = [
    { id: 1, name: 'Department A' },
    { id: 2, name: 'Department B' },
    { id: 3, name: 'Department C' }
  ];
  selectedsalesManager: any;

  accountManager = [
    { id: 1, name: 'Department A' },
    { id: 2, name: 'Department B' },
    { id: 3, name: 'Department C' }
  ];
  selectedaccountManager: any;

  checkboxes = [
    { label: 'ZipRecruiter', checked: false },
    { label: 'Dice', checked: false }
  ];





}








