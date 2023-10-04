import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'formly-field-file',
    template: `
  <div class="row">
    <input type="file" [formControl]="formControl" [formlyAttributes]="field">
    </div>
  `,
})
export class FormlyFieldFile extends FieldType { }