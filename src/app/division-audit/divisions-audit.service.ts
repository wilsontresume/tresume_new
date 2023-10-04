import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class DivisionAuditService {

    public endpoint = environment.apiUrl;
    //public endpoint = 'https://alpha.tresume.us/TresumeAPI/';

    // public endpoint = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }




    fetchrecruiter(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'fetchrecruiterfordivision', request);
    }

    fetchdivisionbyorg(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'fetchdivisionbyorg', request);
    }

    fetchrecruiterbyorg(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'fetchrecruiterbyorg', request);
    }




}

export interface ResponseDetails {
    flag?: any;
    result?: any;
}