import { Component, EventEmitter, Input, OnInit, Output, AfterContentInit } from '@angular/core';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import { BloquesCurso } from 'app/shared/model/bloques-curso.model';
import { ITargetScroll, TargetScroll } from 'app/shared/model/target-scroll.model';

@Component({
  selector: 'jhi-content-block17',
  templateUrl: './content-block17.component.html',
  styleUrls: ['./content-block17.component.scss']
})
export class ContentBlock17Component implements OnInit, AfterContentInit {
  imgSrc = './../../../../content/images/cover_upload.png';
  @Input() contentBlock?: BloquesCurso;
  @Output() updateBlock = new EventEmitter();
  @Input() target?: HTMLElement;
  @Input() index?: number;
  newTarget: ITargetScroll[] = [];

  constructor(private contentBlocksService: ContentBlocksService) {}

  ngOnInit(): void {}

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

  // Actualizar valor de componente y del bloque de contenido en visorContainer
  onUpdateComponent($event: Event, index: number): void {
    this.updateBlock.emit({
      newValue: $event['newValue'],
      type: $event['type'],
      componentIndex: index
    });
  }
}
