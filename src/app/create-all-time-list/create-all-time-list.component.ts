import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateAllTimeListService} from './create-all-time-list.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs'


@Component({
  selector: 'app-create-all-time-list',
  templateUrl: './create-all-time-list.component.html',
  providers: [CookieService,CreateAllTimeListService,MessageService],
  styleUrls: ['./create-all-time-list.component.scss']
})
export class CreateAllTimeListComponent implements OnInit {
  // timesheetData: any[];
  // project: any;
  // clients: any;
  orgID: string;
  minDate: string;
  maxDate: string;
  selectedSunday: string = '';
  isSundaySelected: boolean = false;
  CAselectedFile: File | null = null;
  SRselectedFile: File | null = null;
  [key: string]: any;
  file1: File | null = null;
  file2: File | null = null;

  //New Functions
  timesheetRows: any[] = [];

  dropdownOptions: any[] = [
    { id: 1, options: ["Option A1", "Option A2", "Option A3"] },
    { id: 2, options: ["Regular Type"] },
    { id: 3, options: ["Service"] },
    { id: 4, options: ["Option D1", "Option D2", "Option D3"] }
  ];

  addRow() {
    this.timesheetRows.push({
      selectedOption: null,
      detailsDropdown: null,
      dropdownId: 1,  // Specify the default dropdown id or adjust based on your requirements
      textarea: '',
      checkbox: false,
      file1: null,
      file2: null,
      mon: 0,
      tues: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0,
      sun: 0
    });
  }
  removeRow(index: number) {
    this.timesheetRows.splice(index, 1);
  }

  onDropdownChange(selectedOption: string, row: any) {
    row.selectedOption = selectedOption;
  }

  onFileChange(event: any, fieldName: string, row: any) {
    const fileList: FileList | null = event.target.files;
    if (fileList && fileList.length > 0) {
      row[fieldName] = fileList[0];
    }
  }

  getDropdownOptions(dropdownId: number): string[] {
    const dropdown = this.dropdownOptions.find(option => option.id === dropdownId);
    return dropdown ? dropdown.options : [];
  }

  calculateTotal(row: any): number | string {
    const mon = row.mon || 0;
    const tues = row.tues || 0;
    const wed = row.wed || 0;
    const thu = row.thu || 0;
    const fri = row.fri || 0;
    const sat = row.sat || 0;
    const sun = row.sun || 0;
    const total = +mon + +tues + +wed + +thu + +fri + +sat + +sun;
  
    return isNaN(total) ? 'N/A' : total;
  }
  
  addDefaultRows() {
    this.timesheetRows.push({
      selectedOption1: null,
      detailsDropdown1: null,
      dropdownId1: 1,
      textarea1: '',
      checkbox1: false,
      file1_1: null,
      file1_2: null,
      mon1: 0,
      tues1: 0,
      wed1: 0,
      thu1: 0,
      fri1: 0,
      sat1: 0,
      sun1: 0
    });

    // Add the second default row
    this.timesheetRows.push({
      selectedOption2: null,
      detailsDropdown2: null,
      dropdownId2: 2,
      textarea2: '',
      checkbox2: false,
      file2_1: null,
      file2_2: null,
      mon2: 0,
      tues2: 0,
      wed2: 0,
      thu2: 0,
      fri2: 0,
      sat2: 0,
      sun2: 0
    });
  }

  //New Functions ends...

  selectSunday(selectedDate: string) {
    const selectedDateObj = new Date(selectedDate);
    const dayOfWeek = selectedDateObj.getDay();
    if (dayOfWeek === 0) {
      this.selectedSunday = selectedDate;
      this.isSundaySelected = true;
    } else {
      const previousSunday = new Date(selectedDateObj);
      previousSunday.setDate(selectedDateObj.getDate() - dayOfWeek);
      const formattedDate = previousSunday.toISOString().split('T')[0];
      this.selectedSunday = formattedDate;
      this.isSundaySelected = true;
    }
  }


  onFileSelected(event: any, fileIdentifier: string): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this[fileIdentifier] = fileList[0];
    }
  }

  // rows: any[] = [
  //   { 
  //     selectedValue: '',
  //     description: '', 
  //     checkbox: false, 
  //     billableAmount: 0,
  //   },

  // ];


  // rows: any[] = [];
  // addRow(
  //   selectOption1: string = '',
  //   selectOption2: string = '',
  //   selectOption3: string = '',
  //   selectOption4: string = '',
  //   textarea: string = '',
  //   checkbox: boolean = false,
  //   input: number = 0,
  //   input1: number = 0,
  //   input2: number = 0,
  //   input3: number = 0,
  //   input4: number = 0,
  //   input5: number = 0,
  //   input6: number = 0,
  //   input7: number = 0
  // ): void {
  //   this.rows.push({
  //     selectedItem1: selectOption1,
  //     selectedItem2: selectOption2,
  //     selectedItem3: selectOption3,
  //     selectedItem4: selectOption4,
  //     textarea: textarea,
  //     checkbox: checkbox,
  //     input: input,
  //     input1: input1,
  //     input2: input2,
  //     input3: input3,
  //     input4: input4,
  //     input5: input5,
  //     input6: input6,
  //     input7: input7
  //   });
  // }

  
  constructor(private fb: FormBuilder,private router: Router, private Service: CreateAllTimeListService, private messageService: MessageService, private cookieService: CookieService,private fm: FormsModule) {
    this.orgID= this.cookieService.get('OrgID');
    this.TraineeID = this.cookieService.get('TraineeID');
  }

  ngOnInit(): void {
    // this.addRowWithValues('', '', '', '', '','','', '','', '', '', '', '', '' );
    // this.addRowWithValues('', '', '', '','','', '', '', '','', '', '', '', '' );
    this.addDefaultRows();

    this.getProjectName();
    this.getCandidateName();
    this.getPayItem();
    this.getLocation();

    }


  // deleteRow(index: number): void {
  //   this.rows.splice(index, 1);
  //   this.updateSerialNumbers();
  // }

  // deleteAllRows(): void {
  //   this.rows = this.rows.slice(0, 3);
  //   this.updateSerialNumbers();
  // }

  // private updateSerialNumbers(): void {
  //   this.rows.forEach((row, index) => {
  //     row['sno'] = index + 1;
  //   });
  // }

  // private addRowWithValues( selectedItem1: any, selectedItem2: any, selectedItem3: any, selectedItem4: any, textarea: string, checkbox: any,input:any, input1: any, input2: any, input3: any, input4: any, input5: any, input6: any, input7: any,): void {
  //   this.addRow(selectedItem1, selectedItem2, selectedItem3, selectedItem4, textarea, checkbox, input, input1, input2, input3, input4, input5, input6, input7);
  // }
 
  selectedItem: string;
  // dropdownOption: string[] = [];

  selectOption(option: string): void {
    this.selectedItem = option;
  }

  getCandidateName() {
    let Req = {
      OrgID: this.OrgID
    };
    this.Service.getTimesheetCandidatetList(Req).subscribe((x: any) => {
      this.dropdownOptions = x.result;
    });
  }

  // selectedItem1: string;
  // dropdownOptions1: string[] = [];

  // selectOption1(option: string): void {
  //   this.selectedItem1 = option;
  // }
  
  // getProjectName() {
  //   let Req = {
  //     TraineeID: this.TraineeID
  //   };
  //   this.Service.getCreateProjectList(Req).subscribe((x: any) => {
  //     this.dropdownOptions1 = x.result;
  //   });
  // }

  // selectedItem2: string;
  // dropdownOptions2: string[] = [];

  // selectOption2(option: string): void {
  //   this.selectedItem2 = option;
  // }


  // getPayItem() {
  //   let Req = {
  //     OrgID: this.OrgID
  //   };
  //   this.Service.getPayItemList(Req).subscribe((x: any) => {
  //     this.dropdownOptions2 = x.result;
  //   });
  // }


  // selectedItem3: string;
  // dropdownOptions3: string[] = ['Service'];

  // selectOption3(option: string): void {
  //   this.selectedItem3 = option;
  // }


  // selectedItem4: string;
  // dropdownOptions4: string[] = [];

  // selectOption4(option: string): void {
  //   this.selectedItem4 = option;
  // }

  // getLocation() {
  //   let Req = {
  //     OrgID: this.OrgID
  //   };
  //   this.Service.getLocationList(Req).subscribe((x: any) => {
  //     this.dropdownOptions4 = x.result;
  //   });
  // }


 

}
