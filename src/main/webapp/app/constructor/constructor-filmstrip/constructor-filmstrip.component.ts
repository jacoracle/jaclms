import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { Subscription } from 'rxjs';
import { ITipoBloqueComponentes } from 'app/shared/model/tipo-bloque-componentes.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BloquesCursoService } from 'app/entities/bloques_curso/bloques_curso.service';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

@Component({
  selector: 'jhi-constructor-filmstrip',
  templateUrl: './constructor-filmstrip.component.html',
  styleUrls: ['./constructor-filmstrip.component.scss']
})
export class ConstructorFilmstripComponent implements OnInit, OnDestroy, AfterContentInit {
  selectedContentBlockIndex = -1;
  contentBlocks: any;
  subscription: Subscription;
  templates: ITipoBloqueComponentes[] = [];
  contentBlocksComplete = false;

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
    // Obtener contentBlocksComplete actualizados de filmStrip
    this.subscription = this.contentBlocksService
      .getContentBlocksComplete()
      .subscribe(contentBlocksComplete => (this.contentBlocksComplete = contentBlocksComplete));
  }

  ngOnInit(): void {
    // this.contentBlocks = this.contentBlocksService.getContentBlocks();
  }

  /*
   * Selecciona el primer bloque de contenido al terminar de cargar la página.
   */
  ngAfterContentInit(): void {
    this.selectContentBlock(0);
  }

  /*
   * Selecciona el bloque de componentes y lo resalta en visorContainer.
   */
  selectContentBlock(selectedContentBlockIndex: number): void {
    this.selectedContentBlockIndex = selectedContentBlockIndex;
    this.contentBlocksService.setSelectedBlockIndex(this.selectedContentBlockIndex);
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
          this.contentBlocksService.setcontentBlocksComplete(false);
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
}
