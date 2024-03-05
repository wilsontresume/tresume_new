
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDetails } from '../app.service';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CreateInvoiceService {
  // deleteplacementdata(Req: { TraineeInterviewID: number; }) {
  //   throw new Error('Method not implemented.');
  // }
  private endpoint = environment.apiUrl;

  constructor(private http: HttpClient) { }


  // getTimesheetClientList(request: any): Observable<ResponseDetails> {
  //   return this.http.post<ResponseDetails>(this.endpoint + 'getTimesheetClientList', request);
  // }
  // saveSubmissionFormData(request: any): Observable<ResponseDetails> {
  //   return this.http.post<ResponseDetails>(this.endpoint + 'saveSubmissionFormData', request);
  // }

  getTraineeClientList(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getTraineeClientList', request);
  }

  getLocationList(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getLocationList', request);
  }

  createInvoice(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'createInvoice', request);
  }

  getTimesheetReport(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getTimesheetReport', request);
  }

}