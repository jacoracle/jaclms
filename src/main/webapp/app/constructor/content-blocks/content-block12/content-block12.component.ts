import { Component, EventEmitter, Input, OnInit, Output, AfterContentInit } from '@angular/core';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import { BloquesCurso } from 'app/shared/model/bloques-curso.model';
import { ITargetScroll, TargetScroll } from 'app/shared/model/target-scroll.model';

@Component({
  selector: 'jhi-content-block12',
  templateUrl: './content-block12.component.html',
  styleUrls: ['./content-block12.component.scss']
})
export class ContentBlock12Component implements OnInit, AfterContentInit {
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

  // orderTextImage(components: IComponente[]): IComponente[] {
  //   let temp: IComponente[] = [];
  //   if (components.length > 1) {
  //     if (components[0].tipoComponente!.nombre === 'image') {
  //       temp.push(components[1]);
  //       temp.push(components[0]);
  //     } else {
  //       temp = components;
  //     }
  //   }
  //   return temp;
  // }

  /*
  imgSrc = './../../../../content/images/cover_upload.png';
  @Input() contentBlock?: BloquesCurso;
  @Output() updateBlock = new EventEmitter();
  @Output() updateMultimediaBlock = new EventEmitter();
  @Input() target?: HTMLElement;
  @Input() index?: number;
  newTarget: ITargetScroll[] = [];

  constructor(private contentBlocksService: ContentBlocksService) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.contentBlocksService.getTarget().subscribe(res => {
      this.newTarget = res;
      this.setTarget();
    });
  }

  // Actualizar valor de componente y del bloque de contenido en visorContainer
  onUpdateComponent($event: Event, index: number): void {
    this.updateBlock.emit({
      newValue: $event['newValue'],
      type: $event['type'],
      multimediaProperties: $event,
      componentIndex: index
    });
  }

  setTarget(): void {
    if (this.newTarget !== undefined && this.index !== undefined && this.target != null) {
      const targetScroll = new TargetScroll(this.index, this.target);
      this.newTarget.push(targetScroll);
      this.contentBlocksService.setTarget(this.newTarget);
    }
  }

  */
}
