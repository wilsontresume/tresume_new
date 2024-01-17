import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateAllTimeListService} from './create-all-time-list.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';


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

  rows: any[] = [
    { 
      selectedValue: '',
      description: '', 
      checkbox: false, 
      billableAmount: 0,
    },

  ];


  // rows: any[] = [];
  addRow(
    selectOption1: string = '',
    selectOption2: string = '',
    selectOption3: string = '',
    selectOption4: string = '',
    textarea: string = '',
    checkbox: boolean = false,
    input: number = 0,
    input1: number = 0,
    input2: number = 0,
    input3: number = 0,
    input4: number = 0,
    input5: number = 0,
    input6: number = 0,
    input7: number = 0
  ): void {
    this.rows.push({
      selectedItem1: selectOption1,
      selectedItem2: selectOption2,
      selectedItem3: selectOption3,
      selectedItem4: selectOption4,
      textarea: textarea,
      checkbox: checkbox,
      input: input,
      input1: input1,
      input2: input2,
      input3: input3,
      input4: input4,
      input5: input5,
      input6: input6,
      input7: input7
    });
  }

  
  constructor(private fb: FormBuilder,private router: Router, private Service: CreateAllTimeListService, private messageService: MessageService, private cookieService: CookieService,private fm: FormsModule) {
    this.orgID= this.cookieService.get('OrgID');
    this.TraineeID = this.cookieService.get('TraineeID');
  }

  ngOnInit(): void {
    this.addRowWithValues('', '', '', '', '','','', '', '', '', '', '', '' );
    this.addRowWithValues('', '', '', '','','', '', '', '', '', '', '', '' );
   
    this.getProjectName();
    this.getCandidateName();
    this.getPayItem();
    this.getLocation();
    }

  // addRow( selectOption1?: string, selectOption2?: string, selectOption3?: string, selectOption4?: string,textarea?: string, checkbox?: string,input?:string, input1?: string, input2?: string, input3?: string, input4?: string, input5?: string, input6?: string, input7?: string): void {
  //   this.rows.push({
  //     selectOption1: selectOption1 || '',
  //     selectOption2: selectOption2 || '',
  //     selectOption3: selectOption3 || '',
  //     selectOption4: selectOption4 || '',
  //     textarea: textarea || '',
  //     checkbox: checkbox || '',
  //     input1: input1 || '',
  //     input2: input2 || '',
  //     input3: input3 || '',
  //     input4: input4 || '',
  //     input5: input5 || '',
  //     input6: input6 || '',
  //     input7: input7 || '',
     
  //   });
  // }

  deleteRow(index: number): void {
    this.rows.splice(index, 1);
    this.updateSerialNumbers();
  }

  // deleteAllRows(): void {
  //   this.rows = this.rows.slice(0, 3);
  //   this.updateSerialNumbers();
  // }

  private updateSerialNumbers(): void {
    this.rows.forEach((row, index) => {
      row['sno'] = index + 1;
    });
  }

  private addRowWithValues( selectedItem1: any, selectedItem2: any, selectedItem3: any, selectedItem4: any, textarea: string, checkbox: any, input1: any, input2: any, input3: any, input4: any, input5: any, input6: any, input7: any,): void {
    this.addRow(selectedItem1, selectedItem2, selectedItem3, selectedItem4, textarea, checkbox, input1, input2, input3, input4, input5, input6, input7);
  }
 

  selectedItem: string;
  dropdownOptions: string[] = [];

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
  
  getProjectName() {
    let Req = {
      TraineeID: this.TraineeID
    };
    this.Service.getCreateProjectList(Req).subscribe((x: any) => {
      this.dropdownOptions1 = x.result;
    });
  }

  selectedItem2: string;
  dropdownOptions2: string[] = [];

  selectOption2(option: string): void {
    this.selectedItem2 = option;
  }


  getPayItem() {
    let Req = {
      OrgID: this.OrgID
    };
    this.Service.getPayItemList(Req).subscribe((x: any) => {
      this.dropdownOptions2 = x.result;
    });
  }


  selectedItem3: string;
  dropdownOptions3: string[] = ['Service'];

  selectOption3(option: string): void {
    this.selectedItem3 = option;
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
