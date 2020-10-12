import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { NivelJerarquicoService } from 'app/entities/nivel-jerarquico/nivel-jerarquico.service';
import { CurrentModuleService } from 'app/services/current-module.service';
import { FlatNode } from 'app/shared/model/interface/flat-node.model';
import { HierarchicalLevel } from 'app/shared/model/interface/hierarchical-level.model';
import { IModulo } from 'app/shared/model/modulo.model';
import { IAgrupador } from '../../../shared/model/agrupador.model';

@Component({
  selector: 'jhi-rutas-aprendizaje-jerarquia',
  templateUrl: './rutas-aprendizaje-jerarquia.component.html',
  styleUrls: ['./rutas-aprendizaje-jerarquia.component.scss']
})
export class RutasAprendizajeJerarquiaComponent implements OnInit {
  idRuta = 0;
  sequenceList: IAgrupador[] = new Array<IAgrupador>();

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
    private accountService: AccountService,
    private currentModuleService: CurrentModuleService,
    private nivelJerarquicoService: NivelJerarquicoService
  ) {
    this.objectType = 'module';

    if (this.objectType === 'module') {
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
      console.error('##### Niveles: ', niveles);
    });
    this.dataSource.data = this.TREE_DATA;
  }

  ngOnInit(): void {
    this.loadSequencesUma();
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

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

  loadSequencesUma(): void {
    this.sequenceList.push({
      id: 1,
      titulo: 'Agrupaor 1',
      descripcion: 'You think water moves fast? You should see ice.',
      duracion: 0,
      modulos: []
    });
    this.sequenceList.push({ id: 2, titulo: 'Agrupaor 2', descripcion: 'It moves like it has a mind.', duracion: 0, modulos: [] });
    this.sequenceList.push({
      id: 3,
      titulo: 'Agrupaor 3',
      descripcion: 'Like it knows it killed the world once and got a taste for murder.',
      duracion: 0,
      modulos: []
    });
    this.sequenceList.push({
      id: 4,
      titulo: 'Agrupaor 4',
      descripcion: "Now we took an oath, that I'm breaking now.",
      duracion: 0,
      modulos: []
    });
    this.sequenceList.push({
      id: 5,
      titulo: 'Agrupaor 5',
      descripcion: "We said we'd say it was the snow that killed the other two, but it wasn't.",
      duracion: 0,
      modulos: []
    });
    this.sequenceList.push({
      id: 6,
      titulo: 'Agrupaor 6',
      descripcion: 'This gun is advertised as the most popular gun in American crime.',
      duracion: 0,
      modulos: []
    });
    this.sequenceList.push({
      id: 7,
      titulo: 'Agrupaor 7',
      descripcion: "Like they're actually proud of that shit.",
      duracion: 0,
      modulos: []
    });
    this.sequenceList.push({ id: 8, titulo: 'Agrupaor 8', descripcion: 'She gonna tell me too.', duracion: 0, modulos: [] });
  }

  functionOne(): void {
    alert('Deberá hacer algo con este botón');
  }
}
