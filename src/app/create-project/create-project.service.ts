import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class CreateProjectService {
  deleteClientAccount(Req: { ClientID: any; }) {
    throw new Error('Method not implemented.');
  }
    public endpoint = environment.apiUrl;
    // public endpoint = 'https://alpha.tresume.us/TresumeAPI/';
    // public endpoint = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }
    
    getTraineeClientList(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getTraineeClientList', request);
    }

    fetchtimesheetcandidate(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'fetchtimesheetcandidate', request);
    }

    getTimesheetCandidateList(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getTimesheetCandidateList', request);
    }

     getTimesheetClientList(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getTimesheetClientList', request);
    }

    createtimesheetproject(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'createtimesheetproject', request);
    }

    getProjectList(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getProjectList', request);
    }

    deleteProject(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'deleteProject', request);
    }
    
   
}
export interface ResponseDetails {
    flag?: any;
    result?: any;
}