import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { AgrupadorService } from 'app/entities/agrupador/agrupador.service';
import { RutaAprendizajeService } from 'app/entities/rutas-aprendizaje/ruta-aprendizaje.service';
import { IAgrupador } from 'app/shared/model/agrupador.model';
import { HierarchicalLevel, NivelRutas } from 'app/shared/model/interface/hierarchical-level.model';
import { IRutaModel } from 'app/shared/model/ruta-aprendizaje.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { DynamicFlatNode, HierarchicalTreeService } from '../hierarchical-tree.service';
import { NivelJerarquicoService } from '../nivel-jerarquico.service';

@Component({
  selector: 'jhi-tree-hierarchical-level',
  templateUrl: './tree-hierarchical-level.component.html',
  styleUrls: ['./tree-hierarchical-level.component.scss']
})
export class TreeHierarchicalLevelComponent implements OnInit {
  subscription?: Subscription;
  private ngUnsubscribeSubject = new Subject();

  // data learning path
  idPath!: number;
  sequenceList: IAgrupador[] = new Array<IAgrupador>();
  originalSequenceList: IAgrupador[] = new Array<IAgrupador>();

  // form and formcontrol to filter groups/sequences
  learningPathForm!: FormGroup;
  filteredGroups: any;

  // tree
  treeControl!: FlatTreeControl<DynamicFlatNode>;
  dataSource!: HierarchicalTreeService; // DynamicDataSource;

  constructor(
    private accountService: AccountService,
    private formbuilder: FormBuilder,
    private aroute: ActivatedRoute,
    private nivelJerarquicoService: NivelJerarquicoService,
    private agrupadorService: AgrupadorService,
    private rutaService: RutaAprendizajeService,
    private eventManager: JhiEventManager
  ) {
    this.aroute.params.subscribe(val => {
      this.idPath = val.id;

      this.initForm();
    });

    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new HierarchicalTreeService(this.treeControl, this.nivelJerarquicoService);

    // this.dataSource.data = database.initialData();
  }

  ngOnInit(): void {
    if (this.idPath) {
      this.loadSequencesUma();

      this.getLearningPathDataAndGenerateTree().then(data => {
        this.dataSource.data = data;
        // console.error('Estructura generada: ');
        // console.error(data);
      });

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

  // session
  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  getLevel = (node: DynamicFlatNode) => {
    return node.level;
  };

  isExpandable = (node: DynamicFlatNode) => {
    return node.expandable;
  };

  hasChild = (_: number, _nodeData: DynamicFlatNode) => {
    return _nodeData.expandable;
  };

  hasNoContent = (_: number, _nodeData: DynamicFlatNode) => {
    return _nodeData.nombre === '';
  };

  private async getLearningPathDataAndGenerateTree(): Promise<DynamicFlatNode[]> {
    const pathData = await this.rutaService.find(this.idPath).toPromise();

    return this.generateTree(pathData.body as IRutaModel);
    // console.error('Terminó getLearningPathDataAndGenerateTree');
  }

  private generateTree(pathData: IRutaModel): DynamicFlatNode[] {
    // console.error('generateTree()');

    if (pathData) {
      // console.error(pathData.nivelRutas);

      // return pathData.nivelRutas!.map((n: NivelRutas) => {
      //   return new DynamicFlatNode(n.nivelJerarquico!.id!, n.nivelJerarquico!.nombre!, 0, true);
      // });

      return pathData.niveles!.map((n: NivelRutas) => {
        return new DynamicFlatNode(n.id!, n.nombre!, 0, true);
        // return {id: n.id, nombre: n.nombre, level:0, expandable:true};
      });
    }

    return new Array<DynamicFlatNode>();
  }

  // TREE

  addRootLevel(node: DynamicFlatNode): void {
    this.dataSource.insertRootItem(this.idPath, node, '');
    this.treeControl.expand(node);
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: DynamicFlatNode): void {
    this.dataSource.insertItem(node, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: DynamicFlatNode, itemValue: string): void {
    this.dataSource.updateItem(node, itemValue);
    // console.error('termino guardado de nodo');
  }

  removeItem(node: DynamicFlatNode): void {
    console.error('Eliminará el nodo: ', node);
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', {
        message: 'constructorApp.path.tree.remove',
        type: 'danger'
      })
    );
  }

  // learning path data and sequences

  initForm(): void {
    this.learningPathForm = this.formbuilder.group({
      searchGroup: new FormControl('', [Validators.maxLength(30)])
    });
  }

  private loadSequencesUma(): void {
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

  private filterGroups(value: string): IAgrupador[] {
    const filterValue = value.toLowerCase();
    return this.originalSequenceList.filter((option: IAgrupador) => option.titulo!.toLowerCase().includes(filterValue));
  }

  private checkListGroups(umas: IAgrupador[]): IAgrupador[] {
    if (this.learningPathForm.get('searchGroup')!.value !== '' && umas.length > 0) {
      return umas;
    } else if (this.learningPathForm.get('searchGroup')!.value === '') {
      return this.originalSequenceList;
    } else {
      return [];
    }
  }

  protected onQueryError(): void {
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', {
        message: 'constructorApp.path.validations.error',
        type: 'danger'
      })
    );
  }

  // drag and drop

  displayFn(group: IAgrupador): string {
    return group && group.descripcion ? group.descripcion : '';
  }

  dropOrder(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
    } else {
      this.addGroupAsLessonToTree(event.previousIndex, event.currentIndex);
    }
  }

  addGroupAsLessonToTree(previousIndex: number, currentIndex: number): void {
    // console.error('addGroupAsLessonToTree()');
    // const actualLevelDropped = this.treeControl.getLevel(this.treeControl.dataNodes[currentIndex - 1]);
    const padre = this.treeControl.dataNodes[currentIndex - 1]; //  .node;

    this.treeControl.expand(padre);

    // console.error('actualLevelDropped: ', actualLevelDropped);
    // console.error('padre: ', padre);

    const newGroup: HierarchicalLevel[] = [];
    newGroup.push({ id: this.sequenceList[previousIndex].id, orden: 0 });

    const newLesson: HierarchicalLevel = {
      id: padre.idDb,
      nombre: padre.nombre,
      imagenUrl: '',
      agrupadores: newGroup // nodeGroups
    };

    // console.error('Request PUT: ', newLesson);
    // this.subscribeResponseAddLesson(this.nivelJerarquicoService.updateNode(newLesson));
    this.dataSource.insertGroup(padre, newLesson);
  }

  // no se utiliza porque ya se hace en el servicio del tree, pero debería hacer algo para poder enviar las alertas por acción en el tree
  protected subscribeResponseAddLesson(result: Observable<HttpResponse<HierarchicalLevel>>): void {
    result.subscribe(
      () => {
        // console.error('Response PUT agrupador: ', res);
        // this.nivelJerarquicoService.dataChange.next(this.hierarchicalLevels);

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
}