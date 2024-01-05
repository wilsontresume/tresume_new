import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  minDate: string;
  maxDate: string;
  selectedSunday: string = '';
  isSundaySelected: boolean = false;
  CAselectedFile: File | null = null;
  SRselectedFile: File | null = null;
  [key: string]: any;
  file1: File | null = null;
  file2: File | null = null;

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

  
  rowData = { selectedValue: '' };
  dropdownOptions = { items: [{ value: 'Option 1', label: 'Option 1' }, { value: 'Option 2', label: 'Option 2' }] };


  rowData1 = { selectedValue: '' };
  dropdownOptions1 = { items: [{ value: 'Option 1', label: 'Option 1' }, { value: 'Option 2', label: 'Option 2' }] };

 
  rowData2 = { selectedValue: '' };
  dropdownOptions2 = { items: [{ value: 'Option 1', label: 'Option 1' }, { value: 'Option 2', label: 'Option 2' }] };


  rowData3 = { selectedValue: '' };
  dropdownOptions3 = { items: [{ value: 'Option 1', label: 'Option 1' }, { value: 'Option 2', label: 'Option 2' }] };

 
  rowData4 = { selectedValue: '' };
  dropdownOptions4 = { items: [{ value: 'Option 1', label: 'Option 1' }, { value: 'Option 2', label: 'Option 2' }] };

 

  selectOption(row: { selectedValue: string }, value: string): void {
    row.selectedValue = value;
  }



  constructor(private fb: FormBuilder,private router: Router, private Service: CreateAllTimeListService, private messageService: MessageService, private cookieService: CookieService) {

  }

  ngOnInit(): void {
    this.addRowWithValues('option1', 'option2', 'option3', 'option4', '','','', '', '', '', '', '', '' );
    this.addRowWithValues('option1', 'option2', 'option3', 'option4','','', '', '', '', '', '', '', '' );
    this.addRowWithValues('option1', 'option2', 'option3', 'option4','','', '', '', '', '', '', '', '' );
  }

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




  addRow( selectOption1?: string, selectOption2?: string, selectOption3?: string, selectOption4?: string,textarea?: string, checkbox?: string,input?:string, input1?: string, input2?: string, input3?: string, input4?: string, input5?: string, input6?: string, input7?: string): void {
    this.rows.push({
      selectOption1: selectOption1 || '',
      selectOption2: selectOption2 || '',
      selectOption3: selectOption3 || '',
      selectOption4: selectOption4 || '',
      textarea: textarea || '',
      checkbox: checkbox || '',
      input1: input1 || '',
      input2: input2 || '',
      input3: input3 || '',
      input4: input4 || '',
      input5: input5 || '',
      input6: input6 || '',
      input7: input7 || '',
     
    });
  }

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

  private addRowWithValues( selectOption1: string, selectOption2: string, selectOption3: string, selectOption4: string, textarea: string, checkbox: string, input1: string, input2: string, input3: string, input4: string, input5: string, input6: string, input7: string,): void {
    this.addRow(selectOption1, selectOption2, selectOption3, selectOption4, textarea, checkbox, input1, input2, input3, input4, input5, input6, input7, );
  }
 

}
