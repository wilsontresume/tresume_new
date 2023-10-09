import { Component} from '@angular/core';

@Component({
  selector: 'app-financial-info',
  templateUrl: './financial-info.component.html',
  styleUrls: ['./financial-info.component.scss']
})
export class FinancialInfoComponent{
  isPopupOpen = false;

  openPopup() {
    this.isPopupOpen = true;
  }

}
