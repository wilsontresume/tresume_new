import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class AddClientService {
    
    public endpoint = environment.apiUrl;

    constructor(private http: HttpClient) { }
    
    getTraineeClientList(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getTraineeClientList', request);
    }

    deleteClientAccount(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'deleteClientAccount', request);
    }

    addClienta(request: any): Observable<any> {
        return this.http.post<ResponseDetails>(this.endpoint + 'addClienta', request);
      }

}
export interface ResponseDetails {
    flag?: any;
    result?: any;
}


