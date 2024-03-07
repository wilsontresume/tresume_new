import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class ProfileService{
    public endpoint = environment.apiUrl;

constructor(private http: HttpClient) { }

getUserProfile(request: any): Observable<ResponseDetails> {
  return this.http.post<ResponseDetails>(this.endpoint + 'getUserProfile', request);
}

updateMyProfile(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'updateMyProfile', request);
  }

  getLocation(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getLocation', request);
  }
  
  getCity(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getCity', request);
  }

  changePassword(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'changePassword', request);
  }
  validatepassword(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'validatepassword', request);
  }
  newpassword(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'newpassword ', request);
  }
  
}
export interface ResponseDetails {
flag?: any;
result?: any;
}