import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()

export class LoginService {


    public endpoint = environment.apiUrl;
    //public endpoint = 'https://alpha.tresume.us/TresumeAPI/';
    //public endpoint = 'https://beta.tresume.us/TresumeAPI/';
    // public endpoint = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }

    login(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'login', request);
    }

}

export interface ResponseDetails {
    flag?: any;
    result?: any;
}