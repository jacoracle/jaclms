import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { BloqueComponentes, IBloqueComponentes } from 'app/shared/model/bloque-componentes.model';
import { ITipoBloqueComponentes } from 'app/shared/model/tipo-bloque-componentes.model';
import { Componente, IComponente } from 'app/shared/model/componente.model';
import { INivelJerarquico, NivelJerarquico } from 'app/shared/model/nivel-jerarquico.model';
import { NivelJerarquicoService } from 'app/entities/nivel-jerarquico/nivel-jerarquico.service';
import { HttpResponse } from '@angular/common/http';
import { TipoComponente } from 'app/shared/model/tipo-componente.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { TextEditorBehaviorService } from 'app/services/text-editor-behavior.service';
import { EventEmitterService } from 'app/services/event-emitter.service';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { Contenido, IContenido } from 'app/shared/model/contenido.model';
import { BloquesCurso, IBloquesCurso } from 'app/shared/model/bloques-curso.model';
import { BloquesCursoService } from 'app/entities/bloques_curso/bloques_curso.service';
import { takeUntil } from 'rxjs/operators';
import { ContentBlock1Component } from 'app/constructor/content-blocks/content-block1/content-block1.component';
import { ContentBlock2Component } from 'app/constructor/content-blocks/content-block2/content-block2.component';
import { ContentBlock3Component } from 'app/constructor/content-blocks/content-block3/content-block3.component';
import { ContentBlock4Component } from 'app/constructor/content-blocks/content-block4/content-block4.component';
import { ContentBlock5Component } from 'app/constructor/content-blocks/content-block5/content-block5.component';
import { ContentBlock6Component } from 'app/constructor/content-blocks/content-block6/content-block6.component';
import { ContentBlock7Component } from 'app/constructor/content-blocks/content-block7/content-block7.component';
import { ContentBlock8Component } from 'app/constructor/content-blocks/content-block8/content-block8.component';
import { ContentBlock9Component } from 'app/constructor/content-blocks/content-block9/content-block9.component';
import { ContentBlock10Component } from 'app/constructor/content-blocks/content-block10/content-block10.component';
import { ActividadInteractiva, ContenidoActividad, IActividadInteractiva } from 'app/shared/model/actividad-interactiva.model';
// import { ContentBlock11Component } from '../content-blocks/content-block11/content-block11.component';
import { ContentBlock12Component } from '../content-blocks/content-block12/content-block12.component';
import { ContentBlock13Component } from '../content-blocks/content-block13/content-block13.component';
import { ContentBlock14Component } from '../content-blocks/content-block14/content-block14.component';
import { ContentBlock11Component } from 'app/constructor/content-blocks/content-block11/content-block11.component';
import { ContentBlock17Component } from '../content-blocks/content-block17/content-block17.component';
import { ContentBlock18Component } from '../content-blocks/content-block18/content-block18.component';
import { ContentBlock15Component } from 'app/constructor/content-blocks/content-block15/content-block15.component';
import { ContentBlock16Component } from 'app/constructor/content-blocks/content-block16/content-block16.component';
import { ContentBlock19Component } from '../content-blocks/content-block19/content-block19.component';
import { FileUploadService } from 'app/services/file-upload.service';

@Component({
  selector: 'jhi-constructor-visor-container',
  templateUrl: './constructor-visor-container.component.html',
  styleUrls: ['./constructor-visor-container.component.scss']
})
export class ConstructorVisorContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  selectedBlock = -1;
  contentBlocks = Array<IBloquesCurso>();
  nivel: NivelJerarquico = {};
  error = false;
  success = false;
  _curso: any;
  _modulo: any;
  @Input() type?: string;
  // contentBlocksComplete = true;

  componentes = [
    { nombre: 'titulo', componente: ContentBlock1Component },
    { nombre: 'texto', componente: ContentBlock2Component },
    { nombre: 'imagen', componente: ContentBlock3Component },
    { nombre: 'imagen_texto', componente: ContentBlock4Component },
    { nombre: 'video', componente: ContentBlock5Component },
    { nombre: 'indicacion_video', componente: ContentBlock6Component },
    { nombre: 'video_envolvente', componente: ContentBlock7Component },
    { nombre: 'pdf', componente: ContentBlock8Component },
    { nombre: 'sound', componente: ContentBlock9Component },
    { nombre: 'actividad', componente: ContentBlock10Component },
    // { nombre: 'cabecera', componente: ContentBlock11Component },
    { nombre: 'cabecera', componente: ContentBlock12Component },
    { nombre: 'colapsable', componente: ContentBlock13Component },
    { nombre: 'tip', componente: ContentBlock14Component },
    { nombre: 'activity_question_text', componente: ContentBlock10Component },
    { nombre: 'activity_question_media', componente: ContentBlock11Component },
    { nombre: 'indicador', componente: ContentBlock17Component },
    { nombre: 'numeracion_actividad', componente: ContentBlock18Component },
    { nombre: 'activity_question_audio_text', componente: ContentBlock15Component },
    { nombre: 'activity_question_audio_media', componente: ContentBlock16Component },
    { nombre: 'pregunta', componente: ContentBlock19Component }
  ];

  @Input()
  set curso(val: any) {
    this.showLoader = false;
    this._curso = val;
    if (this._curso !== undefined && this.type === 'course') {
      this.nivel.cursoId = this._curso.id;
      if (this._curso.nivelesCurso.length) {
        this.showLoader = false;
        this.nivel = this._curso.nivelesCurso[0].nivelJerarquico;
        this.nivel.cursoId = this._curso.id;
        this.contentBlocks = [];
        this.contentBlocks = this.nivel.bloquesCurso!;
        this.nivel.nivelId = this._curso.nivelesCurso[0].nivelJerarquico.id;
        this.contentBlocksService.setContentBlocks(this.contentBlocks);
      }
    }
  }

  get curso(): any {
    return this._curso;
  }

  @Input()
  set modulo(val: any) {
    this.showLoader = false;
    this._modulo = val;
    if (this._modulo !== undefined && this.type === 'module') {
      this.nivel.moduloId = this._modulo.id;
      if (this._modulo.nivelesModulo) {
        this.showLoader = false;
        this.nivel = this._modulo.nivelesModulo.nivelJerarquico;
        this.nivel.moduloId = this._modulo.id;
        this.contentBlocks = [];
        this.contentBlocks = this.nivel.bloquesCurso!;
        this.nivel.nivelId = this._modulo.nivelesModulo.nivelJerarquico.id;
        this.contentBlocksService.setContentBlocks(this.contentBlocks);
      }
    }
  }

  get modulo(): any {
    return this._modulo;
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
    private fileUploadService: FileUploadService
  ) {
    this.showLoader = true;
    this.contentBlocks = [];
    this.subscription = this.contentBlocksService
      .getSelectedBlock()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(selectedBlock => {
        if (selectedBlock !== undefined) {
          this.showLoader = true;
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
                    this.contentBlocksService.setContentBlocks(this.contentBlocks);
                    this.showLoader = false;
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

    // Obtener bloques actualizados de filmStrip
    this.subscription = this.contentBlocksService.getContentBlocks().subscribe(contentBlocks => {
      this.contentBlocks = contentBlocks;
    });
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
  onUpdateBlock($event: any, index: number): void {
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

  save(): void {
    this.showLoader = true;
    this.success = false;
    this.error = false;
    this.nivel.bloquesCurso = this.contentBlocks;
    if (this.nivel.nivelId) {
      this.subscribeToSaveResponse(this.nivelJerarquicoService.update(this.nivel, this.type));
    } else {
      this.subscribeToSaveResponse(this.nivelJerarquicoService.create(this.nivel, this.type));
    }
    this.textEditorBehaviosService.setShowTextEditor(false);
  }

  onUpdateMultimediaBlock(event: Event, index: number): void {
    if (this.contentBlocks[index]) {
      if (this.contentBlocks[index]!.bloqueComponentes!.componentes![event['componentIndex']]) {
        const queryContenido = this.contentBlocks[index]!.bloqueComponentes!.componentes![event['componentIndex']].contenido!;
        queryContenido.nombre = event['multimediaProperties'].nombre;
        queryContenido.extension = event['multimediaProperties'].extension;
        queryContenido.peso = event['multimediaProperties'].peso;
        queryContenido.contenido = event['multimediaProperties'].contenido;
      }
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INivelJerarquico>>): void {
    result.subscribe(
      res => {
        // this.showLoader = false;
        this.onSaveSuccess(res);
      },
      () => {
        // this.showLoader = false;
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
    this.showLoader = false;
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
      visible: 1,
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
    for (let i = 0; i < selectedTemplate.tiposBloquesComponentes!.length; i++) {
      const tempComp = this.createComponent(selectedTemplate.tiposBloquesComponentes![i].tipoComponente!, i);
      componentes.push(tempComp);
    }
    return {
      ...new BloqueComponentes(),
      id: undefined,
      orden: this.determineNewBlockOrder(),
      tipoBloqueComponentes: selectedTemplate,
      componentes
    };
  }

  createComponent(componentType: TipoComponente, order: number): IComponente {
    return {
      ...new Componente(),
      id: undefined,
      contenido: this.createContenido(componentType, ''),
      actividadesInteractivas: this.createActividadInteractva(componentType),
      tipoComponente: componentType,
      version: 1,
      orden: order
    };
  }

  createContenido(componentType: TipoComponente, contenido: string): IContenido | null {
    if (componentType.nombre === 'activity') {
      return null;
    } else {
      return {
        ...new Contenido(),
        contenido
      };
    }
  }

  createActividadInteractva(componentType: TipoComponente): IActividadInteractiva[] | null {
    if (componentType.nombre === 'activity') {
      const actividad = [];
      actividad.push({
        ...new ActividadInteractiva(),
        contenido: this.createContenidoActividad(),
        evaluable: null,
        intentos: null,
        gamificacion: null,
        nombre: ''
      });
      return actividad;
    } else {
      return null;
    }
  }

  createContenidoActividad(): ContenidoActividad {
    return {
      ...new ContenidoActividad()
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
                    if (backup[index] && backup[index].bloqueComponentes) {
                      this.deleteActivityBlockResources(backup[index].bloqueComponentes!);
                    }
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

  ngOnInit(): void {
    this.subscription = this.eventEmitterService
      .getInvokeSave()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.save();
      });
    this.addNewBlock();
  }

  selectBlock(index: number, blockId: number): void {
    this.selectedBlock = index;
    this.contentBlocksService.setSelectedBlockId(blockId);
    this.contentBlocksService.setSelectedBlockIndex(this.selectedBlock);
    this.navigationControlsService.setOpenProperties(true);
  }

  addNewBlock(): void {
    this.navigationControlsService.setOpenTemplateGallery(true);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  deleteActivityBlockResources(block: IBloqueComponentes): void {
    if (block.tipoBloqueComponentes && block.tipoBloqueComponentes.nombre === 'pregunta') {
      if (block.componentes) {
        for (let i = 0; i < block.componentes.length; i++) {
          if (
            block.componentes[i].tipoComponente &&
            block.componentes[i].tipoComponente!.nombre &&
            block.componentes[i].tipoComponente!.nombre === 'activity'
          ) {
            if (block.componentes[i].actividadesInteractivas && block.componentes[i].actividadesInteractivas![0].contenido) {
              const contenido = block.componentes[i].actividadesInteractivas![0].contenido;
              for (let j = 0; j < contenido.preguntas.length; j++) {
                if (contenido.preguntas[j].path && contenido.preguntas[j].path !== '') {
                  const pregunta = contenido.preguntas[j];
                  this.deleteResource(pregunta.path);
                  if (pregunta.respuestas) {
                    for (let k = 0; k < pregunta.respuestas.length; k++) {
                      if (pregunta.respuestas[k].path && pregunta.respuestas[k].path !== '') {
                        this.deleteResource(pregunta.respuestas[k].path);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  deleteResource(path: string): void {
    this.fileUploadService.deleteFile(path).subscribe(() => {});
  }
}
