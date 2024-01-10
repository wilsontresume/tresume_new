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

updateUserProfile(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'updateUserProfile', request);
  }

  fetchProfileStateList(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'fetchProfileStateList', request);
  }
  fetchProfileCityList(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'fetchProfileCityList', request);
  }

  

}
export interface ResponseDetails {
flag?: any;
result?: any;
}