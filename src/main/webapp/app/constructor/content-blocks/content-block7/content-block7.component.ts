import { Component, Input, EventEmitter, Output } from '@angular/core';
import { BloquesCurso } from 'app/shared/model/bloques-curso.model';
import { IComponente } from 'app/shared/model/componente.model';

@Component({
  selector: 'jhi-content-block7',
  templateUrl: './content-block7.component.html',
  styleUrls: ['./content-block7.component.scss']
})
export class ContentBlock7Component {
  imgSrc = './../../../../content/images/cover_upload.png';
  @Input() contentBlock?: BloquesCurso;
  @Output() updateBlock = new EventEmitter();

  constructor() {}

  // Actualizar valor de componente y del bloque de contenido en visorContainer
  onUpdateComponent($event: Event, index: number): void {
    this.updateBlock.emit({
      newValue: $event['newValue'],
      type: $event['type'],
      componentIndex: index
    });
  }

  orderVideoText(components: IComponente[]): IComponente[] {
    let temp: IComponente[] = [];
    if (components.length > 1) {
      if (components[0].tipoComponente!.nombre === 'text') {
        temp.push(components[1]);
        temp.push(components[0]);
      } else {
        temp = components;
      }
    }
    return temp;
  }
}
