import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { Subscription } from 'rxjs';
import { IBloqueComponentes } from 'app/shared/model/bloque-componentes.model';
import { ITipoBloqueComponentes } from 'app/shared/model/tipo-bloque-componentes.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BloquesCursoService } from 'app/entities/bloques_curso/bloques_curso.service';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { ITargetScroll } from 'app/shared/model/target-scroll.model';

@Component({
  selector: 'jhi-constructor-filmstrip',
  templateUrl: './constructor-filmstrip.component.html',
  styleUrls: ['./constructor-filmstrip.component.scss']
})
export class ConstructorFilmstripComponent implements OnInit, OnDestroy {
  selectedContentBlockIndex = -1;
  contentBlocks: IBloqueComponentes[];
  subscription: Subscription;
  templates: ITipoBloqueComponentes[] = [];
  target: ITargetScroll[] | undefined;

  constructor(
    private contentBlocksService: ContentBlocksService,
    private navigationControlsService: NavigationControlsService,
    private bloquesCursoService: BloquesCursoService,
    private eventManager: JhiEventManager
  ) {
    this.contentBlocks = [];
    this.subscription = this.contentBlocksService.getContentBlocks().subscribe(contentBlocks => {
      if (contentBlocks) {
        this.contentBlocks = contentBlocks;
      }
    });
    this.contentBlocksService.getTempaltes().subscribe(templates => {
      this.templates = templates;
    });
    this.subscription = this.contentBlocksService.getSelectedBlockIndex().subscribe(selectedBlockIndex => {
      this.selectedContentBlockIndex = selectedBlockIndex;
    });

    // eslint-disable-next-line no-console
    console.log(this.contentBlocksService.getTarget());
    this.contentBlocksService.getTarget().subscribe(res => {
      this.target = res;

      this.selectContentBlock(0);
    });
  }

  ngOnInit(): void {
    // this.contentBlocks = this.contentBlocksService.getContentBlocks();
    // this.messageService.sendMessage(text);
  }

  selectContentBlock(selectedContentBlockIndex: number): void {
    this.selectedContentBlockIndex = selectedContentBlockIndex;
    this.contentBlocksService.setSelectedBlockIndex(this.selectedContentBlockIndex);
    if (this.target !== undefined) {
      for (const entry of this.target) {
        if (entry.index === selectedContentBlockIndex) {
          this.scroll(entry.target);
        }
      }
    }
  }

  /*
   * Elimina el bloque de contenido seleccionado en ContentBlocksService.
   */
  deleteContentBlock(index: number): void {
    this.contentBlocksService.setIndexBlockToDelete(index);
    this.navigationControlsService.setOpenProperties(false);
  }

  validateFimstripsSize(): boolean {
    return this.contentBlocks.length > 1;
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.contentBlocks, event.previousIndex, event.currentIndex);
    this.updateBlocksOrder();
    this.bloquesCursoService.update(this.contentBlocks).subscribe(
      res => {
        if (res.body) {
          this.contentBlocks = res.body;
          this.contentBlocksService.setContentBlocks(this.contentBlocks);
        }
      },
      () => {
        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.blockUpdateError', {
            message: 'constructorApp.curso.blockUpdate.error',
            type: 'danger'
          })
        );
      }
    );
  }

  /**
   * asigna el orden correspondiente a los bloques de la mesa de trabajo
   */
  updateBlocksOrder(): void {
    for (let i = 0; i < this.contentBlocks.length; i++) {
      this.contentBlocks[i].orden = i + 1;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  scroll(el: HTMLElement): void {
    el.scrollIntoView();
  }
}
