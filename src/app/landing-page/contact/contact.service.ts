import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ResponseDetails } from '../../app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private endpoint = environment.apiUrl;

  constructor(private http: HttpClient) { }

  leadenquiry(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'leadenquiry', request);
  }
}
