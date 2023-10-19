import { Component} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';



@Component({
  selector: 'app-talent-bench',
  templateUrl: './talent-bench.component.html',
  styleUrls: ['./talent-bench.component.scss']
})
export class TalentBenchComponent  {
  candidates: string[] = ['Candidate 1', 'Candidate 2', 'Candidate 3'];
  formData: any = {};

 
  recruiterNames: string[] = ['Recruiter 1', 'Recruiter 2', 'Recruiter 3'];
  candidateStatuses: string[] = ['Active', 'Inactive', 'On Hold'];
  marketerNames: string[] = ['Marketer 1', 'Marketer 2', 'Marketer 3'];
  referralTypes: string[] = ['Type 1', 'Type 2', 'Type 3'];

  onSubmit() {
   
    console.log('Form Data:', this.formData);
  }
  
  dataArray: any[] = [
    { groupName: 'Group A', candidateCount: 10 },
    { groupName: 'Group B', candidateCount: 5 },
  ];

  tableData: any[] = [
    {
      benchId: 1,
      name: 'John Doe',
      email: 'john@example.com',
      location: 'New York',
      timeOnBench: 30,
      title: 'Developer',
      phone: '123-456-7890',
      status: 'Active',
      billRate: 50,
      refer: 'Referrer',
      groupName: 'group1'
    },
  ];

  onIconClick() {
    alert('Icon was clicked!'); 
  }
  
}
