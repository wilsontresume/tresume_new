import { Component } from '@angular/core';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailsComponent{

  applicants: any[] = [
    { date: '12/10/2023', name: 'Wilson', jobTitle: 'Senior Developer', legalStatus: 'Approved', payRate: '$ 500',source:'abcde' },
    { date: '13/10/2023', name: 'Bala', jobTitle: 'Junior Developer', legalStatus: 'Approved', payRate: '$ 400',source:'fghij' },
    { date: '14/10/2023', name: 'Francy', jobTitle: 'Junior Developer', legalStatus: 'Approved', payRate: '$ 300',source:'klmno' },
    { date: '15/10/2023', name: 'Maria', jobTitle: 'Junior Developer', legalStatus: 'Approved', payRate: '$ 200',source:'pqrst' },
  ];

  displayedApplications: number = this.applicants.length;
  totalApplications: number = this.applicants.length;
  
  performSearch(searchTerm: string) {
    this.applicants = this.applicants.filter(applicant =>
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.displayedApplications = this.applicants.length;
  }
}
