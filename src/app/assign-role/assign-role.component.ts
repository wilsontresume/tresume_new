import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.scss']
})
export class AssignRoleComponent implements OnInit {
  adminlist:any;
  userlist:any;
  allusers:any;
  project:any;
  constructor() { }

  ngOnInit(): void {
    this.adminlist = [{id:1,name:'wilson'},{id:2,name:'bala'}];
    this.userlist = [{id:1,name:'Nagaraj'},{id:2,name:'Maria'}];
    this.project = [{id:1,name:'Tresume'}];
    this.allusers = [{id:1,name:'Nagaraj',admin:'wilson',project:'tresume'},{id:2,name:'Maria',admin:'bala',project:'tresume'}];
  }

}
