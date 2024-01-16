
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()

export class CreateAllTimeListService {
    // public endpoint = environment.apiUrl;
    public endpoint = 'https://alpha.tresume.us/TresumeAPI/';
    // public endpoint = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }
    createTimesheet(data: any) {
      return this.http.post(this.endpoint, data);
    }

    getProjectList(request: any): Observable<ResponseDetails> {
      return this.http.post<ResponseDetails>(this.endpoint + 'getProjectList', request);
  }

  getPayItemList(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getPayItemList', request);
}

getLocationList(request: any): Observable<ResponseDetails> {
  return this.http.post<ResponseDetails>(this.endpoint + 'getLocationList', request);
}

}
export interface ResponseDetails {
    flag?: any;
    result?: any;
}