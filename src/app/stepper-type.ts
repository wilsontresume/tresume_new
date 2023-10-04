import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'formly-field-stepper',
  template: `
  <mat-horizontal-stepper #stepper>
    <mat-step
      *ngFor="let step of field.fieldGroup; let index = index; let last = last;">
      <ng-template matStepLabel>{{ step.templateOptions?.label }}</ng-template>
      <div class="col-md-3">
      <formly-field [field]="step"></formly-field>
      </div>

      <div class="col-md-12">
      <div class="row">
        <div style="padding:5px;">
        <button matStepperPrevious *ngIf="index !== 0"
          class="btn btn-primary"
          type="button">
          Back
        </button>
        </div>
        <div style="padding:5px;">
        <button matStepperNext *ngIf="!last"
          class="btn btn-primary" type="button"
          [disabled]="!isValid(step)">
          Next
        </button>
        </div>
        <div style="padding:5px;">
        <button *ngIf="last" class="btn btn-primary"
          [disabled]="!form.valid" (click)="stepper.reset()"
          type="submit">
          Upload
        </button>
        </div>
        </div>
      </div>
    </mat-step>
  </mat-horizontal-stepper>
`,
})
export class FormlyFieldStepper extends FieldType {

  isValid(field: FormlyFieldConfig): any {
    if (field.key) {
      return field.formControl?.valid;
    }

    return field.fieldGroup?.every(f => this.isValid(f));
  }
}