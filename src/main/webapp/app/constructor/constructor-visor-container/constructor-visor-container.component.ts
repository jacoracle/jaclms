import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import { Subscription, Observable } from 'rxjs';
import { IBloqueComponentes, BloqueComponentes } from 'app/shared/model/bloque-componentes.model';
import { ITipoBloqueComponentes, TipoBloqueComponentes } from 'app/shared/model/tipo-bloque-componentes.model';
import { IComponente, Componente } from 'app/shared/model/componente.model';
import { NivelJerarquico, INivelJerarquico } from 'app/shared/model/nivel-jerarquico.model';
import { NivelJerarquicoService } from 'app/entities/nivel-jerarquico/nivel-jerarquico.service';
import { HttpResponse } from '@angular/common/http';
import { TipoNivelJerarquico } from 'app/shared/model/enumerations/tipo-nivel-jerarquico.model';
import { TipoComponente, ITipoComponente } from 'app/shared/model/tipo-componente.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { TextEditorBehaviorService } from 'app/services/text-editor-behavior.service';
import { EventEmitterService } from 'app/services/event-emitter.service';
import { NavigationControlsService } from 'app/services/navigation-controls.service';

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
  contentBlocks = Array<IBloqueComponentes>();
  nivel: NivelJerarquico = {
    nivelId: undefined,
    cursoId: 11,
    nombre: 'Lección de Español',
    tipo: TipoNivelJerarquico['L'],
    informacionAdicional: 0,
    orden: 1,
    bloquesComponentes: undefined
  };
  tiposComponente: TipoComponente[] = [
    {
      id: 1,
      nombre: 'text'
    },
    {
      id: 2,
      nombre: 'image'
    }
  ];
  error = false;
  success = false;
  _curso: any;
  @Input()
  set curso(val: any) {
    this._curso = val;
    if (this._curso !== undefined) {
      this.nivel.cursoId = this._curso.id;
      if (this._curso.nivelesCurso.length) {
        this.nivel = this._curso.nivelesCurso[0].nivelJerarquico;
        this.nivel.cursoId = this._curso.id;
        this.contentBlocks = [];
        // this.contentBlocks = this.orderTextImageLevel(this.nivel.bloquesComponentes!);
        this.contentBlocks = this.nivel.bloquesComponentes!;
        this.nivel.nivelId = this._curso.nivelesCurso[0].nivelJerarquico.id;
        this.contentBlocksService.setContentBlocks(this.contentBlocks);
      }
    }
  }
  get curso(): any {
    return this._curso;
  }

  constructor(
    private contentBlocksService: ContentBlocksService,
    private nivelJerarquicoService: NivelJerarquicoService,
    private eventManager: JhiEventManager,
    private textEditorBehaviosService: TextEditorBehaviorService,
    private eventEmitterService: EventEmitterService,
    private navigationControlsService: NavigationControlsService
  ) {
    this.contentBlocks = [];
    this.subscription = this.contentBlocksService.getTempaltes().subscribe(templates => {
      this.templates = templates;
    });
    this.subscription = this.contentBlocksService.getSelectedBlock().subscribe(selectedBlock => {
      if (selectedBlock !== undefined) {
        this.contentBlocks.splice(this.selectedBlock + 1, 0, this.createContentBlock(selectedBlock.selectedBlock));
        this.updateBlocksOrder();
        this.selectedBlock = this.selectedBlock + 1;
        this.contentBlocksService.setContentBlocks(this.contentBlocks);
      }
    });
    this.subscription = this.contentBlocksService.getIndexBlockToDelete().subscribe(indexBlockToDelete => {
      this.deleteContentBlock(indexBlockToDelete);
    });
  }

  updateBlocksOrder(): void {
    for (let i = 0; i < this.contentBlocks.length; i++) {
      this.contentBlocks[i].orden = i + 1;
    }
  }

  onUpdateBlock($event: Event, index: number): void {
    if (this.contentBlocks[index]) {
      if (this.contentBlocks[index]!.componentes![$event['componentIndex']]) {
        switch ($event['type']) {
          case 'text': {
            this.contentBlocks[index]!.componentes![$event['componentIndex']].contenido = $event['newValue'];
          }
        }
      }
    }
  }

  save(): void {
    this.success = false;
    this.error = false;
    this.nivel.bloquesComponentes = this.contentBlocks;
    if (this.nivel.nivelId) {
      this.subscribeToSaveResponse(this.nivelJerarquicoService.update(this.nivel));
    } else {
      this.subscribeToSaveResponse(this.nivelJerarquicoService.create(this.nivel));
    }
    // console.error(JSON.stringify(this.nivel));
    this.textEditorBehaviosService.setShowTextEditor(false);
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INivelJerarquico>>): void {
    result.subscribe(
      res => this.onSaveSuccess(res),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(res: any): void {
    this.success = true;
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.nivelJerarquico.created' })
    );
    this.nivel = res.body;
    /*
    this.contentBlocksService.setContentBlocks(this.contentBlocks);
    */
    this.contentBlocks = [];
    // this.contentBlocks = this.orderTextImageLevel(res.body.bloquesComponentes);
    this.contentBlocks = res.body.bloquesComponentes;
    this.contentBlocksService.setContentBlocks(this.contentBlocks);
    // this.updateContentBlocks(res.body.bloquesComponentes);
  }

  /*
  updateContentBlocks(contentBlocks: IBloqueComponentes[]): void {
    for (let i = 0; i < contentBlocks.length; i++) {
      this.contentBlocks.push(this.createContentBlock(contentBlocks[i]));
    }
    this.contentBlocksService.setContentBlocks(this.contentBlocks);
  }
  */

  protected onSaveError(): void {
    this.error = true;
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.nivelJerarquico.error' })
    );
  }

  createContentBlock(selectedTemplate: ITipoBloqueComponentes): IBloqueComponentes {
    const componentes = new Array<IComponente>();
    selectedTemplate.tiposComponentes = this.orderTextImage(selectedTemplate.tiposComponentes!);
    for (let i = 0; i < selectedTemplate.tiposComponentes.length; i++) {
      componentes.push(this.createComponent(selectedTemplate.tiposComponentes[i]));
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

  createComponent(componentBlockType: TipoBloqueComponentes): IComponente {
    return {
      ...new Componente(),
      id: undefined,
      contenido: '',
      tipoComponente: componentBlockType,
      version: 1
    };
  }

  determineNewBlockOrder(): number {
    return this.contentBlocks.length + 1;
  }

  deleteContentBlock(index: number): void {
    if (index > -1) {
      this.contentBlocks.splice(index, 1);
      this.contentBlocksService.setContentBlocks(this.contentBlocks);
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
    this.subscription = this.eventEmitterService.getInvokeSave().subscribe(() => {
      this.save();
    });
  }

  selectBlock(index: number): void {
    this.selectedBlock = index;
  }

  addNewBlock(): void {
    this.navigationControlsService.setOpenTemplateGallery(true);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
