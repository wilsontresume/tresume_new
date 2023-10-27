import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {  selectedOption: string;
  roles: string[] = [];
  
  // candidates: string[] = ['Candidate 1', 'Candidate 2', 'Candidate 3'];

  addRow() {
    if (this.selectedOption) {
      this.roles.push(this.selectedOption);
    }
  }
  deleteRow(index: number) {
    
    this.roles.splice(index, 1);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
