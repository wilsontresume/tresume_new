import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  adminlist:any;
  projectname:any
  clientname:any
  netterms:any;
  userlist:any;
  project:any;
  allusers:any;
  constructor() { }

  ngOnInit(): void {
    this.projectname = [{id:1,name:'Tresume'},{id:2,name:'bala'}];
    this.clientname = [{id:1,name:'Nagaraj'},{id:2,name:'Maria'}];
    this.netterms = [{id:1,name:'Tresume'}];
    this.project = [{id:1,name:'Nagaraj',admin:'wilson',project:'tresume'},{id:2,name:'Maria',admin:'bala',project:'tresume'}];
  }

}
