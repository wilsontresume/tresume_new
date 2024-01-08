import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  public endpoint = environment.apiUrl;
  constructor(private http: HttpClient) { }

  validateemail(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'validateemail', request);
}

}
export interface ResponseDetails {
  flag?: any;
  result?: any;
}
