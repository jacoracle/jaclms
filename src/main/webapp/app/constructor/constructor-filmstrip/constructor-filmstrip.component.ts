import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import { NavigationControlsService } from '../../services/navigation-controls.service';
import { Subscription } from 'rxjs';
import { IBloqueComponentes } from 'app/shared/model/bloque-componentes.model';
import { ITipoBloqueComponentes } from 'app/shared/model/tipo-bloque-componentes.model';

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

  constructor(private contentBlocksService: ContentBlocksService, private navigationControlsService: NavigationControlsService) {
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
  }

  /**
   * Reordena el filstrip y los bloques de contenido de la mesa de trabajo
   */
  reorderFilmstrip(index: number, ordenOrigin: number, direccion: string): void {
    console.error('indice recibido: ', index);
    console.error('orden original: ', ordenOrigin);
    console.error('dirección: ', direccion);

    this.contentBlocksService.setNewOrderBlock(
      direccion.toUpperCase() === 'UP' ? ordenOrigin - 1 : direccion.toUpperCase() === 'DOWN' ? ordenOrigin + 1 : ordenOrigin
    );
    this.contentBlocksService.setIndexBlockToReorder(index);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
