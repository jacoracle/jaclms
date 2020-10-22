import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { AgrupadorService } from 'app/entities/agrupador/agrupador.service';
import { NivelJerarquicoService } from 'app/entities/nivel-jerarquico/nivel-jerarquico.service';
import { CurrentModuleService } from 'app/services/current-module.service';
import { FlatNode } from 'app/shared/model/interface/flat-node.model';
import { HierarchicalLevel, HierarchicalLevelModel, NivelRutas, SubNivelRutas } from 'app/shared/model/interface/hierarchical-level.model';
import { IModulo } from 'app/shared/model/modulo.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAgrupador } from 'app/shared/model/agrupador.model';
import { RutaAprendizajeService } from '../rutas-aprendizaje/ruta-aprendizaje.service';
import { IRutaModel } from 'app/shared/model/ruta-aprendizaje.model';

@Component({
  selector: 'jhi-learning-path-hierarchical-level',
  templateUrl: './learning-path-hierarchical-level.component.html',
  styleUrls: ['./learning-path-hierarchical-level.component.scss']
})
export class LearningPathHierarchicalLevelComponent implements OnInit {
  private idPath = -1;
  learningPathObj!: IRutaModel;
  hierarchicalLevels: HierarchicalLevel[] = new Array<HierarchicalLevel>();
  sequenceList: IAgrupador[] = new Array<IAgrupador>();

  subscription?: Subscription;
  private ngUnsubscribeSubject = new Subject();

  // tree

  objectType = '';
  _transformer: any;
  treeControl: any;
  treeFlattener: any;
  dataSource: any;

  receivedObject: any = {
    id: 0,
    titulo: ''
  };

  TREE_DATA: HierarchicalLevel[] = [
    {
      nombre: 'Nivel 1',
      nivelJerarquico: [
        {
          nombre: 'Session/Curso 1',
          nivelJerarquico: [
            {
              nombre: 'Nivel 2, Bloque 1',
              nivelJerarquico: [{ nombre: 'Leccion 1' }, { nombre: 'Leccion 2' }]
            },
            { nombre: 'Nivel 2, Bloque 2', nivelJerarquico: [{ nombre: 'Leccion 3' }, { nombre: 'Leccion 4' }] }
          ]
        },
        { nombre: 'Session/Curso 2', nivelJerarquico: [{ nombre: 'Leccion 1' }] },
        { nombre: 'Session/Curso 3' }
      ]
    },
    {
      nombre: 'Nivel 2',
      // estructuraJerarquica: [
      nivelJerarquico: [
        {
          nombre: 'Session/Curso 1',
          nivelJerarquico: [{ nombre: 'Leccion/Bloque 1' }, { nombre: 'Leccion/Bloque 2' }]
        },
        {
          nombre: 'Session/Curso 2',
          nivelJerarquico: [{ nombre: 'Leccion/Bloque 1' }, { nombre: 'Leccion/Bloque 2' }]
        }
      ]
    },
    {
      nombre: 'Nivel 3',
      // estructuraJerarquica: [{ nombre: 'Session/Curso 1' }, { nombre: 'Session/Curso 2' }, { nombre: 'Session/Curso 3' }]
      nivelJerarquico: [{ nombre: 'Hijo 1 (niv 3)' }, { nombre: 'Hijo 2 (niv 3)', nivelJerarquico: [{ nombre: 'Nieto 1 (lvl 3 sbn 2)' }] }]
    },
    {
      nombre: 'Nivel 4',
      // estructuraJerarquica: [{ nombre: 'Session/Curso 1' }, { nombre: 'Session/Curso 2' }, { nombre: 'Session/Curso 3' }]
      nivelJerarquico: []
    }
  ];

  // TERMINA TREE

  constructor(
    private aroute: ActivatedRoute,
    private accountService: AccountService,
    private rutaService: RutaAprendizajeService,
    private agrupadorService: AgrupadorService,
    private currentModuleService: CurrentModuleService,
    private nivelJerarquicoService: NivelJerarquicoService,
    private eventManager: JhiEventManager
  ) {
    aroute.params.subscribe(val => {
      this.idPath = val.id; // console.error('Recibido: ', val.id);
    });

    this.objectType = 'module';

    if (this.objectType === 'module') {
      this.currentModuleService.getCurrentModule().subscribe((actualModule: IModulo) => {
        this.receivedObject = this.getType<IModulo>(actualModule);
      });
    }

    // TREE CON AJUSTE

    // FINAL TREE AJUSTE

    // INICIA TREE

    this._transformer = (node: HierarchicalLevel, level: number): any => {
      // const expandable: boolean = !!node.estructuraJerarquica && node.estructuraJerarquica.length > 0;
      const expandable: boolean = !!node.nivelJerarquico && node.nivelJerarquico.length > 0;
      const nombre = node.nombre;
      return { expandable, nombre, level, node };
    };
    this.treeControl = new FlatTreeControl<FlatNode>(
      node => node.level,
      node => node.expandable
    );
    this.treeFlattener = new MatTreeFlattener(
      this._transformer,
      (node: any) => node.level,
      (node: any) => node.expandable,
      (node: any) => node.nivelJerarquico
    );
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    /*
    this.nivelJerarquicoService.query(this.receivedObject.id).subscribe(niveles => {
      // this.dataSource.data = niveles;
      console.error('##### Niveles: ', niveles);
    });
    */
    // this.dataSource.data = this.TREE_DATA;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngOnInit(): void {
    if (this.idPath) {
      this.loadSequencesUma();
      this.getLearningPathData();
    } else {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', {
          message: 'constructorApp.path.validations.session',
          type: 'danger'
        })
      );
    }
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  getType<T>(obj: T): T {
    return obj;
  }

  dropOrder(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
    } else {
      this.addLevelTree(event.previousIndex, event.currentIndex);
    }
  }

  addLevelTree(previousIndex: number, currentIndex: number): void {
    console.error(`Index previo: ${previousIndex} actual: ${currentIndex}`);

    this.hierarchicalLevels.push({
      ...new HierarchicalLevelModel(),
      id: undefined,
      nombre: 'Nuevo',
      // agrupadores: [],
      imagenUrl: undefined,
      nivelJerarquico: []
      // estructuraJerarquica: []
    });
  }

  addHightLevel(): void {}

  loadSequencesUma(): void {
    this.subscription = this.agrupadorService
      .query()
      .pipe(takeUntil(this.ngUnsubscribeSubject))
      .subscribe(
        (res: HttpResponse<IAgrupador[]>) => {
          this.sequenceList = [...Array.from(res.body!)];
        },
        () => this.onQueryError()
      );
  }

  getLearningPathData(): void {
    this.subscription = this.rutaService
      .find(this.idPath)
      .pipe(takeUntil(this.ngUnsubscribeSubject))
      .subscribe(response => {
        this.learningPathObj = response.body as IRutaModel;
        // this.dataSource.data = this.learningPathObj.nivelRutas;
        console.error('#####  Response Ruta nivelRutas: ');
        console.error(JSON.stringify(this.learningPathObj.nivelRutas));
        this.hierarchicalLevels = this.mapDataToHierarchicalLevels(this.learningPathObj.nivelRutas as NivelRutas[]); //  HierarchicalLevelModel[]);
        this.dataSource.data = this.hierarchicalLevels; //  this.TREE_DATA;
      });
  }

  private initialTree(defaultLevel: HierarchicalLevel): HierarchicalLevel[] {
    const initHierarchicalLevelsList = new Array<HierarchicalLevel>();
    initHierarchicalLevelsList.push(defaultLevel);
    return initHierarchicalLevelsList;
  }

  // private mapDataToHierarchicalLevels(responseNivelesBack: HierarchicalLevelModel[]): HierarchicalLevelModel[] {
  private mapDataToHierarchicalLevels(responseNivelesBack: NivelRutas[]): HierarchicalLevelModel[] {
    /*
    responseBack.push({
      id: 3,
      nivelJerarquico: {
        id: 2,
        nombre: 'Nivel 2',
        imagenUrl: '',
        agrupadores: [],
        estructuraJerarquica: []
        
      },
      orden: 0
    });
    */

    const treeOrigin: HierarchicalLevelModel[] = [];
    // let nivelJ: HierarchicalLevel;

    for (const level of responseNivelesBack) {
      // nivelJ = level.nivelJerarquico!;
      level.nivelJerarquico;
      // if (nivelJ) {
      if (level.nivelJerarquico) {
        // for (const o of l.nivelJerarquico) {

        treeOrigin.push({
          ...new HierarchicalLevelModel(),
          // id: level.id,
          id: level.nivelJerarquico.id,
          // nombre: nivelJ.nombre,
          nombre: level.nivelJerarquico.nombre,
          // agrupadores: nivelJ.agrupadores,
          nivelJerarquico: level.nivelJerarquico.nivelJerarquico,
          imagenUrl: level.nivelJerarquico.imagenUrl
          // estructuraJerarquica: this.initialTree(nivelJ.estructuraJerarquica)// this.generateStructureTree(nivelJ.estructuraJerarquica!)
        });

        // }
      }

      /*
      treeOrigin.push({
        ...new HierarchicalLevelModel(),
        id: l.nivelJerarquico.id,
        nombre: l.nivelJerarquico.nombre,
        agrupadores: l.nivelJerarquico.agrupadores,
        imagenUrl: l.nivelJerarquico.imagenUrl,
        estructuraJerarquica: l.nivelJerarquico.estructuraJerarquica
      });
      */
    }

    return treeOrigin; // new Array<HierarchicalFlatNode>();
  }

  private generateStructureTree(estructuraJerarquica: any[]): HierarchicalLevelModel[] {
    const branchTree: HierarchicalLevelModel[] = [];

    for (const ej of estructuraJerarquica) {
      const sj = ej.subNivelJerarquico;

      if (sj) {
        branchTree.push({
          ...new HierarchicalLevelModel(),
          id: sj.id,
          nombre: sj.nombre,
          // agrupadores: sj.agrupadores,
          // agrupadores: this.generateStructureTree(sj.agrupadores!),
          imagenUrl: sj.imagenUrl,
          nivelJerarquico: this.generateStructureTree(sj.nivelJerarquico!)
          // estructuraJerarquica: this.generateStructureTree(sj.estructuraJerarquica!)
        });
      }
    }

    return branchTree;
  }

  protected onQueryError(): void {
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', {
        message: 'constructorApp.path.validations.error',
        type: 'danger'
      })
    );
  }

  loadChildren(node: any): void {
    console.error('#####  Node level Click: ');
    console.error(node);

    const selectedLevel: HierarchicalLevel = node.node;

    if (selectedLevel.id) {
      this.nivelJerarquicoService
        .find(selectedLevel.id)
        .pipe(takeUntil(this.ngUnsubscribeSubject))
        .subscribe(res => {
          const childrens = res.body as SubNivelRutas[];

          console.error('Childrens response: ');
          console.error(childrens);

          // console.error('nivel seleccionado: ', selectedLevel);

          const father =
            this.hierarchicalLevels.find(lvl => {
              return lvl.id === selectedLevel.id;
            }) || null;

          // const ax = this.getObject(this.hierarchicalLevels, selectedLevel.id!);
          // console.error('Busqueda: ', ax);

          const bx = this.hierarchicalLevels.find((lvl: HierarchicalLevel) => {
            if (lvl.nivelJerarquico) {
              return lvl.nivelJerarquico.some((sbl: HierarchicalLevel) => {
                return sbl.id === selectedLevel.id;
              });
            } else {
              return false;
            }
          });

          console.error('Busqueda bx: ', bx);

          console.error('Padre: ', father);
          const idx = father ? this.hierarchicalLevels.indexOf(father) : this.hierarchicalLevels.findIndex(lvl => lvl.id === bx!.id);
          console.error('#####  idx: ', idx);

          const newChildrens = new Array<HierarchicalLevel>();

          for (const son of childrens) {
            newChildrens.push({
              ...new HierarchicalLevelModel(),
              id: son.subNivelJerarquico!.id,
              nombre: son.subNivelJerarquico!.nombre,
              // agrupadores: sj.agrupadores,
              // agrupadores: this.generateStructureTree(sj.agrupadores!),
              imagenUrl: son.subNivelJerarquico!.imagenUrl,
              nivelJerarquico: this.generateStructureTree(
                son.subNivelJerarquico!.nivelJerarquico ? son.subNivelJerarquico!.nivelJerarquico : []
              ) //  agrupadores!),
              // estructuraJerarquica: this.generateStructureTree(sj.estructuraJerarquica!)
            });
          }

          console.error('#####  Nivel Afectado original: ', this.hierarchicalLevels[idx]);

          console.error('#####  Nuevos Hijos mapeados: ');
          console.error(newChildrens);

          // this.hierarchicalLevels.splice(idx, 1, ...newChildrens);

          console.error('levels antes de setear nuevos');
          console.error(JSON.stringify(this.hierarchicalLevels));

          if (father) {
            this.hierarchicalLevels[idx].nivelJerarquico = [...newChildrens];
          } else {
            const idxSon = this.hierarchicalLevels[idx].nivelJerarquico!.findIndex(lvl => lvl.id === childrens[0].nivel);
            this.hierarchicalLevels[idx].nivelJerarquico![idxSon].nivelJerarquico = [...newChildrens];
          }
          console.error('#####  Nivel afectado nuevo: ', this.hierarchicalLevels[idx]);

          // console.error('#####  Response Children: ', childrens);

          // console.error('#####  Response Children: ');
          console.error('#####  lista niveles final: ');
          console.error(JSON.stringify(this.hierarchicalLevels));

          this.dataSource.data = this.hierarchicalLevels;
        });
    }
  }

  getObject(
    theObject: HierarchicalLevelModel[] | HierarchicalLevelModel,
    findValue: number
  ): HierarchicalLevelModel[] | HierarchicalLevelModel {
    let result: HierarchicalLevelModel[] | HierarchicalLevelModel = {};
    if (theObject instanceof Array) {
      for (let i = 0; i < theObject.length; i++) {
        result = this.getObject(theObject[i], findValue);
      }
    } else {
      // for (const prop in theObject) {
      for (const [key, value] of Object.entries(theObject)) {
        // console.log(prop + ': ' + theObject[prop]);
        // if (prop === 'id') {
        if (key === 'id') {
          if (value === findValue) {
            return theObject;
          }
        }
        if (value instanceof Object || value instanceof Array) result = this.getObject(value, findValue);
      }
    }
    return result;
  }

  functionOne(): void {
    alert('Deberá hacer algo con este botón');
  }
}
