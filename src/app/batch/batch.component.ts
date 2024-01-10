import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit {
  batchName: string;
  startDate: string;
  endDate: string;
  loading:boolean = false;

  cancel() {
    // Add your cancel logic here
  }

  save() {
    // this.loading=true;
    // Add your save logic here
  }

  constructor() { }

  ngOnInit(): void {

  }
  openAddBatchDialog() {
    // Implement dialog opening logic here
  }

  editBatch() {
    // Implement edit functionality
  }

  // deleteBatch() {
  //   // Implement delete functionality
  // }
}
