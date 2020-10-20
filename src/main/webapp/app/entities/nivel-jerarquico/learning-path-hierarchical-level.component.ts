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
import { HierarchicalLevel, HierarchicalLevelModel } from 'app/shared/model/interface/hierarchical-level.model';
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
      estructuraJerarquica: [{ nombre: 'Session/Curso 1' }, { nombre: 'Session/Curso 2' }, { nombre: 'Session/Curso 3' }]
    },
    {
      nombre: 'Nivel 2',
      estructuraJerarquica: [
        {
          nombre: 'Session/Curso 1',
          estructuraJerarquica: [{ nombre: 'Leccion/Bloque 1' }, { nombre: 'Leccion/Bloque 2' }]
        },
        {
          nombre: 'Session/Curso 2',
          estructuraJerarquica: [{ nombre: 'Leccion/Bloque 1' }, { nombre: 'Leccion/Bloque 2' }]
        }
      ]
    },
    {
      nombre: 'Nivel 3',
      estructuraJerarquica: [{ nombre: 'Session/Curso 1' }, { nombre: 'Session/Curso 2' }, { nombre: 'Session/Curso 3' }]
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
      const expandable: boolean = !!node.estructuraJerarquica && node.estructuraJerarquica.length > 0;
      const nombre = node.nombre;
      return { expandable, nombre, level };
    };
    this.treeControl = new FlatTreeControl<FlatNode>(
      node => node.level,
      node => node.expandable
    );
    this.treeFlattener = new MatTreeFlattener(
      this._transformer,
      (node: any) => node.level,
      (node: any) => node.expandable,
      (node: any) => node.estructuraJerarquica
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
    moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
  }

  alert(str: string): void {
    alert(str);
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
        this.hierarchicalLevels = this.mapDataToHierarchicalLevels(this.learningPathObj.nivelRutas);
        this.dataSource.data = this.hierarchicalLevels;
      });
  }

  private mapDataToHierarchicalLevels(responseBack: any): HierarchicalLevelModel[] {
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

    const treeOrigin: HierarchicalLevelModel[] = [];

    for (const o of responseBack) {
      treeOrigin.push({
        ...new HierarchicalLevelModel(),
        id: o.nivelJerarquico.id,
        nombre: o.nivelJerarquico.nombre,
        agrupadores: o.nivelJerarquico.agrupadores,
        imagenUrl: o.nivelJerarquico.imagenUrl,
        estructuraJerarquica: o.nivelJerarquico.estructuraJerarquica
      });
    }

    return treeOrigin; // new Array<HierarchicalFlatNode>();
  }

  protected onQueryError(): void {
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', {
        message: 'constructorApp.path.validations.error',
        type: 'danger'
      })
    );
  }

  functionOne(): void {
    alert('Deberá hacer algo con este botón');
  }
}
