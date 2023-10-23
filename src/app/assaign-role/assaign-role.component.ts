import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assaign-role',
  templateUrl: './assaign-role.component.html',
  styleUrls: ['./assaign-role.component.scss']
})
export class AssaignRoleComponent implements OnInit {
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
