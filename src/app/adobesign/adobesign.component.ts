import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adobesign1',
  templateUrl: './adobesign.component.html',
  styleUrls: ['./adobesign.component.scss']
})
export class AdobesignComponent1 {
  file: File | null = null;
  accesstoken:string;
  transientDocumentId: string;
  recipientEmail: string;
  agreementName: string ;
  agreementId: string ;
  agreement: any = null;

  constructor(private http: HttpClient,private route: ActivatedRoute) { 
    this.accesstoken = this.route.snapshot.params["token"];
    console.log(this.accesstoken);
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
  gettoken(){

  }

  uploadPDF() {
    if (!this.file) {
      return;
    }

    const formData = new FormData();
    formData.append('File', this.file);
    // formData.append('token', this.accesstoken);

    // const headers = new HttpHeaders().set(
    //   'Authorization',
    //   `Bearer ${this.accesstoken}`
    // );

    this.http.post<any>('https://tresume-adobe-url.loca.lt/uploadtransientDocuments', formData, {
      // headers: headers
    }).subscribe(
      (data) => {
        console.log('Transient Document ID:', data);
        this.transientDocumentId = data.transientDocumentId;
        // Perform further actions with the transientDocumentId
      },
      (error) => {
        console.error('Upload failed:', error);
      }
    );
  }

  createAgreement() {

    const url = 'https://tresume-adobe-url.loca.lt/agreements';
    
    const requestBody = {
      transientDocumentId: this.transientDocumentId,
      recipientEmail: this.recipientEmail,
      agreementName: this.agreementName,
      // accessToken:this.accesstoken
    };

    this.http.post<any>(url, requestBody).subscribe(
      (data) => {
        this.agreementId = data.agreementId;
        console.log('Agreement ID:', data.agreementId);
      },
      (error) => {
        console.error('Failed to create agreement:', error);
      }
    );
  }

  getAgreementDetails() {
    const accessToken = this.accesstoken;
    const apiAccessPoint = 'https://tresume-adobe-url.loca.lt/';
    const endpoint = `agreements/${this.agreementId}`;
    const url = `${apiAccessPoint}${endpoint}`;
    this.http.get<any>(url).subscribe(
      (data) => {
        this.agreement = data;
      },
      (error) => {
        console.error('Error retrieving agreement details:', error);
      }
    );
  }

  downloadAgreementDetails() {
    const accessToken = this.accesstoken;
    const apiAccessPoint = 'https://tresume-adobe-url.loca.lt/';
    const endpoint = `agreements/${this.agreementId}/documents`;
    const url = `${apiAccessPoint}${endpoint}`;
    

    this.http.get<any>(url).subscribe(
      (data) => {
        this.agreement = data;
      },
      (error) => {
        console.error('Error retrieving agreement details:', error);
      }
    );
  }

  downloadPdf(){
    const accessToken = this.accesstoken;
    const apiAccessPoint = 'https://tresume-adobe-url.loca.lt/';
    const endpoint = `agreements/${this.agreementId}/documents/${this.transientDocumentId}`;
    const url = `${apiAccessPoint}${endpoint}`;
    

    this.http.get(url, { responseType: 'arraybuffer' }).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'single.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error retrieving agreement details:', error);
      }
    );
    
  }
  
  downloadCombainedPdf() {
    const apiAccessPoint = 'https://tresume-adobe-url.loca.lt/';
    const endpoint = `agreements/${this.agreementId}/documents`;
    const url = `${apiAccessPoint}${endpoint}`;
  
    this.http.get(url, { responseType: 'arraybuffer' }).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'combined.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error retrieving agreement details:', error);
      }
    );
  }
  
  
}
