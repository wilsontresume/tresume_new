import { Component } from '@angular/core';
import { ICellRendererAngularComp, AgEditorComponent } from 'ag-grid-angular';
import { ICellRendererParams, GridApi } from 'ag-grid-community';

@Component({
    selector: 'app-gender-renderer',
    template: ` <select [(ngModel)]="selectedValue" (change)="onSelectChange()">
    <option *ngFor="let option of options" [value]="option">{{ option }}</option>
  </select>
    `,
})
export class GenderRenderer implements AgEditorComponent {
    public imageSource!: string;
    private _params: any;
    private _api: GridApi;
    public value: any;
    options: string[];
    selectedValue: string;

    agInit(rowData: any) {
        this._api = rowData.api;
        this._params = rowData;
        this.options = [
            'test1', 'test2', 'test3'
        ]

    }

    getValue(): any {
        return this.selectedValue;
    }

    onSelectChange(): void {
        this._params.api.stopEditing();
    }

    onChange(value: any) {
        console.log('value', value)

    }
}