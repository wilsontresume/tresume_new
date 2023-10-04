import { Component, OnInit } from '@angular/core';

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
    // Implement the logic to send data to the "timesheetCreate" service
    // Ensure that all fields are filled and valid before sending
  }

  cancel() {
    // Implement the logic to navigate back to the timesheet page
  }

}
