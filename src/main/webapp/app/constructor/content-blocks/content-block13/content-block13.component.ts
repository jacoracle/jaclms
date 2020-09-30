import { AfterContentInit, EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import { BloquesCurso } from 'app/shared/model/bloques-curso.model';
import { IComponente } from 'app/shared/model/componente.model';
import { ITargetScroll, TargetScroll } from 'app/shared/model/target-scroll.model';

@Component({
  selector: 'jhi-content-block13',
  templateUrl: './content-block13.component.html',
  styleUrls: ['./content-block13.component.scss']
})
export class ContentBlock13Component implements OnInit, AfterContentInit {
  @Input() contentBlock?: BloquesCurso;
  @Output() updateBlock = new EventEmitter();
  @Input() target?: HTMLElement;
  @Input() index?: number;
  newTarget: ITargetScroll[] = [];
  panelOpenState = false;

  componentes: IComponente[] = [];

  constructor(private contentBlocksService: ContentBlocksService) {}

  ngOnInit(): void {
    if (this.contentBlock) {
      const elements = this.contentBlock.bloqueComponentes!.componentes || [];
      this.componentes = [...elements];
    }
    // console.error(this.contentBlock);
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

  // Actualizar valor de componente y del bloque de contenido en visorContainer
  onUpdateComponent($event: Event, index: number): void {
    this.updateBlock.emit({
      newValue: $event['newValue'],
      type: $event['type'],
      componentIndex: index
    });
  }
}
