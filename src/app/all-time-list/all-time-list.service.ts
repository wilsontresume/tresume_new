import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class TimesheetListService {
    public endpoint = environment.apiUrl;
    // public endpoint = 'https://alpha.tresume.us/TresumeAPI/';
    // public endpoint = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }

    deleteUserAccount(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'deleteUserAccount', request);
    }

    getTimesheetClientList(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getTimesheetClientList', request);
    }
   
    
}
export interface ResponseDetails {
    flag?: any;
    result?: any;
}