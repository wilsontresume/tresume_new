import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.scss']
})
export class AddclientComponent {
  activeTab: string = 'basicInfo';
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form and form controls, including "description"
    this.form = this.fb.group({
      description: [''], // Initialize with an empty string or any default text
    });
  }

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }
}
