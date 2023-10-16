import { Component } from '@angular/core';

@Component({
  selector: 'app-search-tresume',
  templateUrl: './search-tresume.component.html',
  styleUrls: ['./search-tresume.component.scss']
})
export class SearchTresumeComponent{
  items: any[] = [
    {
      value1:'Name 1',
      value2:'Name 2',
      value3:'Name 3',
      value4:'Name 4',
      value5:'Name 5',
      value6:'Name 6',
    }
  ]
}
