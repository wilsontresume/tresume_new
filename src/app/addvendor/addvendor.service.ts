import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class addVendorService {
  public endpoint = environment.apiUrl;
  // public endpoint = 'https://alpha.tresume.us/TresumeAPI/';
  // public endpoint = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getTraineeVendorList(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getTraineeVendorList', request);
  }

  deleteVendorAccount(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'deleteVendorAccount', request);
  }

  addVendor(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'addVendor', request);
  }

  getLocation(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getLocation', request);
  }

  getCity(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getCity', request);
  }

  getClientStatusID(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getClientStatusID', request);
  }

  getClientCategoryID(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getClientCategoryID', request);
  }

  getPrimaryOwner(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'fetchrecruiter', request);
  }

  // getPaymentTerms(request: any): Observable<ResponseDetails> {
  //   return this.http.post<ResponseDetails>(this.endpoint + 'getPaymentTerms', request);
  // }

  // getIndustry(request: any): Observable<ResponseDetails> {
  //   return this.http.post<ResponseDetails>(this.endpoint + 'getIndustry', request);
  // }

}
export interface ResponseDetails {
  flag?: any;
  result?: any;
}