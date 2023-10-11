import { Component, OnInit } from '@angular/core';
export interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-all-job-postings',
  templateUrl: './all-job-postings.component.html',
  styleUrls: ['./all-job-postings.component.scss']
})
export class AllJobPostingsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'phone'];
  dataSource: UserData[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
    // Add more data as needed
  ];

  constructor() { }
  // displayedColumns: string[] = ['Job Title', 'Company', 'Location',"Pay Rate","New Applicants","Posted On","Posted By","Job Type","Assignee","Open"];
  // dataSource: any = [];
  ngOnInit(): void {
    // this.dataSource = [
    //   { id: 1, jobtitle: 'Senior Developer', company: 'Tresume', location: 'Chennai',payrate:"$20",newapplicants:"10",postedon:"12/10/2023",postedby:"wilson.am@tresume.us",assignee:"Wilson",open:"" },
    //   { id: 2, jobtitle: 'Angular Developer', company: 'Asta', location: 'Banglore',payrate:"$20",newapplicants:"5",postedon:"12/10/2023",postedby:"wilson.am@tresume.us",assignee:"Wilson",open:"" }
    // ];
  }

}
