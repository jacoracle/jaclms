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
import { Observable, Subject, Subscription } from 'rxjs';
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

  newLevelName!: string;

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
      this.addGroupAsLessonToTree(event.previousIndex, event.currentIndex);
    }
  }

  containsDeep = (text: string) => (value?: any): any => {
    if (!value) {
      return false;
    }

    const valueType = typeof value;
    if (valueType === 'string') {
      return value.toLowerCase().indexOf(text.toLowerCase()) > -1;
    }
    if (Array.isArray(value)) {
      return value.some(this.containsDeep(text));
    }
    if (valueType === 'object') {
      return Object.values(value).some(this.containsDeep(text));
    }
    return false;

    // tslint:disable-next-line
  };

  findNode(obj: any, targetId: number): any {
    if (obj.id === targetId) {
      return obj;
    }
    if (obj.nivelJerarquico) {
      for (const item of obj.nivelJerarquico) {
        const check = this.findNode(item, targetId);
        if (check) {
          return check;
        }
      }
    }
    return null;
  }

  getGroupsNode(list: HierarchicalLevel[], nodeId: number): void {
    let groups: { id: number }[];
    list.find((n: HierarchicalLevel): any => {
      if (n.id === nodeId) {
        groups.push({ id: n.id });
      } else {
        // s
      }
    });
  }

  addGroupAsLessonToTree(previousIndex: number, currentIndex: number): void {
    // console.error(`Index previo: ${previousIndex} actual: ${currentIndex}`);
    // this.treeControl.dataNodes
    const padre: HierarchicalLevel = this.treeControl.dataNodes[currentIndex - 1].node;
    // console.error('Padre del agrupador que se agregará: ', padre);
    // db

    const dataNodes = [...this.treeControl.dataNodes];

    // const nodeGroups = dataNodes.filter((node: HierarchicalLevel) => {
    //   return node.level === currentIndex - 1
    // }).map((fnode: FlatNode) => { return { id: fnode.node.id } });

    const nodeGroups = dataNodes
      .filter(node => {
        return node.level === currentIndex - 1;
      })
      .map(fnode => {
        return fnode.node.nivelJerarquico;
      })
      .map(a => {
        let obj: { id?: number } = {};
        a.forEach((e: HierarchicalLevel) => {
          obj = { id: e.id! };
        });
        return obj;
      });

    console.error(nodeGroups);

    const fullBaseNode = this.hierarchicalLevels.find((lvl: HierarchicalLevel): any => {
      if (lvl.id === padre.id) {
        return lvl;
      } else if (lvl.nivelJerarquico) {
        return lvl.nivelJerarquico.some((sbl): any => {
          if (sbl.id === padre.id) {
            return sbl;
          } else if (sbl.nivelJerarquico) {
            return sbl.nivelJerarquico.some((l): any => {
              return l.id === padre.id;
            });
          }
        });
      } else {
        return false;
      }
    });

    console.error(fullBaseNode);
    nodeGroups.push({ id: this.sequenceList[previousIndex].id });

    const baseNode = this.findNode(padre, padre.id!);
    console.error(baseNode);

    const nieto = this.treeControl.dataNodes[currentIndex - 1].node;
    console.error(nieto);

    const newLesson: HierarchicalLevel = {
      id: baseNode.id,
      nombre: padre.nombre,
      imagenUrl: '',
      agrupadores: nodeGroups /* [
        {
          id: this.sequenceList[previousIndex].id
        }
      ]*/
    };

    console.error('Request PUT: ', newLesson);
    this.subscribeResponseAddLesson(this.nivelJerarquicoService.updateNode(newLesson));
    this.nivelJerarquicoService.dataChange.next(this.hierarchicalLevels);
  }

  protected subscribeResponseAddLesson(result: Observable<HttpResponse<HierarchicalLevel>>): void {
    result.subscribe(
      res => {
        if (res.body) {
          console.error('Response New Level', res.body);
          // this.hierarchicalLevels.push({ id: res.body.id, nombre: res.body.nombre, imagenUrl: res.body.imagenUrl } as HierarchicalLevel);
          // this.nivelJerarquicoService.dataChange.next(this.hierarchicalLevels);
        }
      },
      err => console.error(err)
    );
  }

  addLevel(): void {
    // node: HierarchicalLevel): void {
    // console.error('Intentando agregar nuevo nivel: ', node);
    // this.saveExpandedNodes();

    this.openDialog(); //  node);
    // this.addNewLevelToTree(node);
  }

  addSubLevel(node: HierarchicalLevel): void {
    // console.error('Intentando agregar Sub nivel a un Padre: ', node);
    this.saveExpandedNodes();
    this.openDialog(node);
  }

  addNewLevelToTree(): void {
    const newLevel: HierarchicalLevel = {
      nombre: this.newLevelName,
      imagenUrl: '',
      nivelRuta: [
        {
          id: this.idPath,
          orden: this.hierarchicalLevels.length + 1
        }
      ]
    };

    this.subscribeResponseAddLevel(this.nivelJerarquicoService.createLevel(newLevel));
    console.error(newLevel);
  }

  protected subscribeResponseAddLevel(result: Observable<HttpResponse<HierarchicalLevel>>): void {
    result.subscribe(
      res => {
        if (res.body) {
          console.error('Response New Level', res.body);
          this.hierarchicalLevels.push({ id: res.body.id, nombre: res.body.nombre, imagenUrl: res.body.imagenUrl } as HierarchicalLevel);
          this.nivelJerarquicoService.dataChange.next(this.hierarchicalLevels);
        }
      },
      err => console.error(err)
    );
  }
  /**
   * agregar un subnivel a un nodo padre
   * @param node padre al que se le agregará un hijo
   */
  addNewSubLevelToTree(node: HierarchicalLevel): void {
    const parentNode = this.flatNodeMap.get(node);

    if (parentNode && node.level! < 2) {
      parentNode.level = node.level;
      // this.treeControl.expand(node);
      // save in db
      const padre = this.hierarchicalLevels.find(l => l.id === parentNode.id) || null;

      // if (padre) {
      // const idx = this.hierarchicalLevels.indexOf(padre);//  revisar esto porque debería agregar una prop a HierarchicalLevel
      // console.error('Index Padre: ', idx);

      // agregando hijo a nivel 1 orden 0
      const newSubLevel: HierarchicalLevel = {
        nombre: this.newLevelName,
        imagenUrl: padre ? padre.imagenUrl : '', // revisar esto para ver su origen
        agrupadores: [],
        estructuraJerarquica: [
          {
            id: padre ? padre.id! : parentNode.id!,
            ordenNivel: this.getOrderNewNode(padre ? padre : parentNode)
          }
        ],
        nivelRuta: []
      };

      this.subscribeResponseAddSubLevel(this.nivelJerarquicoService.createSubLevel(newSubLevel), parentNode);
      console.error(newSubLevel);
      // }
    }
  }

  getOrderNewNode(baseNose: HierarchicalLevel): number {
    // easy to read
    if (baseNose.nivelJerarquico) {
      return baseNose.nivelJerarquico.length;
    } else {
      return 0;
    }
  }

  // una forma de buscar el nodo que se afectara al agregar un hijo
  findItemNested = (arr: HierarchicalLevel[], nodeId: number, nodeNestingKey: string): any =>
    arr.reduce((a, nodo) => {
      if (a) {
        return a;
      }
      if (nodo.id === nodeId) {
        return nodo;
      }
      if (nodo[nodeNestingKey]) {
        return this.findItemNested(nodo[nodeNestingKey], nodeId, nodeNestingKey);
      }
    }, null);

  findById(arr: any, id: number, nestingKey?: string): any {
    // if empty array then return
    if (arr.length === 0) return;

    // return element if found else collect all children(or other nestedKey) array and run this function
    return (
      arr.find((d: any) => d.id === id) ||
      this.findById(
        arr.flatMap((d: any) => d[nestingKey!] || []),
        id
      ) ||
      'Not found'
    );
  }

  protected subscribeResponseAddSubLevel(result: Observable<HttpResponse<HierarchicalLevel>>, parentNode: HierarchicalLevel): void {
    result.subscribe(
      res => {
        if (res.body) {
          // console.error('Response New SubLevel', res.body);
          // console.error('Parent edit: ', parentNode);

          /*
          const nodeEdit = this.hierarchicalLevels.find((lvl: HierarchicalLevel): any => {
            if (lvl.id === parentNode.id) {
              return lvl;
            } else if (lvl.nivelJerarquico) {
              return lvl.nivelJerarquico.some((sbl: HierarchicalLevel): any => {
                return sbl.id === parentNode.id;
              });
            } else {
              return false;
            }
          });
          */

          const nodeEdit = this.findById(this.hierarchicalLevels, parentNode.id!, 'nivelJerarquico');

          console.error('Node edit: ', nodeEdit);
          const index = this.hierarchicalLevels.indexOf(nodeEdit as HierarchicalLevel);
          console.error('index del padre: ', index);
          console.error('elemento de lista por afectar: ', this.hierarchicalLevels[index]);

          if (this.hierarchicalLevels[index]) {
            this.hierarchicalLevels[index].nivelJerarquico!.push({
              id: res.body.id,
              nombre: res.body.nombre,
              imagenUrl: res.body.imagenUrl
            } as HierarchicalLevel);
          } else {
            nodeEdit.nivelJerarquico!.push({
              id: res.body.id,
              nombre: res.body.nombre,
              imagenUrl: res.body.imagenUrl
            } as HierarchicalLevel);
          }

          console.error('elemento de lista afectado: ', this.hierarchicalLevels[index]);
          // this.hierarchicalLevels.push();
          this.nivelJerarquicoService.dataChange.next(this.hierarchicalLevels);
          this.loadChildren(parentNode);
          this.restoreExpandedNodes();
        }
      },
      err => console.error(err)
    );
  }

  openDialog(node?: HierarchicalLevel): void {
    this.newLevelName = '';
    const dialogRef = this.dialog.open(LearningPathHierarchicalAddLevelComponent, {
      width: '280px',
      data: { newLevelName: this.newLevelName }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.error('The dialog was closed');
      if (result) {
        this.newLevelName = result;
        if (node) {
          this.addNewSubLevelToTree(node);
        } else {
          this.addNewLevelToTree();
        }
      }
    });
  }

  saveExpandedNodes(): void {
    this.expandedNodes = new Array<HierarchicalLevel>();
    this.treeControl.dataNodes.forEach((node: any) => {
      if (node.expandable && this.treeControl.isExpanded(node)) {
        this.expandedNodes.push(node);
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

  /**
   * Mapea y trasforma la respuesta del back para generar la estructura del tree
   * @param responseNivelesBack respuesta que viene del back con los niveles de mas alto nivel
   */
  // private mapDataToHierarchicalLevels(responseNivelesBack: HierarchicalLevelModel[]): HierarchicalLevelModel[] {
  private mapDataToHierarchicalLevels(responseNivelesBack: NivelRutas[]): HierarchicalLevelModel[] {
    const treeOrigin: HierarchicalLevelModel[] = [];
    // let nivelJ: HierarchicalLevel;

    for (const level of responseNivelesBack) {
      // nivelJ = level.nivelJerarquico!;
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
          nivelJerarquico: [], // level.nivelJerarquico.nivelJerarquico,
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

    const selectedLevel: HierarchicalLevel = node.node ? node.node : node; //  just node cause not comes from html

    if (selectedLevel.id && node.level < 2) {
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

          /*
          const bx = this.hierarchicalLevels.find((lvl: HierarchicalLevel) => {
            if (lvl.nivelJerarquico) {
              return lvl.nivelJerarquico.some((sbl: HierarchicalLevel) => {
                return sbl.id === selectedLevel.id;
              });
            } else {
              return false;
            }
          });
          */

          const bx = this.hierarchicalLevels.find((lvl: HierarchicalLevel): any => {
            if (lvl.id === selectedLevel.id) {
              return lvl;
            } else if (lvl.nivelJerarquico) {
              return lvl.nivelJerarquico.some((sbl: HierarchicalLevel): any => {
                // return sbl.id === selectedLevel.id;
                if (sbl.id === selectedLevel.id) {
                  return sbl;
                } else if (sbl.nivelJerarquico) {
                  return sbl.nivelJerarquico.some((n: HierarchicalLevel): any => {
                    return n.id === selectedLevel.id;
                  });
                }
                // return null
              });
            } else {
              return null;
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
          } else if (childrens.length) {
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

  allowAdd(level: number): boolean {
    return level < 2;
  }

  functionOne(): void {
    alert('Deberá hacer algo con este botón');
  }
}
