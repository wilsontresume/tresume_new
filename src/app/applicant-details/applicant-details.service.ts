import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class ApplicantDetailsService {
    public endpoint = environment.apiUrl;

    constructor(private http: HttpClient) { }
    
    getjobapplicants(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getjobapplicants', request);
      }

}
export interface ResponseDetails {
    flag?: any;
    result?: any;
}


