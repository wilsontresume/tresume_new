import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class CreateNewJobsService {

  public endpoint = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCity(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getCity', request);
  }
}
export interface ResponseDetails {
  flag?: any;
  result?: any;
}
