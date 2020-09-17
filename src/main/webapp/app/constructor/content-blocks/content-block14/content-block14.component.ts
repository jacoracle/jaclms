import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import { BloquesCurso } from 'app/shared/model/bloques-curso.model';
import { ITargetScroll, TargetScroll } from 'app/shared/model/target-scroll.model';

@Component({
  selector: 'jhi-content-block14',
  templateUrl: './content-block14.component.html',
  styleUrls: ['./content-block14.component.scss']
})
export class ContentBlock14Component implements OnInit, AfterContentInit {
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

  onUpdateComponent($event: Event, index: number): void {
    this.updateBlock.emit({
      newValue: $event['newValue'],
      type: $event['type'],
      componentIndex: index
    });
  }
}
