import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class TimesheetService {
    public endpoint = environment.apiUrl;
    // public endpoint = 'https://alpha.tresume.us/TresumeAPI/';
    // public endpoint = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }

    deleteUserAccount(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'deleteUserAccount', request);
    }

    getAllTimeList(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getAllTimeList', request);
    }
   
    
}
export interface ResponseDetails {
    flag?: any;
    result?: any;
}