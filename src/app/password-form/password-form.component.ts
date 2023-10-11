import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cancel(): void {
   
    this.router.navigate(['searchtresume/reviewtresume/general']);
  }

  showSSN(): void {
    alert('SSN: *********'); 
  }

}
