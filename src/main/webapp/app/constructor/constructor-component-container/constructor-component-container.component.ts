import { Component, Input } from '@angular/core';

@Component({
  selector: 'jhi-constructor-component-container',
  templateUrl: './constructor-component-container.component.html',
  styleUrls: ['./constructor-component-container.component.scss']
})
export class ConstructorComponentContainerComponent {
  @Input() showTextEditor?: boolean;
  constructor() {}
}
