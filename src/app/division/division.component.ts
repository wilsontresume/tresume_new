import { DivisionService } from './divisions.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  providers: [DivisionService, CookieService],
  styleUrls: ['./division.component.scss'],
})
export class DivisionComponent implements OnInit {
  public OrgID: any;
  public userName: any;
  public TraineeID: any;
  public DivisionName: any;

  public recruiter: any[] = [];
  public division: any[] = [];
  public divrecruiter: any[] = [];
  public sRecruiter: any;
  public sdivision: any;
  public mdivision:any;
  public mtype:any =1;
  public dice:any;
  public monster:any;
  public cb:any;

  public iseditable:any = false;

  constructor(
    private cookieService: CookieService,
    private service: DivisionService
  ) {}

  ngOnInit(): void {
    // this.cookieService.set( 'userName', 'karthik@tresume.us' );
    // this.cookieService.set( 'OrgID', '82' );
    // this.cookieService.set( 'TraineeID', '36960' );
    this.OrgID = this.cookieService.get('OrgID');
    this.userName = this.cookieService.get('userName1');
    this.TraineeID = this.cookieService.get('TraineeID');
    console.log(this.OrgID);
    this.fetchrecruiter();
    this.fetchdivision();
  }

  public Oncreate() {
    let Req = {
      DivisionName: this.DivisionName,
      OrgID: this.OrgID,
      userName: this.userName,
      dice:this.dice,
      monster:this.monster,
      cb:this.cb,
      type:this.mtype
    };
    this.service.createdivision(Req).subscribe((x) => {
      console.log('Inserted');
      this.fetchrecruiter();
      this.fetchdivision();
    });
  }

  public fetchrecruiter() {
    let Req = {
      OrgID: this.OrgID,
      userName: this.userName,
    };
    console.log(this.OrgID);
    this.service.fetchrecruiter(Req).subscribe((x: any) => {
      this.recruiter = x.result;
    });
  }

  public editdata(data:any){
    console.log(data);
    let Req = {
      id: data.id,
      dice:data.dice,
      monster:data.monster,
      cb:data.cb,
    
    };
    console.log(Req)
    this.service.updatedivision(Req).subscribe((x) => {
      console.log('Updated');
    });
  }
  public deletedata(data:any){
    console.log(data);
    let Req = {
      id: data.id,    
    };
    console.log(Req)
    this.service.deletedivision(Req).subscribe((x) => {
      console.log('Deleted');
    });
    this.fetchdivision();
    this.fetchrecruiter();
  }


  public fetchdivision() {
    let Req = {
      OrgID: this.OrgID,
      userName: this.userName,
    };
    console.log(this.OrgID);
    this.service.fetchrecruiterbyorg(Req).subscribe((y: any) => {
      this.division = y.result;
    });
    this.service.fetchdivisionbyorg(Req).subscribe((x: any) => {
      this.divrecruiter = x.result;
    });
  }

 public toggle(row:any) {
    row.active = !row.active;
  };

  public assignrecruiter() {
    console.log(this.sRecruiter);
    console.log(this.sdivision);
    let Req = {
      OrgID:this.OrgID,
      recID:this.sRecruiter,
      divID:this.sdivision
    }
    this.service.addrecruitertodiv(Req).subscribe((x) => {
      console.log('Updated');
    });
    this.fetchdivision();
    this.fetchrecruiter();
  }
}
