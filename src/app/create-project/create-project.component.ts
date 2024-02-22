import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CreateProjectService } from './create-project.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  providers: [CookieService, CreateProjectService, MessageService],
})
export class CreateProjectComponent implements OnInit {

  OrgID: string = '';
  clients: any;
  project: any;
  showConfirmationDialog: any;
  showConfirmationDialog1: any;
  addnewproject: FormGroup;
  ClientName: any;
  ProjectName: any;
  TraineeID: string = '';
  organizationid: any;
  Candidates: any;
  selectedCandidate: any[] = [];
  filteredCandidates: any;
  StartDate: any;
  EndDate: any;
  username: string;
  Projectname: any;
  deleteIndex: number;

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private service: CreateProjectService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.addnewproject = this.fb.group({
      Projectname: ['', [Validators.required, Validators.minLength(3)]],
      ClientName: ['', [Validators.required]],
      Billable: [''],
      StartDate: [''],
      EndDate: [''],
      selectedCandidate: [''],
    });
    this.TraineeID = this.cookieService.get('TraineeID');
    this.OrgID= this.cookieService.get('OrgID');
    this.username = this.cookieService.get('userName1');
    this.fetchclientlist();
    this.fetchgetProjectList();
    this.fetchcandidatelist();
  }

  fetchclientlist() {
    let Req = {
      TraineeID: this.TraineeID,
      OrgID: this.OrgID,
    };
    this.service.getTraineeClientList(Req).subscribe((x: any) => {
      this.clients = x.result;
      console.log(this.clients);
    });
  }

  fetchcandidatelist() {
    let Req = {
      organizationid: this.OrgID,
    };
    this.service.getTimesheetCandidateList(Req).subscribe((x: any) => {
      this.Candidates = x.result;
      console.log(this.Candidates);
    });
  }

  fetchgetProjectList() {
    let Req = {
      orgid: this.OrgID,
    };
    this.service.getProjectList(Req).subscribe((x: any) => {
      this.project = x.result;
      console.log(this.Projectname);
    });
  }

  addproject() {
    const candidate = this.selectedCandidate.map(item => item.traineeid); 

    let Req = {
      Projectname: this.addnewproject.value.Projectname,
      billableamt: this.addnewproject.value.Billable,
      clientid: this.addnewproject.value.ClientName,
      candidate: candidate.join(','),
      startdate: this.addnewproject.value.StartDate,
      enddate: this.addnewproject.value.EndDate,
      orgid: this.OrgID,
      TraineeID: this.TraineeID,
      createdby:this.username
    };
    console.log(Req);
    this.service.createtimesheetproject(Req).subscribe(
      (res: any) => {
        this.project = res.result;
        console.log(this.project);
      },
      (error: any) => {
        console.error('Error creating project:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create the project. Please try again.',
        });
      }
    );
    this.addnewproject.reset();
    this.Candidates = [];
    this.fetchgetProjectList();
    this.cancelProject();
  }

  createproject() {
    this.showConfirmationDialog = true;
  }

  cancelProject() {
    this.showConfirmationDialog = false;
  }
  
  delete(projectid: number) {
    this.deleteIndex = projectid;
    console.log(this.deleteIndex);
    this.showConfirmationDialog1 = true;
  }

  confirmDelete() {
    console.log(this.deleteIndex);
    let Req = {
      projectid: this.deleteIndex,
    };
    this.service.deleteProject(Req).subscribe((x: any) => {
      var flag = x.flag;
      this.fetchgetProjectList();
      if (flag === 1) {
        this.messageService.add({
          severity: 'success',
          summary: 'Project Deleted Sucessfully',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Please try again later',
        });
      }

    });
    this.showConfirmationDialog1 = false;
    this.fetchgetProjectList();
  }

  cancelDelete() {
    console.log(this.showConfirmationDialog1);
    this.showConfirmationDialog1 = false;
  }

}


