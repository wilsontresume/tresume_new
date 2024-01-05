import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HrmsService {
  public endpoint = environment.apiUrl;
  // public endpoint = 'https://alpha.tresume.us/TresumeAPI/';
  // public endpoint = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }
  
  gethrmscandidateList(request: any): Observable<ResponseDetails> {
      return this.http.post<ResponseDetails>(this.endpoint + 'gethrmscandidateList', request);
  }

  deletehrmscandidateAccount(request: any): Observable<ResponseDetails> {
      return this.http.post<ResponseDetails>(this.endpoint + 'deletehrmscandidateAccount', request);
  }
  
  addHrmsCandidate(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'addHrmsCandidate', request);
  }

  // insertTrainee(request: any): Observable<ResponseDetails> {
  //   const formData = new FormData();
  //   Object.keys(request).forEach(key => formData.append(key, request[key]));
  
  //   return this.http.post<ResponseDetails>(this.endpoint + 'insertTrainee', formData);
  // }

  insertTrainee(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'insertTrainee', request);
  }
  insertTraineeCandidate(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'insertTraineeCandidate', request);
  }

  getOrgUserList(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getOrgUserList', request);
  }

  checkEmail(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'checkEmail', request);
  }

  candidatestatus(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'candidatestatus', request);
  }

  fetchrecruiter(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'fetchrecruiter', request);
  }

  // checkEmail(email: string): Observable<any> {
  //   return this.http.post<any>(this.endpoint, { email });
  // }
}
export interface ResponseDetails {
  message(message: any): unknown;
  flag?: any;
  result?: any;
}
