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

  // adminlist: any;
  // projectname: any;   
  // clientname: any;
  // netterms: any;
  // userlist: any;
  // allusers: any;
  // trainee: any;
  
  orgID: string;
   clients: any;
   project: any;
  showConfirmationDialog: any;
  addnewproject: FormGroup;
  ClientName: any;
  ProjectName: any;
  TraineeID: string = '';
  organizationid: any;
  Candidates: any;
  selectedCandidate: any;
  filteredCandidates: any;
  StartDate: any;
  EndDate: any;

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private service: CreateProjectService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.addnewproject = this.fb.group({
      ProjectName: ['', [Validators.required, Validators.minLength(3)]],
      ClientName: ['', [Validators.required]],
      Billable: [''],
      StartDate: [''],
      EndDate: [''],
      selectedCandidate: [''],
    });
    this.TraineeID = this.cookieService.get('TraineeID');
    this.orgID = this.cookieService.get('OrgID');
    this.fetchclientlist();
    //this.fetchgetProjectList();
    this.fetchcandidatelist();
  }

  fetchclientlist() {
    let Req = {
      TraineeID: this.TraineeID,
    };
    this.service.getTraineeClientList(Req).subscribe((x: any) => {
      this.clients = x.result;
      console.log(this.clients);
    });
  }

  fetchcandidatelist() {
    let Req = {
      organizationid: this.orgID,
    };
    this.service.getTimesheetCandidateList(Req).subscribe((x: any) => {
      this.Candidates = x.result;
      console.log(this.Candidates);
    });
  }

  // fetchgetProjectList() {
  //   let Req = {
  //     orgid: this.orgID,
  //   };
  //   this.service.getProjectList(Req).subscribe((x: any) => {
  //     this.project = x.result;
  //     console.log(this.projectname);
  //   });
  // }

  addproject() {
    let Req = {
      ProjectName: this.addnewproject.value.ProjectName,
      Billable: this.addnewproject.value.Billable,
      ClientName: this.addnewproject.value.ClientName,
      Candidates: this.addnewproject.value.Candidates,
      selectedCandidate: this.addnewproject.value.selectedCandidates,
      StartDate: this.addnewproject.value.StartDate,
      EndDate: this.addnewproject.value.EndDate,
      orgID: this.orgID,
      TraineeID: this.TraineeID,
    };


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
  }


  cancel() {
    this.addnewproject.reset();
  }

  createproject() {
    this.showConfirmationDialog = true;
  }

  cancelProject() {
    this.showConfirmationDialog = false;
  }

}



// this.Candidates =
//   [{ name: 'Candidate 1' },
//   { name: 'Candidate 2' },
//   { name: 'Candidate 3' },
//   ];

// this.clientname = [
//   { id: 1, name: 'Client A' },
//   { id: 2, name: 'Client B' },
//   { id: 3, name: 'Client C' },
// ];


// import { Component, OnInit } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
// import { CreateProjectService } from './create-project.service';
// import { MessageService } from 'primeng/api';
// import { FormBuilder } from '@angular/forms';

// @Component({
//   selector: 'app-create-project',
//   templateUrl: './create-project.component.html',
//   styleUrls: ['./create-project.component.scss'],
//   providers: [CookieService, CreateProjectService, MessageService],
// })
// export class CreateProjectComponent implements OnInit {

//   adminlist: any;
//   netterms: any;
//   userlist: any;
//   allusers: any;
//   orgID: string;
//   TraineeID: string = '';
//   projectname: any;
//   clientname: any;

//   client: any;
//   clients: any[];
//   project: any;
//   projects: any[];
//   Candidates: any;
//   selectedCandidate: any;
//   filteredCandidates: any;
//   showConfirmationDialog: any;
//   showConfirmationDialog1: any;

//   constructor(private cookieService: CookieService, private service: CreateProjectService, private messageService: MessageService, private fb: FormBuilder) {

//     this.Candidates =
//       [{ name: 'Candidate 1' },
//       { name: 'Candidate 2' },
//       { name: 'Candidate 3' },
//       ];

//     this.projects = [
//       { id: 101, name: 'Project X' },
//       { id: 102, name: 'Project Y' },
//       { id: 103, name: 'Project Z' },
//     ];

//    this.clients = [
//       { id: 1, name: 'Client A' },
//       { id: 2, name: 'Client B' },
//       { id: 3, name: 'Client C' },
//     ];
//   }

//   ngOnInit(): void {
//     this.project = this.fb.group({
//       selectedClient: [''],
//       selectedProject: [''],
//       selectedCandidates: [[]],
//       startDate: [''],
//       endDate: ['']
//     });

//     this.TraineeID = this.cookieService.get('TraineeID');
//     this.orgID = this.cookieService.get('OrgID');
//     this.fetchclientlist();
//     this.fetchgetProjectList();
//   }

//   onCandidateSearch(event: any) {
//     this.filteredCandidates = this.Candidates.filter((option: string) =>
//       option.toLowerCase().includes(event.query.toLowerCase())
//     );
//   }

//   createproject() {
//     this.showConfirmationDialog = true;
//   }

//   cancelProject() {
//     console.log(this.showConfirmationDialog);
//     this.showConfirmationDialog = false;
//   }

//   createclient() {
//     this.showConfirmationDialog1 = true;
//   }

//   cancelClient() {
//     console.log(this.showConfirmationDialog1);
//     this.showConfirmationDialog1 = false;
//   }

//   fetchclientlist() {
//     let Req = {
//       TraineeID: this.TraineeID,
//     };
//     this.service.getTraineeClientList(Req).subscribe((x: any) => {
//       this.client = x.result;
//       console.log(this.clientname);
//     });
//   }

//   fetchgetProjectList() {
//     let Req = {
//       orgid: this.orgID,
//     };
//     this.service.getProjectList(Req).subscribe((x: any) => {
//       this.project = x.result;
//       console.log(this.projectname);
//     });
//   }

//   addproject() {
//     console.log(this.clientname)
//     let Req = {
//       orgID: this.orgID,
//       clientid: this.clientname,
//       projectname: this.projectname,
//       netterms: this.netterms,
//       TraineeID: this.TraineeID
//     };
//     this.service.createtimesheetproject(Req).subscribe((x: any) => {
//       this.clients = x.result;
//       console.log(this.clients);
//     });
//     this.fetchgetProjectList();
//   }
// }
