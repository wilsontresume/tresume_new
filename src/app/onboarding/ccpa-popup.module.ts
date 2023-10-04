import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CcpaPopupComponent } from './ccpa-popup.component';

@NgModule({
    declarations: [CcpaPopupComponent],
    imports: [CommonModule, MatDialogModule],
    exports: [CcpaPopupComponent],
})
export class CcpaPopupModule { }
