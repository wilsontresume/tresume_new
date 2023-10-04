import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ccpa-popup',
    templateUrl: './ccpa-popup.component.html',
    styleUrls: ['./ccpa-popup.component.scss']
})
export class CcpaPopupComponent {

    constructor(public dialogRef: MatDialogRef<CcpaPopupComponent>, private router: Router) { }

    accept() {
        this.dialogRef.close(true);
    }

    reject() {
        this.dialogRef.close(false);
        window.location.href = 'https://tresume.us/Logout.aspx';
    }
}
