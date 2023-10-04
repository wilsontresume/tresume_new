import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppService } from './app.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AppService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // User is authenticated, allow access to the route
      return true;
    } else {
      // User is not authenticated, redirect to the login page
      // window.location.href = 'https://tresume.us/Login.aspx';
      // window.location.href = 'http://localhost:4200/login';
      window.location.href = 'https://beta.tresume.us/TresumeNG/login';
      // this.router.navigate(['/login']);
      return false;
    }
  }
}

