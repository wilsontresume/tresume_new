import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-all-time-sheet',
  templateUrl: './all-time-sheet.component.html',
  styleUrls: ['./all-time-sheet.component.scss']
})
export class AllTimeSheetComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToViewDetails(id: number): void {
    this.router.navigate(['/timesheet/viewdetails', id]); 
  }

}
