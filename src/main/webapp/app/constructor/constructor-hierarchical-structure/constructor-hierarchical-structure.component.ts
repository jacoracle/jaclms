import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { INivelJerarquico } from 'app/shared/model/nivel-jerarquico.model';
import { TipoNivelJerarquico } from 'app/shared/model/enumerations/tipo-nivel-jerarquico.model';
import { CurrentCourseService } from 'app/services/current-course.service';
import { CurrentModuleService } from 'app/services/current-module.service';
import { ICurso } from 'app/shared/model/curso.model';
import { IModulo } from 'app/shared/model/modulo.model';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'jhi-constructor-hierarchical-structure',
  templateUrl: './constructor-hierarchical-structure.component.html',
  styleUrls: ['./constructor-hierarchical-structure.component.scss']
})
export class ConstructorHierarchicalStructureComponent implements OnInit {
  objectType = '';
  receivedObject: any = {
    titulo: ''
  };
  // INICIA TREE

  TREE_DATA: HierarchicalLevelNode[] = [
    {
      name: 'Nivel 1',
      children: [{ name: 'Título 1' }, { name: 'Título 2' }, { name: 'Título 3' }]
    },
    {
      name: 'Nivel 2',
      children: [
        {
          name: 'Hijo 1',
          children: [{ name: 'Nieto 1' }, { name: 'Nieto 2' }]
        },
        {
          name: 'Hijo 2',
          children: [{ name: 'Nieto 1' }, { name: 'Nieto 2' }]
        }
      ]
    },
    {
      name: 'Nivel 3',
      children: [{ name: 'Título 1' }, { name: 'Título 2' }, { name: 'Título 3' }]
    }
  ];

  LEVEL_HIERARCHICAL: INivelJerarquico[] = [
    {
      nivelId: 1,
      nombre: 'Nivel 1',
      tipo: TipoNivelJerarquico.N,
      informacionAdicional: 0,
      bloquesCurso: [], //  IBloquesCurso[];
      cursoId: 1,
      orden: 1
    },
    {
      nivelId: 2,
      nombre: 'Nivel 2',
      tipo: TipoNivelJerarquico.N,
      informacionAdicional: 0,
      bloquesCurso: [], //  IBloquesCurso[];
      cursoId: 1,
      orden: 2
    },
    {
      nivelId: 3,
      nombre: 'Nivel 3',
      tipo: TipoNivelJerarquico.N,
      informacionAdicional: 0,
      bloquesCurso: [], //  IBloquesCurso[];
      cursoId: 1,
      orden: 3
    },
    {
      nivelId: 4,
      nombre: 'Nivel 4',
      tipo: TipoNivelJerarquico.N,
      informacionAdicional: 0,
      bloquesCurso: [], //  IBloquesCurso[];
      cursoId: 1,
      orden: 4
    }
  ];

  _transformer: any;
  treeControl: any;
  treeFlattener: any;
  dataSource: any;

  // TERMINA TREE

  constructor(
    private route: ActivatedRoute,
    private currentCourseService: CurrentCourseService,
    private currentModuleService: CurrentModuleService
  ) {
    this.objectType =
      this.currentCourseService.getType() !== ''
        ? this.currentCourseService.getType()
        : this.currentModuleService.getType() !== ''
        ? this.currentModuleService.getType()
        : this.route.snapshot.paramMap.get('type')!.toString();

    if (this.objectType === 'course') {
      this.currentCourseService.getCurrentCourse().subscribe((actualCourse: ICurso) => {
        this.receivedObject = this.getType<ICurso>(actualCourse);
        // console.error('#####    receiveObject course');
        // console.error(this.receivedObject);
      });
    } else if (this.objectType === 'module') {
      this.currentModuleService.getCurrentModule().subscribe((actualModule: IModulo) => {
        this.receivedObject = this.getType<IModulo>(actualModule);
        // console.error('#####    receiveObject module');
        // console.error(this.receivedObject);
      });
    }

    // INICIA TREE
    this._transformer = (node: HierarchicalLevelNode, level: number): any => {
      const expandable: boolean = !!node.children && node.children.length > 0;
      const name = node.name;
      return { expandable, name, level };
    };
    this.treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level,
      node => node.expandable
    );
    this.treeFlattener = new MatTreeFlattener(
      this._transformer,
      (node: any) => node.level,
      (node: any) => node.expandable,
      (node: any) => node.children
    );
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = this.TREE_DATA;
    // TERMINA TREE
  }

  ngOnInit(): void {}

  // PARA TREE
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getType<T>(obj: T): T {
    return obj;
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.TREE_DATA, event.previousIndex, event.currentIndex);
  }
}

// TEMPORALES PARA PRUEBAS CON TREE

interface HierarchicalLevelNode {
  name: string;
  children?: HierarchicalLevelNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
