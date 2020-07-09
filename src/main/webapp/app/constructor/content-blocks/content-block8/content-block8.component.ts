import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BloquesCurso } from 'app/shared/model/bloques-curso.model';

@Component({
  selector: 'jhi-content-block8',
  templateUrl: './content-block8.component.html',
  styleUrls: ['./content-block8.component.scss']
})
export class ContentBlock8Component {
  @Input() contentBlock?: BloquesCurso;
  @Output() updateBlock = new EventEmitter();
  @Output() updateMultimediaBlock = new EventEmitter();

  constructor() {}

  // Actualizar valor de componente y del bloque de contenido en visorContainer
  onUpdateComponent($event: Event, index: number): void {
    this.updateBlock.emit({
      newValue: $event['newValue'],
      type: $event['type'],
      componentIndex: index
    });
  }

  onUpdateMultimediaProperties($event: Event, index: number): void {
    this.updateMultimediaBlock.emit({
      multimediaProperties: $event,
      componentIndex: index
    });
  }
}
