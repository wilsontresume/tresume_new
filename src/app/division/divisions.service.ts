import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class DivisionService {

    public endpoint = environment.apiUrl;
    //public endpoint = 'https://alpha.tresume.us/TresumeAPI/';

    constructor(private http: HttpClient) { }


    createdivision(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'createdivision', request);
    }
    updatedivision(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'updatedivision', request);
    }
    deletedivision(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'deletedivision', request);
    }

    fetchrecruiter(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'fetchrecruiterfordivision', request);
    }

    fetchdivisionbyorg(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'fetchdivisionbyorg', request);
    }

    fetchrecruiterbyorg(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'fetchrecruiterbyorg', request);
    }

    addrecruitertodiv(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'addrecruitertodiv', request);
    }


}

export interface ResponseDetails {
    flag?: any;
    result?: any;
}