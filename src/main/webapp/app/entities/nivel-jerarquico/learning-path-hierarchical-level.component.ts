import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { map, startWith, takeUntil } from 'rxjs/operators';
import { IAgrupador } from 'app/shared/model/agrupador.model';
import { RutaAprendizajeService } from '../rutas-aprendizaje/ruta-aprendizaje.service';
import { IRutaModel } from 'app/shared/model/ruta-aprendizaje.model';
import { LearningPathHierarchicalAddLevelComponent } from './dialog-add-level/learning-path-hierarchical-add-level.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-learning-path-hierarchical-level',
  templateUrl: './learning-path-hierarchical-level.component.html',
  styleUrls: ['./learning-path-hierarchical-level.component.scss']
})
export class LearningPathHierarchicalLevelComponent implements OnInit {
  // menu
  @ViewChild(MatMenuTrigger, { static: false })
  contextMenu!: MatMenuTrigger;

  // termina menu

  learningPathForm!: FormGroup;
  filteredGroups: any;

  private idPath = -1;
  learningPathObj!: IRutaModel;
  hierarchicalLevels: HierarchicalLevel[] = new Array<HierarchicalLevel>();
  sequenceList: IAgrupador[] = new Array<IAgrupador>();
  originalSequenceList: IAgrupador[] = new Array<IAgrupador>();

  subscription?: Subscription;
  private ngUnsubscribeSubject = new Subject();

  // tree

  // menu tree

  contextMenuPosition = { x: '0px', y: '0px' };

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
    private formbuilder: FormBuilder,
    private aroute: ActivatedRoute,
    private accountService: AccountService,
    private rutaService: RutaAprendizajeService,
    private agrupadorService: AgrupadorService,
    private currentModuleService: CurrentModuleService,
    private nivelJerarquicoService: NivelJerarquicoService,
    public dialog: MatDialog,
    private eventManager: JhiEventManager
  ) {
    this.initForm();

    aroute.params.subscribe(val => {
      this.idPath = val.id;
    });

    this.objectType = 'module';

    if (this.objectType === 'module') {
      this.currentModuleService.getCurrentModule().subscribe((actualModule: IModulo) => {
        this.receivedObject = this.getType<IModulo>(actualModule);
      });
    }

    // INICIA TREE

    this._transformer = (node: HierarchicalLevel, level: number): any => {
      const existingNode = this.nestedNodeMap.get(node);

      const flatNode = existingNode && existingNode.nombre === node.nombre ? existingNode : new FlatNodeModel();
      flatNode.nombre = node.nombre;
      flatNode.level = level;
      flatNode.expandable = !!node.nivelJerarquico && node.nivelJerarquico.length > 0;
      flatNode.node = node;
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

      this.filteredGroups = this.learningPathForm
        .get('searchGroup')!
        .valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.descripcion)),
          map(title => (title ? this.filterGroups(title) : this.sequenceList.slice()))
        )
        .subscribe((group: IAgrupador[]) => {
          this.sequenceList = [...this.checkListGroups(group)];
        });
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

  initForm(): void {
    this.learningPathForm = this.formbuilder.group({
      searchGroup: new FormControl('', [Validators.maxLength(30)])
    });
  }

  private filterGroups(value: string): IModulo[] {
    const filterValue = value.toLowerCase();
    return this.sequenceList.filter((option: IModulo) => option.titulo!.toLowerCase().includes(filterValue));
  }

  private checkListGroups(umas: IModulo[]): IModulo[] {
    if (this.learningPathForm.get('searchGroup')!.value !== '' && umas.length > 0) {
      return umas;
    } else if (this.learningPathForm.get('searchGroup')!.value === '') {
      return this.originalSequenceList;
    } else {
      return [];
    }
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
    const actualLevelDropped = this.treeControl.getLevel(this.treeControl.dataNodes[currentIndex - 1]);

    let padre!: any;

    // este funciona cuando agregas el agrupador justo debajo del nieto y encima de todos los agrupadores existentes, para agregar agrupador debajo de abuelos e hijos
    padre = this.treeControl.dataNodes[currentIndex - 1].node;

    if (actualLevelDropped > 2) {
      // este funciona cuando agregas agrupador debajo de otro agrupador en un nieto
      padre = this.treeControl.dataNodes.filter((x: FlatNode) => {
        return (
          (x.level === currentIndex && x.node.id === padre.id) ||
          x.node.nivelJerarquico.find((ab: HierarchicalLevel) => {
            return ab.id === padre.id;
          })
        );
      });
    } else {
      // padre = this.treeControl.dataNodes[currentIndex + 1].node;
      padre = this.treeControl.dataNodes[currentIndex - 1].node;
    }

    const newGroup: HierarchicalLevel[] = [];
    newGroup.push({ id: this.sequenceList[previousIndex].id });

    const newLesson: HierarchicalLevel = {
      id: Array.isArray(padre) ? padre[0].node.id : padre.id, //  baseNode.id,
      nombre: Array.isArray(padre) ? padre[0].node.nombre : padre.nombre,
      imagenUrl: '',
      agrupadores: newGroup // nodeGroups
    };

    // console.error('Request PUT: ', newLesson);
    this.subscribeResponseAddLesson(this.nivelJerarquicoService.updateNode(newLesson));
    this.nivelJerarquicoService.dataChange.next(this.hierarchicalLevels);
  }

  protected subscribeResponseAddLesson(result: Observable<HttpResponse<HierarchicalLevel>>): void {
    result.subscribe(
      // res => {
      () => {
        // if (res.body) {
        //   console.error('Response New Lesson Level', res.body);
        //   // this.hierarchicalLevels.push({ id: res.body.id, nombre: res.body.nombre, imagenUrl: res.body.imagenUrl } as HierarchicalLevel);
        this.nivelJerarquicoService.dataChange.next(this.hierarchicalLevels);
        // }

        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.validationError', {
            message: 'constructorApp.path.sequence.addGroup',
            type: 'success'
          })
        );
      },
      err => {
        console.error('Error al agregar agrupador como lección: ', err);
        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.validationError', {
            message: 'constructorApp.path.validations.error',
            type: 'danger'
          })
        );
      }
    );
  }

  addLevel(): void {
    // node: HierarchicalLevel): void {
    // this.saveExpandedNodes();
    this.openDialog(); //  node);
    // this.addNewLevelToTree(node);
  }

  addSubLevel(node: HierarchicalLevel): void {
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
  }

  protected subscribeResponseAddLevel(result: Observable<HttpResponse<HierarchicalLevel>>): void {
    result.subscribe(
      res => {
        if (res.body) {
          this.hierarchicalLevels.push({ id: res.body.id, nombre: res.body.nombre, imagenUrl: res.body.imagenUrl } as HierarchicalLevel);
          this.nivelJerarquicoService.dataChange.next(this.hierarchicalLevels);

          this.eventManager.broadcast(
            new JhiEventWithContent('constructorApp.validationError', {
              message: 'constructorApp.path.sequence.addLevel',
              type: 'success'
            })
          );
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
      const padre = this.hierarchicalLevels.find(l => l.id === parentNode.id) || null;

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
          const nodeEdit = this.findById(this.hierarchicalLevels, parentNode.id!, 'nivelJerarquico');
          const index = this.hierarchicalLevels.indexOf(nodeEdit as HierarchicalLevel);

          if (this.hierarchicalLevels[index]) {
            if (!this.hierarchicalLevels[index]) {
              this.hierarchicalLevels[index].nivelJerarquico = [];
            }
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
          this.nivelJerarquicoService.dataChange.next(this.hierarchicalLevels);
          this.loadChildren(parentNode);
          this.restoreExpandedNodes();

          this.eventManager.broadcast(
            new JhiEventWithContent('constructorApp.validationError', {
              message: 'constructorApp.path.sequence.addLevel',
              type: 'success'
            })
          );
        }
      },
      err => {
        console.error('Error al agregar subnivel al Tree: ', err);
        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.validationError', {
            message: 'constructorApp.path.validations.error',
            type: 'danger'
          })
        );
      }
    );
  }

  openDialog(node?: HierarchicalLevel): void {
    this.newLevelName = '';
    const dialogRef = this.dialog.open(LearningPathHierarchicalAddLevelComponent, {
      width: '280px',
      data: { newLevelName: this.newLevelName }
    });

    dialogRef.afterClosed().subscribe(result => {
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
          this.originalSequenceList = this.sequenceList;
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
        this.hierarchicalLevels = [...this.mapDataToHierarchicalLevels(this.learningPathObj.nivelRutas as NivelRutas[])]; //  HierarchicalLevelModel[]);
        // this.dataSource.data = this.hierarchicalLevels; //  this.TREE_DATA;
        this.nivelJerarquicoService.dataChange.next(this.hierarchicalLevels);
      });
  }

  /**
   * Mapea y trasforma la respuesta del back para generar la estructura del tree
   * @param responseNivelesBack respuesta que viene del back con los niveles de mas alto nivel
   */
  private mapDataToHierarchicalLevels(responseNivelesBack: NivelRutas[]): HierarchicalLevelModel[] {
    const treeOrigin: HierarchicalLevelModel[] = [];
    for (const level of responseNivelesBack) {
      if (level.nivelJerarquico) {
        treeOrigin.push({
          ...new HierarchicalLevelModel(),
          id: level.nivelJerarquico.id,
          nombre: level.nivelJerarquico.nombre,
          nivelJerarquico: [],
          imagenUrl: level.nivelJerarquico.imagenUrl
        });
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
          imagenUrl: sj.imagenUrl,
          nivelJerarquico: this.generateStructureTree(sj.nivelJerarquico!)
        });
      } else {
        // agrupadores
        branchTree.push({
          ...new HierarchicalLevelModel(),
          id: ej.id,
          nombre: ej.titulo,
          imagenUrl: '',
          nivelJerarquico: []
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
    const selectedLevel: HierarchicalLevel = node.node ? node.node : node; //  just node cause not comes from html

    if (selectedLevel.id && node.level < 2) {
      this.nivelJerarquicoService
        .find(selectedLevel.id)
        .pipe(takeUntil(this.ngUnsubscribeSubject))
        .subscribe(res => {
          const childrens = res.body as SubNivelRutas[];
          const father =
            this.hierarchicalLevels.find(lvl => {
              return lvl.id === selectedLevel.id;
            }) || null;

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
              });
            } else {
              return null;
            }
          });

          const idx = father ? this.hierarchicalLevels.indexOf(father) : this.hierarchicalLevels.findIndex(lvl => lvl.id === bx!.id);
          const newChildrens = new Array<HierarchicalLevel>();

          for (const son of childrens) {
            newChildrens.push({
              ...new HierarchicalLevelModel(),
              id: son.subNivelJerarquico!.id,
              nombre: son.subNivelJerarquico!.nombre,
              imagenUrl: son.subNivelJerarquico!.imagenUrl,
              nivelJerarquico: this.generateStructureTree(
                son.subNivelJerarquico!.nivelJerarquico ? son.subNivelJerarquico!.nivelJerarquico : son.subNivelJerarquico!.agrupadores!
              )
            });
          }

          if (father) {
            this.hierarchicalLevels[idx].nivelJerarquico = [...newChildrens];
          } else if (childrens.length) {
            const idxSon = this.hierarchicalLevels[idx].nivelJerarquico!.findIndex(lvl => lvl.id === childrens[0].nivel);
            this.hierarchicalLevels[idx].nivelJerarquico![idxSon].nivelJerarquico = [...newChildrens];
          }

          this.treeControl.expand(node);
          this.saveExpandedNodes();
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
      for (const [key, value] of Object.entries(theObject)) {
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

  isLesson(level: number): boolean {
    return level > 2;
  }

  onContextMenu(event: MouseEvent, item: HierarchicalLevel): void {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onContextMenuAction1(node: any): void {
    this.contextMenu.menuData = { node };
    alert(`Click on Action 1 for ${node.nombre}`);
  }

  onContextMenuAction2(item: HierarchicalLevel): void {
    alert(`Click on Action 2 for ${item.nombre}`);
  }

  onContextMenuAction3(item: HierarchicalLevel): void {
    alert(`Click on Action 3 for ${item.nombre}`);
  }

  functionOne(): void {
    alert('Deberá hacer algo con este botón');
  }
}
