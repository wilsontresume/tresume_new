import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignRoleService {

  constructor(private http: HttpClient) { }
  public endpoint = environment.apiUrl;


  getAllTimeList(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getAllTimeList', request);
  }

  fetchtimesheetusers(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'fetchtimesheetusers', request);
  }
  fetchtimesheetadmins(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'fetchtimesheetadmins', request);
  }
}


export interface ResponseDetails {
  flag?: any;
  result?: any;
}
