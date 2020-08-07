import { Component } from '@angular/core';

@Component({
  selector: 'jhi-group-uma-configuration',
  templateUrl: './group-uma-configuration.component.html',
  styleUrls: ['./group-uma-configuration.component.scss']
})
export class GroupUmaConfigurationComponent {
  // @ViewChild(AgrupadorUmaUpdateComponent, { static: false }) agrupadorComponent!: AgrupadorUmaUpdateComponent;
  subscription: any;
  firstClick = false;

  constructor() {}

  saveUMA(): void {
    // this.agrupadorComponent.save();
    // this.firstClick = this.agrupadorComponent.firstClick;
    console.error('Deberá guardar');
  }

  previewModule(id: number, $event: any): void {
    $event.stopPropagation();
    console.error('####     Debería mostrar el Preview del Módulo');
  }

  findElementById(objectArray: any, id: number): number {
    let foundIndex = -1;
    objectArray.forEach((value: any, index: number) => {
      if (value.id === id) {
        foundIndex = index;
      }
    });
    return foundIndex;
  }
}
