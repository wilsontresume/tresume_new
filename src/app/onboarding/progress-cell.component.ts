import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
    selector: 'app-progress-renderer',
    template: `<div class="mb-2" style="padding-top: 11px;">
                <progressbar [max]="100" [value]="params.value" [type]="updateStatus(params)" [striped]="true" [animate]="true">
                    <i>{{params.value}}%</i>
                </progressbar>
                </div>`,
})
export class ProgressRenderer implements AgRendererComponent {
    params: ICellRendererParams;
    rendererImage: string;
    value: any[];

    agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    updateStatus(params: ICellRendererParams) {
        if (params.value == 100) {
            return "success";
        }
        else {
            return "info"
        }
        /*  this.rendererImage = `https://www.ag-grid.com/example-assets/weather/${this.params.rendererImage}`;
         this.value = new Array(this.params.value).fill(0); */
    }

    refresh(params: ICellRendererParams) {
        this.params = params;
        return true;
    }
}

