import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import { Subscription, Observable, Subject } from 'rxjs';
import { IBloqueComponentes, BloqueComponentes } from 'app/shared/model/bloque-componentes.model';
import { ITipoBloqueComponentes, TipoBloqueComponentes } from 'app/shared/model/tipo-bloque-componentes.model';
import { IComponente, Componente } from 'app/shared/model/componente.model';
import { NivelJerarquico, INivelJerarquico } from 'app/shared/model/nivel-jerarquico.model';
import { NivelJerarquicoService } from 'app/entities/nivel-jerarquico/nivel-jerarquico.service';
import { HttpResponse } from '@angular/common/http';
import { TipoNivelJerarquico } from 'app/shared/model/enumerations/tipo-nivel-jerarquico.model';
import { ITipoComponente } from 'app/shared/model/tipo-componente.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { TextEditorBehaviorService } from 'app/services/text-editor-behavior.service';
import { EventEmitterService } from 'app/services/event-emitter.service';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { IContenido, Contenido } from 'app/shared/model/contenido.model';
import { IBloquesCurso, BloquesCurso } from 'app/shared/model/bloques-curso.model';
import { BloquesCursoService } from 'app/entities/bloques_curso/bloques_curso.service';
import { takeUntil } from 'rxjs/operators';
import { ContenidoService } from 'app/entities/contenido/contenido.service';

@Component({
  selector: 'jhi-constructor-visor-container',
  templateUrl: './constructor-visor-container.component.html',
  styleUrls: ['./constructor-visor-container.component.scss']
})
export class ConstructorVisorContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  templates: ITipoBloqueComponentes[] = [];
  selectedTemplateType = '';
  selectedBlock = -1;
  newIndexOrderBlock = -1;
  contentBlocks = Array<IBloquesCurso>();
  nivel: NivelJerarquico = {
    nivelId: undefined,
    cursoId: 11,
    nombre: 'Lección de Español',
    tipo: TipoNivelJerarquico['L'],
    informacionAdicional: 0,
    orden: 1,
    bloquesCurso: undefined
  };
  error = false;
  success = false;
  _curso: any;
  @Input()
  set curso(val: any) {
    this.showLoader = false;
    this._curso = val;
    if (this._curso !== undefined) {
      this.nivel.cursoId = this._curso.id;
      if (this._curso.nivelesCurso.length) {
        this.showLoader = false;
        this.nivel = this._curso.nivelesCurso[0].nivelJerarquico;
        this.nivel.cursoId = this._curso.id;
        this.contentBlocks = [];
        // this.contentBlocks = this.orderTextImageLevel(this.nivel.bloquesComponentes!);
        this.contentBlocks = this.nivel.bloquesCurso!;
        this.nivel.nivelId = this._curso.nivelesCurso[0].nivelJerarquico.id;
        this.contentBlocksService.setContentBlocks(this.contentBlocks);
      }
    }
  }
  get curso(): any {
    return this._curso;
  }
  visorSize = 'desktop';
  showLoader = false;
  private ngUnsubscribe = new Subject();

  constructor(
    private contentBlocksService: ContentBlocksService,
    private nivelJerarquicoService: NivelJerarquicoService,
    private eventManager: JhiEventManager,
    private textEditorBehaviosService: TextEditorBehaviorService,
    private eventEmitterService: EventEmitterService,
    private navigationControlsService: NavigationControlsService,
    private bloquesCursoService: BloquesCursoService,
    private contenidoService: ContenidoService
  ) {
    this.showLoader = true;
    this.contentBlocks = [];
    this.subscription = this.contentBlocksService
      .getTempaltes()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(templates => {
        this.templates = templates;
      });
    this.subscription = this.contentBlocksService
      .getSelectedBlock()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(selectedBlock => {
        if (selectedBlock !== undefined) {
          if (this.contentBlocks.length <= 1 || this.selectedBlock === 0) {
            this.selectedBlock = 0;
          }
          this.contentBlocks.splice(this.selectedBlock + 1, 0, this.createCourseBlocks(selectedBlock));
          this.updateBlocksOrder();
          this.contentBlocksService.setContentBlocks(this.contentBlocks);
          this.contentBlocksService.setSelectedBlockIndex(this.selectedBlock);
          // Guardar nivel nuevo incluyendo primer bloquesCurso creado
          if (this.nivel.nivelId) {
            this.subscription = this.bloquesCursoService
              .update(this.contentBlocks)
              .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe(
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
          // Actualizar bloquesCurso en base de datos con el nuevo orden, incluyendo el bloque nuevo
          else {
            this.save();
          }
        }
      });
    this.subscription = this.contentBlocksService
      .getIndexBlockToDelete()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(indexBlockToDelete => {
        this.deleteContentBlock(indexBlockToDelete);
      });
    this.subscription = this.navigationControlsService
      .getVisorSize()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(visorSize => {
        this.visorSize = visorSize;
      });
    this.subscription = this.contentBlocksService
      .getSelectedBlockIndex()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(selectedBlockIndex => {
        this.selectedBlock = selectedBlockIndex;
      });
  }

  /**
   * actualiza el indice de los bloques de la mesa de trabajo cuando se
   * reordena la tira de pelicula desde los botones y se actualiza el orden
   * en cada objeto de bloque.
   * @param oldIndex
   * @param newIndex
   */
  updateBlocksIndexOrder(oldIndex: number, newIndex: number): void {
    this.contentBlocks.splice(newIndex, 0, this.contentBlocks.splice(oldIndex, 1)[0]);
    this.updateBlocksOrder();
  }

  /**
   * asigna el orden correspondiente a los bloques de la mesa de trabajo
   */
  updateBlocksOrder(): void {
    for (let i = 0; i < this.contentBlocks.length; i++) {
      this.contentBlocks[i].orden = i + 1;
    }
  }

  // Actualizar bloque contenido de componente
  onUpdateBlock($event: Event, index: number): void {
    if (this.contentBlocks[index]) {
      if (this.contentBlocks[index]!.bloqueComponentes!.componentes![$event['componentIndex']]) {
        switch ($event['type']) {
          // Actualizar componente con HTML en string desde textComponent
          case 'text': {
            this.contentBlocks[index]!.bloqueComponentes!.componentes![$event['componentIndex']].contenido!.contenido = $event['newValue'];
            break;
          }
          // Actualizar componente con path de la imagen seleccionada
          case 'image': {
            this.contentBlocks[index]!.bloqueComponentes!.componentes![$event['componentIndex']].contenido!.contenido = $event['newValue'];
            break;
          }
          // Actualizar componente con path del video seleccionado
          case 'video': {
            this.contentBlocks[index]!.bloqueComponentes!.componentes![$event['componentIndex']].contenido!.contenido = $event['newValue'];
            break;
          }
        }
      }
    }
  }

  onUpdateMultimediaBlock(event: Event, index: number): void {
    if (this.contentBlocks[index]) {
      if (this.contentBlocks[index]!.bloqueComponentes!.componentes![event['componentIndex']]) {
        this.contentBlocks[index]!.bloqueComponentes!.componentes![event['componentIndex']].contenido!.nombre =
          event['multimediaProperties'].nombre;
        this.contentBlocks[index]!.bloqueComponentes!.componentes![event['componentIndex']].contenido!.extension =
          event['multimediaProperties'].extension;
        this.contentBlocks[index]!.bloqueComponentes!.componentes![event['componentIndex']].contenido!.peso =
          event['multimediaProperties'].peso;
        this.contentBlocks[index]!.bloqueComponentes!.componentes![event['componentIndex']].contenido!.contenido =
          event['multimediaProperties'].contenido;
      }
    }
  }

  save(): void {
    this.showLoader = true;
    this.success = false;
    this.error = false;
    this.nivel.bloquesCurso = this.contentBlocks;
    if (this.nivel.nivelId) {
      this.subscribeToSaveResponse(this.nivelJerarquicoService.update(this.nivel));
    } else {
      this.subscribeToSaveResponse(this.nivelJerarquicoService.create(this.nivel));
    }
    this.textEditorBehaviosService.setShowTextEditor(false);
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INivelJerarquico>>): void {
    result.subscribe(
      res => {
        this.showLoader = false;
        this.onSaveSuccess(res);
      },
      () => {
        this.showLoader = false;
        this.onSaveError();
      }
    );
  }

  protected onSaveSuccess(res: any): void {
    this.success = true;
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', {
        message: 'constructorApp.curso.nivelJerarquico.created',
        type: 'success'
      })
    );
    this.nivel = res.body;
    this.contentBlocks = [];
    this.contentBlocks = res.body.bloquesCurso;
    this.contentBlocksService.setContentBlocks(this.contentBlocks);
    this.navigationControlsService.setOpenTemplateGallery(false);
    this.navigationControlsService.setOpenProperties(false);
  }

  protected onSaveError(): void {
    this.error = true;
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', {
        message: 'constructorApp.curso.nivelJerarquico.error',
        type: 'danger'
      })
    );
  }

  createCourseBlocks(selectedTemplate: ITipoBloqueComponentes): IBloquesCurso {
    return {
      ...new BloquesCurso(),
      id: undefined,
      bloqueComponentes: this.createContentBlock(selectedTemplate),
      orden: this.determineNewBlockOrder(),
      mostrar: 1,
      indicadorOriginal: 1,
      nivelJerarquico: this.asignCurrentLevel()
    };
  }

  asignCurrentLevel(): INivelJerarquico | undefined {
    if (this.nivel.nivelId) {
      return { nivelId: this.nivel.nivelId };
    }
    return undefined;
  }

  createContentBlock(selectedTemplate: ITipoBloqueComponentes): IBloqueComponentes {
    const componentes = new Array<IComponente>();
    if (selectedTemplate.nombre === 'imagen_texto') {
      selectedTemplate.tiposComponentes = this.orderTextImage(selectedTemplate.tiposComponentes!);
    }
    if (selectedTemplate.nombre === 'indicacion_video') {
      selectedTemplate.tiposComponentes = this.orderTextVideo(selectedTemplate.tiposComponentes!);
    }
    if (selectedTemplate.nombre === 'video_envolvente') {
      selectedTemplate.tiposComponentes = this.orderVideoText(selectedTemplate.tiposComponentes!);
    }
    for (let i = 0; i < selectedTemplate.tiposComponentes!.length; i++) {
      componentes.push(this.createComponent(selectedTemplate.tiposComponentes![i], i + 1));
    }
    return {
      ...new BloqueComponentes(),
      id: undefined,
      orden: this.determineNewBlockOrder(),
      tipoBloqueComponentes: selectedTemplate,
      componentes
    };
  }

  // Función temporal para poner texto antes que imagen al recibir información de guardado, actualización o consulta.
  orderTextImageLevel(contentBlocks: IBloqueComponentes[]): IBloqueComponentes[] {
    for (let i = 0; i < contentBlocks.length; i++) {
      if (
        contentBlocks[i]!.tipoBloqueComponentes &&
        contentBlocks[i]!.tipoBloqueComponentes!.nombre === 'imagen_texto' &&
        contentBlocks[i]!.componentes!.length
      ) {
        if (contentBlocks[i]!.componentes![0].tipoComponente!.nombre === 'image') {
          const tempArray = [];
          tempArray.push(contentBlocks[i]!.componentes![1]);
          tempArray.push(contentBlocks[i]!.componentes![0]);
          contentBlocks[i]!.componentes = tempArray;
        }
      }
    }
    return contentBlocks;
  }

  // Función temporal para poner texto antes que imagen. Pendiente relación y orden en base de datos.
  orderTextImage(componentTypes: ITipoComponente[]): ITipoBloqueComponentes[] {
    if (componentTypes.length < 2) {
      return componentTypes;
    }
    let tempArray = [];
    if (componentTypes[0].nombre === 'image') {
      tempArray.push(componentTypes[1]);
      tempArray.push(componentTypes[0]);
    } else {
      tempArray = componentTypes;
    }
    return tempArray;
  }

  // Función temporal para poner texto antes que video. Pendiente relación y orden en base de datos.
  orderTextVideo(componentTypes: ITipoComponente[]): ITipoBloqueComponentes[] {
    if (componentTypes.length < 2) {
      return componentTypes;
    }
    let tempArray = [];
    if (componentTypes[0].nombre === 'video') {
      tempArray.push(componentTypes[1]);
      tempArray.push(componentTypes[0]);
    } else {
      tempArray = componentTypes;
    }
    return tempArray;
  }

  // Función temporal para poner video antes que texto. Pendiente relación y orden en base de datos.
  orderVideoText(componentTypes: ITipoComponente[]): ITipoBloqueComponentes[] {
    if (componentTypes.length < 2) {
      return componentTypes;
    }
    let tempArray = [];
    if (componentTypes[0].nombre === 'text') {
      tempArray.push(componentTypes[1]);
      tempArray.push(componentTypes[0]);
    } else {
      tempArray = componentTypes;
    }
    return tempArray;
  }

  createComponent(componentBlockType: TipoBloqueComponentes, order: number): IComponente {
    return {
      ...new Componente(),
      id: undefined,
      contenido: this.createContenido(''),
      tipoComponente: componentBlockType,
      version: 1,
      orden: order
    };
  }

  createContenido(contenido: string): IContenido {
    return {
      ...new Contenido(),
      contenido
    };
  }

  determineNewBlockOrder(): number {
    return this.contentBlocks.length + 1;
  }

  deleteContentBlock(index: number): void {
    const backup = this.contentBlocks.map(obj => ({ ...obj }));
    if (index > -1) {
      this.contentBlocks.splice(index, 1);
      this.updateBlocksOrder();
      this.subscription = this.bloquesCursoService
        .delete(backup[index].id!)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          () => {
            // Eliminación satisfactoria
            this.bloquesCursoService
              .update(this.contentBlocks)
              .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe(
                res => {
                  // Actualización satisfactoria
                  if (res.body) {
                    this.contentBlocks = res.body;
                    this.contentBlocksService.setContentBlocks(this.contentBlocks);
                  }
                },
                () => {
                  // Error al actualizar
                  this.contentBlocks = backup;
                  this.contentBlocksService.setContentBlocks(this.contentBlocks);
                  this.eventManager.broadcast(
                    new JhiEventWithContent('constructorApp.blockUpdateError', {
                      message: 'constructorApp.curso.blockUpdate.error',
                      type: 'danger'
                    })
                  );
                }
              );
          },
          () => {
            // Error al eliminar
            this.contentBlocks = backup;
            this.eventManager.broadcast(
              new JhiEventWithContent('constructorApp.blockUpdateError', {
                message: 'constructorApp.curso.blockUpdate.error',
                type: 'danger'
              })
            );
          }
        );
    }
  }

  getBlockTypeName(blockId: number): string {
    let name = '';
    for (let i = 0; i < this.templates.length; i++) {
      if (this.templates[i].id === blockId) {
        name = this.templates[i].nombre!;
      }
    }
    return name;
  }

  ngOnInit(): void {
    this.subscription = this.eventEmitterService
      .getInvokeSave()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.save();
      });
    this.addNewBlock();
  }

  selectBlock(index: number): void {
    this.selectedBlock = index;
    this.contentBlocksService.setSelectedBlockIndex(this.selectedBlock);
  }

  addNewBlock(): void {
    this.navigationControlsService.setOpenTemplateGallery(true);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
