import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ar-aging-report',
  templateUrl: './ar-aging-report.component.html',
  styleUrls: ['./ar-aging-report.component.scss']
})
export class ArAgingReportComponent implements OnInit {

  clients = [
    { name: 'Anthem Hays Talent Solutions', current: 0.00, oneTo30: 9120.00, thirtyOneTo60: 3840.00, sixtyOneTo90: 2400.00, ninetyOneAndOver: 0.00, total: 15360.00 },
    { name: '210 N Charles Owner LLC', current: 24000.00, oneTo30: 24000.00, thirtyOneTo60: 0.00, sixtyOneTo90: 0.00, ninetyOneAndOver: 0.00, total: 24000.00 },
    { name: '22nd Century Technologies Inc', current: 0.00, oneTo30: 7488.00, thirtyOneTo60: 0.00, sixtyOneTo90: 0.00, ninetyOneAndOver: 0.00, total: 7488.00 },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
