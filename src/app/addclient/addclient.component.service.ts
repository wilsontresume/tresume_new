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

    addClienta(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'addClienta', request);
    }

    getCountry(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getCountry', request);
    }
    
      getState(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getState', request);
    }

      getCity(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getCity', request);
    }

      getIndustry(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getIndustry', request);
    }

      getClientStatusID(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getClientStatus', request);
    }

      getClientCategoryID(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getClientCategoryID', request);
    }

      getPrimaryOwner(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getPrimaryOwner', request);
    }

      getPaymentTerms(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getPaymentTerms', request);
    }
      
      
}
export interface ResponseDetails {
    flag?: any;
    result?: any;
}


