import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class JobBoardAccountService {
    public endpoint = environment.apiUrl;
    // public endpoint = 'https://alpha.tresume.us/TresumeAPI/';
    // public endpoint = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }

    // deleteJobPosting(request: any): Observable<ResponseDetails> {
    //     return this.http.post<ResponseDetails>(this.endpoint + 'deleteJobPosting', request);
    // }

    insertJobBoardAccountList(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'insertJobBoardAccountList', request);
    }
}
export interface ResponseDetails {
    flag?: any;
    result?: any;
}