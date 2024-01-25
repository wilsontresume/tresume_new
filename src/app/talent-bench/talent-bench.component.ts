import { TalentBenchService } from './talent-bench.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-talent-bench',
  templateUrl: './talent-bench.component.html',
  styleUrls: ['./talent-bench.component.scss'],
  providers: [TalentBenchService, CookieService, MessageService],
})
export class TalentBenchComponent implements OnInit {

  loading: boolean = true;
  candidates: string[] = ['Candidate 1', 'Candidate 2', 'Candidate 3'];
  // formData: any = {};
  OrgID: string = '';
  userName: string = '';
  TraineeID: string = '';
  addCandidate: any;
  recruiterName: any;
  selectedcurrentstatus: any;
  currentStatusOptions: any = [];
  legalStatusOptions: any;
  legalStatus: string[] = [];
  tableData: any[] = [];
  searchTerm: string = '';
  noResultsFound: boolean = false;
  newGroupName: any;
  grouplistdata: any;
  groupOptions: any;
  groupname: any;

  constructor(private dialog: MatDialog, private cookieService: CookieService, private service: TalentBenchService, private messageService: MessageService, private formBuilder: FormBuilder) {
  }

  recruiterNames: string[] = [];
  candidateStatuses: string[] = [];
  marketerNames: string[] = [''];
  marketerName: string[] = [''];
  referralTypes: string[] = ['Phone', 'Email', 'Others'];
  referralType: string[] = [''];


  // onSubmit() {
  //   console.log('Form Data:', this.formData);
  // }

  dataArray: any[] = [
    { groupname: 'Group A', candidateCount: 10 },
    { groupname: 'Group B', candidateCount: 5 },
  ];

  onIconClick() {
    alert('are you sure want to delete?');
  }


  ngOnInit(): void {
    this.loading = true;
    // this.cookieService.set('userName1','karthik@tresume.us');
    // this.cookieService.set('OrgID','82');
    // this.cookieService.set('TraineeID','569');
    // this.cookieService.set('TimesheetRole','1');
    // this.cookieService.set('RoleID','17');
    this.OrgID = this.cookieService.get('OrgID');
    this.userName = this.cookieService.get('userName1');
    this.TraineeID = this.cookieService.get('TraineeID');
    this.fetchtalentbenchlist();
    this.getcandidaterstatus();
    this.getLegalStatusOptions();
    this.getOrgUserList();
    this.getGroupList();
    this.fetchgrouplist();

    this.addCandidate = this.formBuilder.group({
      FirstName: ['', [Validators.required, Validators.minLength(3)]],
      MiddleName: [''],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.minLength(3)]],
      Phone: ['', [Validators.required, Validators.minLength(3)]],
      Gender: ['male'],
      RecruiterName: [''],
      Degree: [''],
      University: [''],
      CandidateStatus: [''],
      Groups: [''],
      LegalStatus: [''],
      marketerName: ['', Validators.required],
      LocationConstraint: ['yes'],
      ReferralType: [''],
      Notes: [''],
    });
  }

  search: string = '';

isCandidateVisible(candidate: any): boolean {
  console.log(candidate);
  const searchValue = this.search.toLowerCase();
  return (
    candidate.FirstName.toLowerCase().includes(searchValue) ||
    candidate.LastName.toLowerCase().includes(searchValue) ||
    candidate.UserName.toLowerCase().includes(searchValue)
  );
}

updateSelected(selectedId: string, traineeID: number,type:any) {
  this.loading = true;
 var req = {}
 if(type == 1){
  req = {
    traineeid : traineeID,
    groupid : selectedId,
    marketername : ''
  }
 }else{
  req = {
    traineeid : traineeID,
    groupid : '',
    marketername : selectedId
  }
}
  this.service.TBupdateSelected(req).subscribe((x: any) => {
    if(x.flag == 1){
      this.messageService.add({ severity: 'success', summary: x.message });
      this.loading = false;
    }else{
      this.messageService.add({ severity: 'error', summary: x.message });
      this.loading = false;
    }
  });

 }


  fetchgrouplist() {
    let Req = {
      orgID: this.OrgID
    };
    this.service.fetchGroupList(Req).subscribe((x: any) => {
      this.groupOptions = x.result;
    });
  }

  getcandidaterstatus() {
    const Req = {
    };
    this.service.candidatestatus(Req).subscribe((x: any) => {
      this.currentStatusOptions = x;
      console.log(this.currentStatusOptions);
    });

  }

  // downloadSubmission() {
  //   this.loading = true;
  //   let Req = {
  //     TraineeID: this.TraineeID,
  //   };
  //   this.service.DownloadSubmission(Req).subscribe(
  //     (x: any) => {
  //       this.handleSuccess(x);
  //     },
  //     (error: any) => {
  //       this.handleError(error);
  //     }
  //   );
  //   this.loading = false;
  // }

  downloadSubmission(candidateID:string) {
    this.loading = true;
  
    this.service.downloadcandidatesubmission(candidateID).subscribe(
      (blob: Blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'submissions.xlsx';
        link.click();
        this.loading = false; 
      },
      (error: any) => {
        this.loading = false;
        this.handleError(error);
      }
    );
  }
  
  downloadInterview(candidateID:string) {
    this.loading = true;
  
    this.service.downloadcandidateInterview(candidateID).subscribe(
      (blob: Blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Interview.xlsx';
        link.click();
        this.loading = false; 
      },
      (error: any) => {
        this.loading = false;
        this.handleError(error);
      }
    );
  }

  placementrecdownload(candidateID:string){
    this.loading = true;
  
    this.service.downloadcandidatePlacement(candidateID).subscribe(
      (blob: Blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Placement.xlsx';
        link.click();
        this.loading = false; 
      },
      (error: any) => {
        this.loading = false;
        this.handleError(error);
      }
    );
  }

  addGroup(){
    if (this.newGroupName.trim() !== '') {
      this.loading = true;
      const request = {
        orgID: this.OrgID,
        groupName: this.newGroupName.trim(),
        Active: 1,
        createby: this.userName
      };
  
      this.service.addGroup(request).subscribe(
        (response: any) => {
          if (response.flag === 1) {
            this.getGroupList();
            this.messageService.add({ severity: 'success', summary: response.message });
          } else {
            this.loading = false;
            console.error('Error adding group!');
            this.messageService.add({ severity: 'error', summary: response.message });
          }
        },
        (error: any) => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error adding group' });
          console.error('Error adding group:', error);
        }
      );
    }
  }
  
  deleteGroup(){
    let Req = {
      OrgID: this.OrgID,
    };
    this.service.deleteGroup(Req).subscribe((x: any) => {
      var flag = x.flag;
      // this.();// update the list 
  
      if (flag === 1) {
        this.messageService.add({
          severity: 'success',
          summary: 'Submission Deleted Sucessfully',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Please try again later',
        });
      }
    });
  }
  
  getGroupList() {
    const request = {
      OrganizationID: this.OrgID,
    };
  
    this.service.getGroupList(request).subscribe(
      (res) => {
        this.grouplistdata = res.result;
        this.loading = false
        console.error('No active clients found!');
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching data:', error);
      }
    );
  }

  // downloadSubmission() {
  //   this.loading = true;
  //   let Req = {
  //     TraineeID: this.TraineeID,
  //   };
  //   this.service.downloadcandidatesubmission(Req).subscribe((blob: Blob) => {
  //     const link = document.createElement('a');
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = 'submissions.xlsx';
  //     link.click();
  //     this.handleSuccess(blob);
  //     this.loading = false; 
  //   },
  //     (error: any) => {
  //       this.loading = false;
  //       this.handleError(error);
  //     });
  // }

  getLegalStatusOptions() {
    const request = {};

    this.service.getLegalStatus(request).subscribe((response: any) => {
      this.legalStatusOptions = response;
      console.log(this.legalStatusOptions);
    });
  }

  saveData() {

    let Req = {
      firstName: this.addCandidate.value.FirstName,
      middleName: this.addCandidate.value.MiddleName,
      lastName: this.addCandidate.value.LastName,
      email: this.addCandidate.value.Email,
      Phone: this.addCandidate.value.Phone,
      gender: this.addCandidate.value.Gender,
      recruiterName: this.recruiterName,
      degree: this.addCandidate.value.Degree,
      University: this.addCandidate.value.University,
      candidateStatus: this.selectedcurrentstatus,
      Groups: this.addCandidate.value.Groups,
      legalStatus: this.addCandidate.value.LegalStatus,
      MaketerName: this.marketerName,
      locationConstraint: this.addCandidate.value.LocationConstraint,
      referralType: this.addCandidate.value.referralType,
      notes: this.addCandidate.value.Notes,
      orgID: this.OrgID,
      createby: this.userName,
      followupon: '',
      currentLocation: ''
    };

    console.log(Req);
    this.service.AddTalentBenchList(Req).subscribe(
      (x: any) => {
        this.handleSuccess(x);
        this.fetchtalentbenchlist();
      },
      (error: any) => {
        this.handleError(error);
      }
    );

  }

  private handleSuccess(response: any): void {
    this.messageService.add({ severity: 'success', summary: response.message });
    this.loading = false;
    console.log(response);
  }

  private handleError(response: any): void {
    this.messageService.add({ severity: 'error', summary: response.message });
    this.loading = false;
  }


  getOrgUserList() {
    let Req = {
      TraineeID: this.TraineeID,
      orgID: this.OrgID
    };
    this.service.fetchrecruiter(Req).subscribe((x: any) => {
      this.recruiterNames = x;
      this.marketerNames = x;
    });
  }
  //   fetchtalentbenchlist(){
  //     let Req = {
  //       OrgID: this.OrgID,
  //     };
  //   this.service.getTalentBenchList(Req).subscribe((x: any) => {
  //     this.tableData = x.result;
  //     this.noResultsFound = this.tableData.length === 0;
  //   });
  // }
  fetchtalentbenchlist() {

    let Req = {
      traineeID: this.TraineeID,
      OrganizationID: this.OrgID
    };
    this.service.getTalentBenchList(Req).subscribe((x: any) => {
      this.tableData = x.result;
      this.noResultsFound = this.tableData.length === 0;
      this.loading = false;
    });

  }

  searchInput: string = '';
  submissionList: any[] = [];
  downloadExcel() {
    const data = this.tableData;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "TBID,UserName,email,CurrentLocation,Time on Bench ( Days ),TraineeTitle,LegalStatus,Phone,BillRate,ReferredBy\n";

    data.forEach(item => {
      csvContent += `${item.TBID},"${item.FirstName} ${item.LastName}",` +
        `${item.UserName},${item.CurrentLocation},${item.age},${item.TraineeTitle},${item.LegalStatus},${item.phone},${item.BillRate},${item.ReferredBy}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  //Date filter Tablet bench fetch list
  startDate: string;  
  endDate: string;
  filteredTableData: any[];  

  isFilterButtonEnabled(): boolean {
    return !!this.startDate && !!this.endDate;
  }

  filterTableData() {
    const startDateTime = this.startDate ? new Date(this.startDate) : null;
    const endDateTime = this.endDate ? new Date(this.endDate) : null;

    this.filteredTableData = this.tableData.filter(item => {
      const itemCreateTime = new Date(item.CreateTime); 

      return (
        (!startDateTime || itemCreateTime >= startDateTime) &&
        (!endDateTime || itemCreateTime <= endDateTime)
      );
    });
    this.loading = false;
  }
  initializeData() {
    this.filterTableData();
    this.loading = true;
  }

  clearDates(): void {
    this.startDate = '';
    this.endDate = '';
    this.filteredTableData = this.tableData; 
  }
}
