import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent {

  isAdmin: boolean = true; 
  projects: any[] = [ 
    {
      projectName: 'Project 1',
      sunday: 'Sun Data 1',
      status: 'Approved'
    },
    {
      projectName: 'Project 2',
      sunday: 'Sun Data 2',
      status: 'Rejected'
    }
  ];

  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/main-view']);
  }

  approveAllProjects() {
    console.log('All projects approved.');
  }

  rejectAllProjects() {
    console.log('All projects rejected.');
  }
  
}







