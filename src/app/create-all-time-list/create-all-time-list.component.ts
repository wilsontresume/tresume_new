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
  orgID: string;
  rows: any[] = [];
  minDate: string;
  maxDate: string;
  maxSelectableDays = 7;
  maxAllowedDays: number = 7;
  selectedSunday: string = '';
  isSundaySelected: boolean = false;
  CAselectedFile: File | null = null;
  SRselectedFile: File | null = null;
  [key: string]: any;
  file1: File | null = null;
  file2: File | null = null;

  //New Functions
  timesheetRows: any[] = [];

  updateTotalAmount() {
    let totalAmount = 0;

    this.rows.forEach(row => {
      if (row.checkbox) {
        totalAmount += row.input || 0;
      }
      this.row.totalAmount = this.calculateTotalAmount(this.row); 
    });

    this.totalAmount = totalAmount;
  }
  getDatesWithDaysArray(start: Date, end: Date): { date: Date; day: string }[] {
    const datesWithDaysArray: { date: Date; day: string }[] = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      datesWithDaysArray.push({
        date: new Date(currentDate),
        day: currentDate.toLocaleDateString('en-US', { weekday: 'short' })
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return datesWithDaysArray;
  }

  


  onDateRangeChange(dates: Date[]) {
    if (dates.length === 2) {
      const startDate = new Date(dates[0]);
      const endDate = new Date(dates[1]);
  
      const dayDifference = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
  
      if (dayDifference >= this.maxSelectableDays) {
        this.selectedDateRange = [];
        console.log('Please select a date range within 7 days.');
      } else {
        this.selectedDateRange = [startDate, endDate];
      }
    }
  }



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
      dropdownId: 1,  
      textarea: '',
      checkbox: false,
      file1: null,
      file2: null,
      mon: '',
      tues: '',
      wed: '',
      thu: '',
      fri: '',
      sat: '',
      sun: ''
    });
  }
  removeRow(index: number) {
    this.timesheetRows.splice(index, 1);
  }

  // onDropdownChange(selectedOption: string, row: any) {
  //   row.selectedOption = selectedOption;
  // }

  onFileChange(event: any, fieldName: string, row: any) {
    const fileList: FileList | null = event.target.files;
    if (fileList && fileList.length > 0) {
      row[fieldName] = fileList[0];
    }
  }

  // getDropdownOptions(dropdownId: number): string[] {
  //   const dropdown = this.dropdownOptions.find(option => option.id === dropdownId);
  //   return dropdown ? dropdown.options : [];
  // }

  calculateTotalAmount(row: any): number | string {
    const mon = row.mon || 0;
    const tues = row.tues || 0;
    const wed = row.wed || 0;
    const thu = row.thu || 0;
    const fri = row.fri || 0;
    const sat = row.sat || 0;
    const sun = row.sun || 0;
    const totalHours = +mon + +tues + +wed + +thu + +fri + +sat + +sun;
  
    const hourlyRate = row.checkbox ? +row.input : 0; 
  
    const totalAmount = totalHours * hourlyRate;
  
    return isNaN(totalAmount) ? 'N/A' : totalAmount;
  }
  calculateTotalHours(row: any): number | string {
    const mon = row.mon || 0;
    const tues = row.tues || 0;
    const wed = row.wed || 0;
    const thu = row.thu || 0;
    const fri = row.fri || 0;
    const sat = row.sat || 0;
    const sun = row.sun || 0;
    const totalHours = +mon + +tues + +wed + +thu + +fri + +sat + +sun;
  
    return isNaN(totalHours) ? 'N/A' : totalHours;
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

  
  constructor(private fb: FormBuilder,private router: Router, private Service: CreateAllTimeListService, private messageService: MessageService, private cookieService: CookieService,private fm: FormsModule) {
    this.orgID= this.cookieService.get('OrgID');
    this.TraineeID = this.cookieService.get('TraineeID');
  }

  ngOnInit(): void {
    this.orgID= this.cookieService.get('OrgID');
    this.TraineeID = this.cookieService.get('TraineeID');

    this.addDefaultRows();
    this.getProjectName();
    this.getCandidateName();
    this.getLocation();
    }


  // deleteAllRows(): void {
  //   this.rows = this.rows.slice(0, 3);
  //   this.updateSerialNumbers();
  // }

 
  selectedItem: string;
  dropdownOption: string[] = [];

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

  selectedItem1: string;
  dropdownOptions1: string[] = [];

  selectOption1(option: string): void {
    this.selectedItem1 = option;
  }
  
  // getProjectName() {
  //   let Req = {
  //     OrgID: this.OrgID
  //   };
  //   this.Service.getCreateProjectList(Req).subscribe((x: any) => {
  //     // this.dropdownOptions1 = x.result;
  //     this.ProjectName = x.result;
  //   });
  // }

  getProjectName() {
    let Req = {
      OrgID: this.OrgID
    };
    this.Service.getCreateProjectList(Req).subscribe((x: any) => {
      this.ProjectName = x.result;
    });
  }
  
  getDropdownOptions() {
    return this.ProjectName;
  }

  onDropdownChange(selectedOption: any, row: any) {
    row.selectedOption1 = selectedOption.ProjectName;
  }
  
  
  
  selectedItem4: string;
  dropdownOptions4: string[] = [];

  selectOption4(option: string): void {
    this.selectedItem4 = option;
  }

  getLocation() {
    let Req = {
      OrgID: this.OrgID
    };
    this.Service.getLocationList(Req).subscribe((x: any) => {
      this.dropdownOptions4 = x.result;
    });
  }


 

}
