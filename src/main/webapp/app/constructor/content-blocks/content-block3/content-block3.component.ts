import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BloquesCurso } from 'app/shared/model/bloques-curso.model';

@Component({
  selector: 'jhi-content-block3',
  templateUrl: './content-block3.component.html',
  styleUrls: ['./content-block3.component.scss']
})
export class ContentBlock3Component {
  imgSrc = './../../../../content/images/cover_upload.png';
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
