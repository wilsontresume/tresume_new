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
  
  selectedOption: string = '';
  selectOption1: string = '';
  // row = { selectOption1: '', selectOption2: '' };

  dropdownOptions1 = {
    placeholder: "Choose a client or project",
    items: [
      { value: 'A1', label: 'Option A1' },
      { value: 'B1', label: 'Option B1' },
      { value: 'C1', label: 'Option C1' },
    ]
  };

  dropdownOptions2 = {
    placeholder: "Select pay item",
    items: [
      { value: 'A2', label: 'Option A2' },
      { value: 'B2', label: 'Option B2' },
      { value: 'C2', label: 'Option C2' },
    ]
  };

  dropdownOptions3 = {
    placeholder: "Choose the service worked on",
    items: [
      { value: 'A3', label: 'Option A3' },
      { value: 'B3', label: 'Option B3' },
      { value: 'C3', label: 'Option C3' },
    ]
  };

  dropdownOptions4 = {
    placeholder: "Choose a location",
    items: [
      { value: 'A4', label: 'Option A4' },
      { value: 'B4', label: 'Option B4' },
      { value: 'C4', label: 'Option C4' },
    ]
  };
 
  constructor(private fb: FormBuilder,private router: Router, private Service: CreateAllTimeListService) {

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

  // addRow() {
  //   const row = this.formBuilder.group({
  //     project: ['', Validators.required],
  //     sunHours: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  //     monHours: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  //     tueHours: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  //     wedHours: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  //     thuHours: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  //     friHours: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  //     satHours: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  //     comments: [''],
  //     totalHours: ['']
  //   });

  //   this.timesheetData.push(row);
  // }

  // removeRow(index: number) {
  //   if (index >= 0 && index < this.timesheetData.length) {
  //     this.timesheetData.splice(index, 1);
  //   }
  // }

  // async saveTimesheet() {
  //   const formData = new FormData();
  //   if (this.CAselectedFile) {
  //     formData.append('CAfile', this.CAselectedFile, this.CAselectedFile.name);
  //   }
  //   if (this.SRselectedFile) {
  //     formData.append('SRfile', this.SRselectedFile, this.SRselectedFile.name);
  //   }
  //   formData.append('timesheetData', JSON.stringify(this.timesheetData));
  
  //   try {
  //     const response = await this.Service.createTimesheet(formData).toPromise();
  //     console.log(response);
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //   }
  // }

  // cancel() {
  //   this.timesheetData = [];
  //   this.CAselectedFile = null;
  //   this.SRselectedFile = null;
  //   this.addRow();
  //   this.selectedSunday = '';
  //   this.isSundaySelected = false;
  //   this.router.navigate(['/all-time-list']).catch((error) => {
  //     console.error('Navigation error:', error);
  //   });
  // }

  // onFileSelected(event: Event, Type: string) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (Type === "1") {
  //     if (inputElement.files) {
  //       this.CAselectedFile = inputElement.files[0];
  //     }
  //   } else {
  //     if (inputElement.files) {
  //       this.SRselectedFile = inputElement.files[0];
  //     }
  //   }
  // }

  rows: any[] = [];



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
 selectedValue: string = '';
  dropdownOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];

  selectOption(option: string) {
    this.selectedValue = option;
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
