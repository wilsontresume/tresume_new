import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';



@Injectable()

export class AppService {

    private endpoint = environment.apiUrl;
    //public endpoint = 'https://alpha.tresume.us/TresumeAPI/';
    //public endpoint = 'http://localhost:3000/';

    constructor(private http: HttpClient,private cookieService: CookieService) { }

    getTraineeDetails(id: any): Observable<ResponseDetails> {
        return this.http.get<ResponseDetails>(this.endpoint + 'getTraineeDetails/' + id);
    }

    getOnboardingSession(id: any): Observable<ResponseDetails> {
        return this.http.get<ResponseDetails>(this.endpoint + 'onboardSession/' + id);
    }

    getLoggedUser(request: any): Observable<ResponseDetails> {
        return this.http.post<ResponseDetails>(this.endpoint + 'getLoggedUser', request);
    }

    isLoggedIn(): boolean {
        this.cookieService.set('userName1','karthik@tresume.us');
        this.cookieService.set('OrgID','82');
        this.cookieService.set('TraineeID','569');  
        this.cookieService.set('TimesheetRole','1');   
        // const userName = this.cookieService.get('userName1');
        // const orgID = this.cookieService.get('OrgID');
        // const traineeID = this.cookieService.get('TraineeID');

        const orgID = 9;
        const userName = 'karthik@tresume.us';
        const traineeID = 36960;
        
    
        return !!userName && !!orgID && !!traineeID;
      }

}

export interface ResponseDetails {
    flag?: any;
    result?: any;
}