import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AppConfigService {

    apiUrl: string = '';
    private _permissions: string[] = [];
    public userName: string

    constructor(private http: HttpClient, private cookieService: CookieService) {
        this.userName = this.cookieService.get('userName1');
    }

    loadAppConfig() {
        return new Promise<void>((resolve, reject) => {
            /* this.http.post(environment.apiUrl + "getuseraccess", JSON.stringify(getRequest(this.userName),
                (getRequestOptions()))).subscribe((x: any) => {
                    console.log('From Preloader', x)
                    const ViewOnly = x.result[0].ViewOnly
                    const FullAccess = x.result[0].FullAccess
                    const DashboardPermission = x.result[0].DashboardPermission
                    const RoleID = x.result[0].RoleID
                    this.cookieService.set('ViewOnly', ViewOnly);
                    this.cookieService.set('FullAccess', FullAccess);
                    this.cookieService.set('DashboardPermission', DashboardPermission);
                    this.cookieService.set('RoleID', RoleID);
                    
                }); */
                console.log('App Preloaded')
                resolve();
        });
    }
}


export function appInitializer(configService: AppConfigService) {
    return () => configService.loadAppConfig();
}

export function getRequest(requestDetails: string): RequestJSON {
    let request: RequestJSON = {
        request: {
            header: {},
            requestDetails
        }
    };
    return request;
}

export function getRequestOptions(): any {
    return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
}

export interface ResponseDetails {
    flag?: any;
    result?: any;
}
export interface RequestJSON {
    request: RequestItem;
}

export interface RequestItem {
    header: any;
    requestDetails: any;
}