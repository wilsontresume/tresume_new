import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-adobesign',
    templateUrl: './adobe-sign.component.html',
    styleUrls: ['../onboarding.component.scss']
})
export class AdobesignComponent implements OnInit {

    @Input() docItems: any[] = [];

    public filteredItems: any[] = [];
    public adobeAccessToken: string = '';
    visibleSidebar2: boolean = false;
    application: any;
    componentInitialized: boolean;
    fileRoute: string;
    apiUrl: string = environment.apiUrl;

    constructor(private route: ActivatedRoute, private service: OnboardingService, private http: HttpClient) {
        this.adobeAccessToken = this.route.snapshot.queryParams["token"];
    }

    ngOnInit(): void {
        console.log('docItems', this.docItems)
        this.getToken();

    }

    getEsignDocs() {
        this.service.getEsignDocs(this.docItems[0].OnboardID).subscribe((data: any) => {
            console.log('data', data)
            this.filteredItems = data;
            this.filteredItems.forEach((item: any) => {
                this.getAgreementDetails(item.AgreementID).subscribe(
                    (data: any) => {
                        const userHasSigned = data.status;
                        item.status = userHasSigned === 'SIGNED' ? 1 : 0;
                        item.documentId = data.id;
                    },
                    (error: any) => {
                        this.connectAdobe();
                    }
                );
            });
        });
    }

    public getToken() {
        this.service.getAdobeToken().subscribe((x: any) => {
            this.adobeAccessToken = x.accesstoken;
            this.getEsignDocs();
        });
    }

    public connectAdobe() {
        let client_id: string;
        let secret: string;
        this.service.getAdobeCreds().subscribe((x: any) => {
            client_id = x.clientId;
            secret = x.secret;
            let adobeUrl = "https://secure.na4.adobesign.com/public/oauth/v2?response_type=code&client_id=" + client_id + "&redirect_uri=https://tresume.us/TresumeAPI/getAdobeAccessToken&scope=user_read:account+user_write:account+user_login:account+agreement_read:account+agreement_write:account+agreement_send:account+widget_read:account+widget_write:account+library_read:account+library_write:account+workflow_read:account+workflow_write:account";
            window.location.href = adobeUrl;
        });
    }

    getAgreementDetails(agreementId: string): Observable<any> {
        return this.service.getAgreementDetails(agreementId);
    }

    downloadPdf(agreementid: any, transientDocumentId: any) {

        this.service.getAgreementDocs(agreementid).subscribe((x: any) => {
            const endpoint = `agreements/${agreementid}/documents/${x[0].id}`;
            const url = `${this.apiUrl}${endpoint}`;
            this.http.get(url, { responseType: 'arraybuffer' }).subscribe(
                (response) => {
                    const blob = new Blob([response], { type: 'application/pdf' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${x[0].id}.pdf`;
                    link.click();
                    window.URL.revokeObjectURL(url);
                },
                (error) => {
                    console.error('Error retrieving agreement details:', error);
                }
            );
        });
    }

    viewDoc(agreementid: any, transientDocumentId: any) {
        this.service.getAgreementDocs(agreementid).subscribe((x: any) => {
            const endpoint = `agreements/${agreementid}/documents/${x[0].id}`;
            const url = `${this.apiUrl}${endpoint}`;
            this.http.get(url, { responseType: 'arraybuffer' }).subscribe(
                (response) => {
                    const blob = new Blob([response], { type: 'application/pdf' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    this.fileRoute = url;
                    this.visibleSidebar2 = true;
                },
                (error) => {
                    console.error('Error retrieving agreement details:', error);
                }
            );
        });
    }

    public close(result?: void) {
        // unbind offending event listeners
        const unbindWindowEvents = this.application?.unbindWindowEvents?.bind(this.application);
        if (typeof unbindWindowEvents === 'function') {
            unbindWindowEvents();
        } else {
            console.log('Error unbind pdf viewer')
        }
    }

    calPercentage() {
        return (this.filteredItems.filter((x: any) => x.status != 0).length / this.filteredItems.length) * 100;
    }

}
