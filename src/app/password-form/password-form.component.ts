import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {
  loading:boolean = false;

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
