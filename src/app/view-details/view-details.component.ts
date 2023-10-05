import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent {

  isAdmin: boolean = true;  // Set to true for admin, false for non-admin
  projects: any[] = [  // Add your project data here
    {
      projectName: 'Project 1',
      sunday: 'Sun Data 1',
      // ... Add other project properties
      status: 'Approved'
    },
    {
      projectName: 'Project 2',
      sunday: 'Sun Data 2',
      // ... Add other project properties
      status: 'Rejected'
    }
    // ... Add more projects as needed
  ];

  constructor(private router: Router) { }

  goBack() {
    // Navigate back to the main view (you should replace 'main-view' with the actual route of your main view)
    this.router.navigate(['/main-view']);
  }

  approveAllProjects() {
    // Implement approve all projects logic here
    console.log('All projects approved.');
  }

  rejectAllProjects() {
    // Implement reject all projects logic here
    console.log('All projects rejected.');
  }
  
}







