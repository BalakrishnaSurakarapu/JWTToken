import { Component } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent {
  dynamicColor: string = 'pink';
  color:string='green'

  changeColor() {
    this.dynamicColor = this.dynamicColor === 'green' ? 'yellow' : 'green';
  }
}
