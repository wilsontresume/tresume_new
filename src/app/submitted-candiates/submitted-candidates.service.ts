import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class SubmittedCandidatesService {
  public endpoint = environment.apiUrl;

  constructor(private http: HttpClient) { }

getSubmittedCandidateList(request: any): Observable<any> {
  return this.http.post(this.endpoint + 'getSubmittedCandidateList', request, { responseType: 'blob' });
}
}
export interface ResponseDetails {
  flag?: any;
  result?: any;
}