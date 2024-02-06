import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDetails } from '../app.service';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  // deleteplacementdata(Req: { TraineeInterviewID: number; }) {
  //   throw new Error('Method not implemented.');
  // }
  private endpoint = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  

  getInterviewList(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getInterviewList', request);
  }

  insertTraineeInterview(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'insertTraineeInterview', request);
  }

  deleteinterviewdata(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'deleteinterviewdata', request);
  }

  getPlacementList(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getPlacementList', request);
  }

  getSubmissionList(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getSubmissionList', request);
  }


  deleteplacementdata(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'deleteplacementdata', request);
  }

  // saveSubmissionFormData(request: any): Observable<ResponseDetails> {
  //   return this.http.post<ResponseDetails>(this.endpoint + 'saveSubmissionFormData', request);
  // }
  
  insertSubmissionInfo(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'insertSubmissionInfo', request);
  }

  // saveInterviewFormData(request: any): Observable<ResponseDetails> {
  //   return this.http.post<ResponseDetails>(this.endpoint + 'saveInterviewFormData', request);
  // }

  // saveGeneralFormData(request: any): Observable<ResponseDetails> {
  //   return this.http.post<ResponseDetails>(this.endpoint + 'saveGeneralFormData', request);
  // }

  updateGeneral(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'updateGeneral', request);
  }

  saveFinancialInfoFormData(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'saveFinancialInfoFormData', request);
  }

  getCandidateInfo(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getCandidateInfo', request);
  }

  getOrgUserList(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'getOrgUserList', request);
  }
  
  updateFinancial(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'updateFinancial', request);
  }

  emailplacementtracker(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + "emailplacementtracker", request);
  }

  deletesubmissiondata(request: any): Observable<ResponseDetails> {
    return this.http.post<ResponseDetails>(this.endpoint + 'deletesubmissiondata', request);
  }

  // This is for email tracker in the placement tab // HRMS
  // getTableData(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.endpoint}/table-data`);
  // }
}