import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class AllClientService {
    public endpoint = environment.apiUrl;

    constructor(private http: HttpClient) { }
    
    getTraineeClientList(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getTraineeClientList', request);
    }

    deleteClientAccount(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'deleteClientAccount', request);
    }

    addClient(request: any): Observable<any> {
        return this.http.post<ResponseDetails>(this.endpoint + 'addClient', request);
      }

}
export interface ResponseDetails {
    flag?: any;
    result?: any;
}

function addclient(data: any, any: any) {
    throw new Error('Function not implemented.');
}
