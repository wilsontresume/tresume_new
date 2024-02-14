import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class SubmittedCandidatesService {
  public endpoint = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSubmittedCandidateList(jobTitle: string): Observable<any> {
    return this.http.post<any>(this.endpoint + 'getSubmittedCandidateList', { jobTitle: jobTitle });
  }
}
export interface ResponseDetails {
  flag?: any;
  result?: any;
}