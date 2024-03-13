import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CreateProjectService } from './create-project.service';
import { MessageService } from 'primeng/api';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  isFormValid: boolean = false;
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
  loading:boolean = false;

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private service: CreateProjectService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.TraineeID = this.cookieService.get('TraineeID');
    this.OrgID= this.cookieService.get('OrgID');
    this.username = this.cookieService.get('userName1');
    this.fetchgetProjectList();

    this.addnewproject = this.fb.group({
      Projectname: ['', Validators.required],
      ClientName: ['', Validators.required],
      Billable: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required]
    });

    this.addnewproject.valueChanges.subscribe(() => {
      this.isFormValid = this.addnewproject.valid;
    });
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
    this.loading = false;
  }

  addproject() {
    this.loading = true;
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
        this.fetchgetProjectList();
        this.handleSuccess(res);
        this.addnewproject.reset();
        this.selectedCandidate = [];
        (this.addnewproject.get('ClientName') as AbstractControl).setValue(null);
      },
      (error: any) => {
        console.error('Error creating project:', error);
        this.handleError(error);
      }
    );
    this.cancelProject();
  }

  createproject() {
    this.addnewproject.reset();
    this.Candidates = [];
    this.fetchclientlist();
    this.fetchcandidatelist();
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
    this.loading = true;
    let Req = {
      projectid: this.deleteIndex,
    };
    this.service.deleteProject(Req).subscribe((x: any) => {
      var flag = x.flag;
      if (flag === 1) {
        this.messageService.add({ severity: 'error',summary:  'Error', detail: 'Delete Error' });
        this.loading = false;
      } else {
        this.messageService.add({ severity: 'success', summary:  'Success', detail: 'Deleted successfully'  });
        this.fetchgetProjectList();
        this.loading = false;
      }
    });
    this.showConfirmationDialog1 = false;
  }

  cancelDelete() {
    console.log(this.showConfirmationDialog1);
    this.showConfirmationDialog1 = false;
  }

  private handleSuccess(response: any): void {
    this.messageService.add({ severity: 'success', summary:  'Success', detail: 'Project created successfully'  });
    console.log(response);
    this.loading = false;
  }
  
  private handleError(response: any): void {
    this.messageService.add({ severity: 'error',summary:  'Error', detail: 'Project cannot be created' });
    this.loading = false;
  }

}


