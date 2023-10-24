import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseDetails } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  public endpoint = environment.apiUrl;
  // public endpoint = 'https://alpha.tresume.us/TresumeAPI/';
  // public endpoint = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  // addharvest(request: any): Observable<ResponseDetails> {
  //   return this.http.post<ResponseDetails>(this.endpoint + 'addharvest', request);
}

