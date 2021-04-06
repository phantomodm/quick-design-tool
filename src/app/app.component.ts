import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quick-design-tool';
  @Input() profile:string;
  @Input() glove: string;
  @Input() name: string;
  @Input() price: string;
  @Input() price2: string;

  constructor(){

  }
}
