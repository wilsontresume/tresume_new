import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent {
  loading:boolean = false;

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


  downloadDocument(cartNumber: number): void {
    console.log(`Downloading document for Cart ${cartNumber}`);
  }

}







