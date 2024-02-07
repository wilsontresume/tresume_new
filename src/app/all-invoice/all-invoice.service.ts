import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class AllInvoiceService {
    public endpoint = environment.apiUrl;
    // public endpoint = 'https://alpha.tresume.us/TresumeAPI/';
    // public endpoint = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }
    getClientDropdowns(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getClientDropdowns', request);
    }
    getBatchActions(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getBatchActions', request);
    }
    getInvoiceTypes(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getInvoiceTypes', request);
    }
    getInvoiceStatus(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getInvoiceStatus', request);
    }
    getNewTransaction(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getNewTransaction', request);
    }
}
export interface ResponseDetails {
    flag?: any;
    result?: any;
}