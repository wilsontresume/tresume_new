import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.scss']
})
export class AddclientComponent {
  content: string = '';
  activeTab: string = 'basicInfo';
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    
    this.form = this.fb.group({
      description: [''], 
    });
  }

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }
}
