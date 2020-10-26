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
import { FlatNode, FlatNodeModel } from 'app/shared/model/interface/flat-node.model';
import { HierarchicalLevel, HierarchicalLevelModel, NivelRutas, SubNivelRutas } from 'app/shared/model/interface/hierarchical-level.model';
import { IModulo } from 'app/shared/model/modulo.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAgrupador } from 'app/shared/model/agrupador.model';
import { RutaAprendizajeService } from '../rutas-aprendizaje/ruta-aprendizaje.service';
import { IRutaModel } from 'app/shared/model/ruta-aprendizaje.model';
import { LearningPathHierarchicalAddLevelComponent } from './dialog-add-level/learning-path-hierarchical-add-level.component';
import { MatDialog } from '@angular/material/dialog';

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

  nameNewLevel!: string;

  objectType = '';
  _transformer: any;
  treeControl: any;
  treeFlattener: any;
  dataSource: any;

  expandedNodes = new Array<HierarchicalLevel>();
  flatNodeMap = new Map<FlatNode, HierarchicalLevel>();
  nestedNodeMap = new Map<HierarchicalLevel, FlatNode>();

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
    public dialog: MatDialog,
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
      const existingNode = this.nestedNodeMap.get(node);

      const flatNode = existingNode && existingNode.nombre === node.nombre ? existingNode : new FlatNodeModel();
      flatNode.nombre = node.nombre;
      flatNode.level = level;
      flatNode.expandable = !!node.nivelJerarquico && node.nivelJerarquico.length > 0;
      flatNode.node = node;
      // console.error('FlatNode Transformer: ');
      // console.error(flatNode);
      // const expandable: boolean = !!node.estructuraJerarquica && node.estructuraJerarquica.length > 0;
      // const expandable: boolean = !!node.nivelJerarquico && node.nivelJerarquico.length > 0;
      // const nombre = node.nombre;
      // const objNode = { expandable, nombre, level, node };
      this.flatNodeMap.set(flatNode, node); // objNode, node);
      this.nestedNodeMap.set(node, flatNode); // objNode);

      // return { expandable, nombre, level, node };
      return flatNode; // objNode;
    };
    this.treeControl = new FlatTreeControl<FlatNode>(
      node => node.level!,
      node => node.expandable!
    );
    this.treeFlattener = new MatTreeFlattener(
      this._transformer,
      (node: any) => node.level,
      (node: any) => node.expandable,
      (node: any) => node.nivelJerarquico
    );
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.nivelJerarquicoService.dataChange.subscribe(data => {
      this.dataSource.data = data;
      this.restoreExpandedNodes();
    });

    /*
    this.nivelJerarquicoService.query(this.receivedObject.id).subscribe(niveles => {
      // this.dataSource.data = niveles;
      console.error('##### Niveles: ', niveles);
    });
    */
    // this.dataSource.data = this.TREE_DATA;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  hasNoContent = (_: number, _nodeData: FlatNode) => {
    _nodeData.nombre === '';
  };

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
    // console.error(`Index previo: ${previousIndex} actual: ${currentIndex}`);
    console.error(currentIndex);
    // this.treeControl.dataNodes

    this.hierarchicalLevels.push({
      ...new HierarchicalLevelModel(),
      id: undefined,
      nombre: this.sequenceList[previousIndex].titulo,
      // agrupadores: [],
      imagenUrl: undefined,
      nivelJerarquico: []
      // estructuraJerarquica: []
    });
    this.nivelJerarquicoService.dataChange.next(this.hierarchicalLevels);
  }

  addLevel(node: HierarchicalLevel): void {
    // console.error('Intentando agregar nuevo nivel: ', node);
    this.saveExpandedNodes();

    this.openDialog(node);
    // this.addNewLevelToTree(node);
  }

  addNewLevelToTree(node: HierarchicalLevel): void {
    const parentNode = this.flatNodeMap.get(node);
    // this.insertItem(parentNode!, 'Nuevo elemento');
    this.treeControl.expand(node);
    // this.saveExpandedNodes();
    this.nivelJerarquicoService.insertItem(parentNode as HierarchicalLevel, this.nameNewLevel); //  '');
    // this.treeControl.expand(node);
    // this.restoreExpandedNodes();
    this.treeControl.expand(node);
  }

  insertItem(parent: HierarchicalLevel, name: string): void {
    if (parent.nivelJerarquico) {
      parent.nivelJerarquico.push({ item: name } as HierarchicalLevel);
      this.dataSource.data = this.hierarchicalLevels;
    }
  }

  saveExpandedNodes(): void {
    this.expandedNodes = new Array<HierarchicalLevel>();
    this.treeControl.dataNodes.forEach((node: any) => {
      if (node.expandable && this.treeControl.isExpanded(node)) {
        this.expandedNodes.push(node);
      }
    });
  }
  openDialog(node: HierarchicalLevel): void {
    const dialogRef = this.dialog.open(LearningPathHierarchicalAddLevelComponent, {
      width: '350px',
      data: { newLevelName: this.nameNewLevel }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.error('The dialog was closed');
      if (result) {
        this.nameNewLevel = result;
        this.addNewLevelToTree(node);
      }
    });
  }

  restoreExpandedNodes(): void {
    this.expandedNodes.forEach(node => {
      this.treeControl.expand(this.treeControl.dataNodes.find((n: any) => n.id === node.id));
    });
  }

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
        // console.error('#####  Response Ruta nivelRutas: ');
        // console.error(JSON.stringify(this.learningPathObj.nivelRutas));
        this.hierarchicalLevels = [...this.mapDataToHierarchicalLevels(this.learningPathObj.nivelRutas as NivelRutas[])]; //  HierarchicalLevelModel[]);
        // this.dataSource.data = this.hierarchicalLevels; //  this.TREE_DATA;
        this.nivelJerarquicoService.dataChange.next(this.hierarchicalLevels);
      });
  }

  private initialTree(defaultLevel: HierarchicalLevel): HierarchicalLevel[] {
    const initHierarchicalLevelsList = new Array<HierarchicalLevel>();
    initHierarchicalLevelsList.push(defaultLevel);
    return initHierarchicalLevelsList;
  }

  // private mapDataToHierarchicalLevels(responseNivelesBack: HierarchicalLevelModel[]): HierarchicalLevelModel[] {
  private mapDataToHierarchicalLevels(responseNivelesBack: NivelRutas[]): HierarchicalLevelModel[] {
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
      } else {
        // agrupadores
        branchTree.push({
          ...new HierarchicalLevelModel(),
          id: ej.id,
          nombre: ej.titulo,
          // agrupadores: sj.agrupadores,
          // agrupadores: this.generateStructureTree(sj.agrupadores!),
          imagenUrl: '',
          nivelJerarquico: []
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
    // console.error('#####  Node level Click: ');
    // console.error(node);

    const selectedLevel: HierarchicalLevel = node.node;

    if (selectedLevel.id) {
      this.nivelJerarquicoService
        .find(selectedLevel.id)
        .pipe(takeUntil(this.ngUnsubscribeSubject))
        .subscribe(res => {
          const childrens = res.body as SubNivelRutas[];
          // console.error('Childrens response: ');
          // console.error(childrens);
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

          // console.error('Busqueda bx: ', bx);
          // console.error('Padre: ', father);
          const idx = father ? this.hierarchicalLevels.indexOf(father) : this.hierarchicalLevels.findIndex(lvl => lvl.id === bx!.id);
          // console.error('#####  idx: ', idx);
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
                son.subNivelJerarquico!.nivelJerarquico ? son.subNivelJerarquico!.nivelJerarquico : son.subNivelJerarquico!.agrupadores!
              ) //  agrupadores!),
              // estructuraJerarquica: this.generateStructureTree(sj.estructuraJerarquica!)
            });
          }
          // console.error('#####  Nivel Afectado original: ', this.hierarchicalLevels[idx]);
          // console.error('#####  Nuevos Hijos mapeados: ');
          // console.error(newChildrens);
          // this.hierarchicalLevels.splice(idx, 1, ...newChildrens);
          // console.error('levels antes de setear nuevos');
          // console.error(JSON.stringify(this.hierarchicalLevels));

          if (father) {
            this.hierarchicalLevels[idx].nivelJerarquico = [...newChildrens];
          } else {
            const idxSon = this.hierarchicalLevels[idx].nivelJerarquico!.findIndex(lvl => lvl.id === childrens[0].nivel);
            this.hierarchicalLevels[idx].nivelJerarquico![idxSon].nivelJerarquico = [...newChildrens];
          }
          // console.error('#####  Nivel afectado nuevo: ', this.hierarchicalLevels[idx]);

          // console.error('#####  Response Children: ', childrens);

          // console.error('#####  Response Children: ');
          // console.error('#####  lista niveles final: ');
          // console.error(JSON.stringify(this.hierarchicalLevels));
          this.treeControl.expand(node);
          this.saveExpandedNodes();
          // this.dataSource.data = this.hierarchicalLevels;
          this.nivelJerarquicoService.dataChange.next(this.hierarchicalLevels);
          this.treeControl.expand(node);
          this.treeControl.expand(this.hierarchicalLevels[idx]);
          this.saveExpandedNodes();
          this.restoreExpandedNodes();
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
