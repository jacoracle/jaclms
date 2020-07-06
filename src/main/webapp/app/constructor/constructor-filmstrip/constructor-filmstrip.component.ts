import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import { NavigationControlsService } from '../../services/navigation-controls.service';
import { Subscription } from 'rxjs';
import { IBloqueComponentes } from 'app/shared/model/bloque-componentes.model';
import { ITipoBloqueComponentes } from 'app/shared/model/tipo-bloque-componentes.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BloquesCursoService } from 'app/entities/bloques_curso/bloques_curso.service';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

@Component({
  selector: 'jhi-constructor-filmstrip',
  templateUrl: './constructor-filmstrip.component.html',
  styleUrls: ['./constructor-filmstrip.component.scss']
})
export class ConstructorFilmstripComponent implements OnInit, AfterContentInit, OnDestroy {
  selectedContentBlockIndex = -1;
  contentBlocks: IBloqueComponentes[];
  selectedTemplateType = '';
  subscription: Subscription;
  templates: ITipoBloqueComponentes[] = [];

  imagePaths = [
    {
      id: 1,
      name: 'title',
      contentBlockType: 'titulo',
      path: '../../../content/images/ab1.png',
      tags: 'text'
    },
    {
      id: 2,
      name: 'text',
      contentBlockType: 'texto',
      path: '../../../content/images/ab2.png',
      tags: 'text'
    },
    {
      id: 3,
      name: 'image',
      contentBlockType: 'imagen',
      path: '../../../content/images/ab3.png',
      tags: 'image'
    },
    {
      id: 4,
      name: 'image_text',
      contentBlockType: 'imagen_texto',
      path: '../../../content/images/ab4.png',
      tags: 'image text'
    }
  ];

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
   * Obtiene la imagen para el fimrstrip de acuerdo con el tipo de bloque de contenido.
   */
  getContentBlockImage(path: string): string {
    return path;
  }

  /*
  
  */
  selectContentBlock(selectedContentBlockIndex: number): void {
    this.selectedContentBlockIndex = selectedContentBlockIndex;
    this.contentBlocksService.setSelectedBlockIndex(this.selectedContentBlockIndex);
    // this.messageService.sendMessage(text);
  }

  /*
   * Crea un bloque de contenido en el servicio ContentBlocksService.
   */
  createContentBlock(): void {
    this.navigationControlsService.setOpenTemplateGallery(true);
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

  isFirstFilm(index: number): boolean {
    return index === 0;
  }

  isLastFilm(index: number): boolean {
    return this.contentBlocks.length - 1 === index;
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.contentBlocks, event.previousIndex, event.currentIndex);
    this.updateBlocksOrder();
    this.bloquesCursoService.update(this.contentBlocks).subscribe(
      res => {
        if (res.body) {
          this.contentBlocks = res.body;
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
