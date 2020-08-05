import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CurrentCourseService } from 'app/services/current-course.service';
import { CurrentModuleService } from 'app/services/current-module.service';
import { ICurso } from 'app/shared/model/curso.model';
import { IModulo } from 'app/shared/model/modulo.model';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HierarchicalLevel } from 'app/shared/model/enumerations/hierarchical-level.model';
import { FlatNode } from 'app/shared/model/enumerations/flat-node.model';
import { NivelJerarquicoService } from 'app/entities/nivel-jerarquico/nivel-jerarquico.service';
import { INivel } from 'app/shared/model/nivel.model';

@Component({
  selector: 'jhi-constructor-hierarchical-structure',
  templateUrl: './constructor-hierarchical-structure.component.html',
  styleUrls: ['./constructor-hierarchical-structure.component.scss']
})
export class ConstructorHierarchicalStructureComponent implements OnInit {
  objectType = '';
  _transformer: any;
  treeControl: any;
  treeFlattener: any;
  dataSource: any;

  receivedObject: any = {
    id: 0,
    titulo: ''
  };
  // INICIA TREE

  TREE_DATA: HierarchicalLevel[] = [
    {
      name: 'Nivel 1',
      children: [{ name: 'Session/Curso 1' }, { name: 'Session/Curso 2' }, { name: 'Session/Curso 3' }]
    },
    {
      name: 'Nivel 2',
      children: [
        {
          name: 'Session/Curso 1',
          children: [{ name: 'Leccion/Bloque 1' }, { name: 'Leccion/Bloque 2' }]
        },
        {
          name: 'Session/Curso 2',
          children: [{ name: 'Leccion/Bloque 1' }, { name: 'Leccion/Bloque 2' }]
        }
      ]
    },
    {
      name: 'Nivel 3',
      children: [{ name: 'Session/Curso 1' }, { name: 'Session/Curso 2' }, { name: 'Session/Curso 3' }]
    }
  ];
  // TERMINA TREE

  constructor(
    private route: ActivatedRoute,
    private currentCourseService: CurrentCourseService,
    private currentModuleService: CurrentModuleService,
    private nivelJerarquicoService: NivelJerarquicoService
  ) {
    if (this.currentCourseService.getType() !== '') {
      this.objectType = this.currentCourseService.getType();
    } else {
      this.objectType = this.route.snapshot.paramMap.get('type')!.toString();
    }

    if (this.objectType === 'course') {
      this.currentCourseService.getCurrentCourse().subscribe((actualCourse: ICurso) => {
        this.receivedObject = this.getType<ICurso>(actualCourse);
      });
    } else if (this.objectType === 'module') {
      this.currentModuleService.getCurrentModule().subscribe((actualModule: IModulo) => {
        this.receivedObject = this.getType<IModulo>(actualModule);
      });
    }

    // INICIA TREE
    this._transformer = (node: HierarchicalLevel, level: number): any => {
      const expandable: boolean = !!node.children && node.children.length > 0;
      const name = node.name;
      return { expandable, name, level };
    };
    this.treeControl = new FlatTreeControl<FlatNode>(
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

    this.nivelJerarquicoService.query(this.receivedObject.id).subscribe(niveles => {
      // this.dataSource.data = niveles;
    });
    this.dataSource.data = this.TREE_DATA;
  }

  ngOnInit(): void {}

  // PARA TREE
  hasChild = (_: number, node: FlatNode) => node.expandable;

  getType<T>(obj: T): T {
    return obj;
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
  }

  alert(str: string): void {
    alert(str);
  }
}
