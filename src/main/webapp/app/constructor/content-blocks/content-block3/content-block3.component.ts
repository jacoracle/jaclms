import { Component, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { BloquesCurso } from 'app/shared/model/bloques-curso.model';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import { ITargetScroll, TargetScroll } from 'app/shared/model/target-scroll.model';

@Component({
  selector: 'jhi-content-block3',
  templateUrl: './content-block3.component.html',
  styleUrls: ['./content-block3.component.scss']
})
export class ContentBlock3Component implements AfterContentInit {
  imgSrc = './../../../../content/images/cover_upload.png';
  @Input() contentBlock?: BloquesCurso;
  @Output() updateBlock = new EventEmitter();
  @Output() updateMultimediaBlock = new EventEmitter();
  @Input() target?: HTMLElement;
  @Input() index?: number;
  newTarget: ITargetScroll[] = [];

  constructor(private contentBlocksService: ContentBlocksService) {}

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

  ngAfterContentInit(): void {
    this.contentBlocksService.getTarget().subscribe(res => {
      this.newTarget = res;
      this.setTarget();
    });
  }

  setTarget(): void {
    if (this.newTarget !== undefined && this.index !== undefined && this.target != null) {
      const targetScroll = new TargetScroll(this.index, this.target);
      this.newTarget.push(targetScroll);
      this.contentBlocksService.setTarget(this.newTarget);
    }
  }
}
