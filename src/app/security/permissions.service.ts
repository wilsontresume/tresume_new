import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';


@Injectable()
export class Permissions {

    private _permissions: string[] = [];
    public userName: string

    constructor(private http: HttpClient, private cookieService: CookieService) {
        this.userName = this.cookieService.get('userName1');
    }

    public load(injector: Injector) {
        return new Promise((resolve: (value?: any | PromiseLike<any>) => void, reject: (reason?: any) => void) => {
            this.http.post(environment.apiUrl + "getuseraccess", JSON.stringify(getRequest(this.userName),
                (getRequestOptions()))).subscribe((x: any) => {
                    console.log('x', x)
                    this.permissions = x.responseDetails;
                });

        });
    }

    public get permissions(): string[] { return this._permissions; }
    public set permissions(value: string[]) {
        if (value.length < 1) { return; }
        this._permissions = value;
    }

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