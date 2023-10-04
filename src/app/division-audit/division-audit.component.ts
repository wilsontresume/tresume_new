import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DivisionAuditService } from './divisions-audit.service';

@Component({
  selector: 'app-division-audit',
  templateUrl: './division-audit.component.html',
  providers: [DivisionAuditService, CookieService],
  styleUrls: ['./division-audit.component.scss']
})
export class DivisionAuditComponent implements OnInit {

  public OrgID: any;
  public userName:any;
  public TraineeID:any;

  constructor(
    private cookieService: CookieService,
    private service: DivisionAuditService
    ) { }

  ngOnInit(): void {
    this.OrgID = this.cookieService.get('OrgID');
    this.userName = this.cookieService.get('userName1');
    this.TraineeID = this.cookieService.get('TraineeID');
  }

}
