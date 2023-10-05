import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
@Component({
  selector: 'app-timesheet-create',
  templateUrl: './timesheet-create.component.html',
  styleUrls: ['./timesheet-create.component.scss']
})
export class TimesheetCreateComponent implements OnInit {



  ngOnInit(): void {
  }

  minDate: string; // Set the minimum date for Sunday selection
  maxDate: string; // Set the maximum date for Sunday selection
  selectedSunday: string; // Store the selected Sunday date
  timesheetRows: any[] = []; // Store timesheet row data
  isSundaySelected: boolean = false;

  CAselectedFile: File | null = null;
  SRselectedFile: File | null = null;
  constructor() {

    this.timesheetRows.push({
      project: '',
      sunHours: '',
      monHours: '',
      tueHours: '',
      wedHours: '',
      thuHours: '',
      friHours: '',
      satHours: '',
      comments: '',
      totalHours: ''
    });
  }

  selectSunday(selectedDate: string) {
    const selectedDateObj = new Date(selectedDate);
    const dayOfWeek = selectedDateObj.getDay(); // 0 = Sunday, 1 = Monday, ...
  
    // Check if the selected date is a Sunday (dayOfWeek === 0)
    if (dayOfWeek === 0) {
      this.selectedSunday = selectedDate;
      this.isSundaySelected = true;
    } else {
      // If not a Sunday, calculate the previous Sunday date
      const previousSunday = new Date(selectedDateObj);
      previousSunday.setDate(selectedDateObj.getDate() - dayOfWeek);
  
      // Format the previous Sunday date as "YYYY-MM-DD"
      const formattedDate = previousSunday.toISOString().split('T')[0];
  
      this.selectedSunday = formattedDate;
      this.isSundaySelected = true;
    }
  }
  
  

  addRow() {
    this.timesheetRows.push({
      project: '',
      sunHours: '',
      monHours: '',
      tueHours: '',
      wedHours: '',
      thuHours: '',
      friHours: '',
      satHours: '',
      comments: '',
      totalHours: ''
    });
  }

  removeRow(index: number) {
    if (index >= 0 && index < this.timesheetRows.length) {
      this.timesheetRows.splice(index, 1);
    }
  }

  saveTimesheet() {
    // Create a FormData object to send both timesheetData and the file
    const formData = new FormData();
    if (this.CAselectedFile) {
      formData.append('CAfile', this.CAselectedFile, this.CAselectedFile.name);
    }
    if (this.SRselectedFile) {
      formData.append('CAfile', this.SRselectedFile, this.SRselectedFile.name);
    }
    formData.append('timesheetData', JSON.stringify(this.timesheetRows));

    fetch('yourServiceEndpoint', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        // Handle the response from the server as needed
        console.log(response);
      })
      .catch(error => {
        // Handle errors
        console.error(error);
      });
  }

  cancel() {
    // Implement the logic to navigate back to the timesheet page
  }

  onFileSelected(event: Event,Type:string) {
    const inputElement = event.target as HTMLInputElement;
    if(Type == "1"){
      if (inputElement.files) {
        this.CAselectedFile = inputElement.files[0];
      }
    }else{
      if (inputElement.files) {
        this.SRselectedFile = inputElement.files[0];
      }
    }
   
  }

}
