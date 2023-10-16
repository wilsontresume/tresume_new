import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';

interface Job {
  jobTitle: string;
  company: string;
  location: string;
  payRate: number;
  newApplicants: number;
  totalApplicants: number;
  postedOn: Date;
  postedBy: string;
  jobType: string;
  assignee: string;
  open: boolean;
}
@Component({
  selector: 'app-all-job-postings',
  templateUrl: './all-job-postings.component.html',
  styleUrls: ['./all-job-postings.component.scss']
})
export class AllJobPostingsComponent {



  public jobs: Job[] = [
    {
      jobTitle: 'Software Engineer',
      company: 'Tech Corp',
      location: 'New York',
      payRate: 80000,
      newApplicants: 10,
      totalApplicants: 50,
      postedOn: new Date(),
      postedBy: 'John Doe',
      jobType: 'Full-time',
      assignee: 'Alice',
      open: true
    },
  ];

 
  constructor(private dialog: MatDialog) {}

  confirmDeleteJob(job: Job) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ${job.jobTitle}?` }
    });
  
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        console.log('Deleting job:', job);
        
      }
    });
  
}
jobOptions = ['My Jobs', 'Assigned Jobs', 'All Jobs'];
  selectedJobOption: string;

  // onJobOptionChange(event: any) {
  //   this.selectedJobOption = event.target.value;
  //   console.log('Selected job option:', this.selectedJobOption);
    
  // }

}
