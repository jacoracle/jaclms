import { Injectable } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HierarchicalLevel, HierarchicalStructure, HierarchicalStructureGroup } from 'app/shared/model/interface/hierarchical-level.model';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { NivelJerarquicoService } from './nivel-jerarquico.service';
import { RutaAprendizajeService } from '../rutas-aprendizaje/ruta-aprendizaje.service';
import { HierarchicalLevelModel } from '../../shared/model/interface/hierarchical-level.model';

// #####################################################################      MODEL CLASS TREE

/** Flat node with expandable and level information */
export class DynamicFlatNode {
  // constructor(public nombre: string, public level: number = 1, public expandable: boolean = false, public isLoading: boolean = false) { }
  constructor(
    public idDb: number,
    public nombre: string,
    public level: number = 1,
    public expandable: boolean = false,
    public isLoading: boolean = false
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HierarchicalTreeService {
  dataChange: BehaviorSubject<DynamicFlatNode[]> = new BehaviorSubject<DynamicFlatNode[]>([]);
  // wtf$ = this.dataChange.asObservable();

  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }
  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private treeControl: FlatTreeControl<DynamicFlatNode>,
    private nivelJerarquicoService?: NivelJerarquicoService,
    private rutaService?: RutaAprendizajeService
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this.treeControl.expansionModel.changed.subscribe((change: any) => {
      if ((change as SelectionChange<DynamicFlatNode>).added || (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>): void {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true)); // this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.reverse().forEach(node => this.toggleNode(node, false)); // this.toggleNode(node, false));
    }
  }

  /**
   * execute request to load childrens
   * @param idDb id database record from selected node
   */
  private async getChildrenPath(idDb: number): Promise<HierarchicalStructure | undefined> {
    // console.error('getChildrenPath()');
    const childrensResponse = await this.nivelJerarquicoService!.find(idDb).toPromise();

    // console.error('Termina getchildrenPath()');
    return childrensResponse.body as HierarchicalStructure;
  }

  /**
   * execute request to load childrens and refresh tree with new nodes
   * @param node selected node from tree
   * @param expand if the node is expanded
   */
  toggleNode(node: DynamicFlatNode, expand: boolean): void {
    // console.error('Nodo seleccioado: ');
    // console.error(node);

    // console.error('toggleNodeCool() por ejecutar getChildrenPath()');
    // let childrenCool;
    this.getChildrenPath(node.idDb).then((res: any) => {
      // console.error(res);
      // console.error('found childrens');

      const levels = res.niveles.map((child: HierarchicalStructure) => {
        return { id: child.id, nombre: child.nombre };
      });

      const groups = res.agrupadores.map((child: HierarchicalStructure) => {
        return { id: child.id, nombre: child.nombre };
      });

      const index = this.data.indexOf(node);
      if ((!levels && !groups) || index < 0) {
        // If no children, or cannot find the node, no op
        return;
      }

      if (expand) {
        node.isLoading = true;

        // let contador = 1;

        setTimeout(() => {
          let nodes = new Array<DynamicFlatNode>();
          // const nodes = levels.map((c: any) => new DynamicFlatNode(c.id, c.nombre, node.level + 1, true));
          nodes = [
            ...levels.map((c: any) => new DynamicFlatNode(c.id, c.nombre, node.level + 1, true)),
            ...groups.map((c: any) => new DynamicFlatNode(c.id, c.nombre, node.level + 1, true))
          ];

          this.data.splice(index + 1, 0, ...nodes);
          // notify the change
          this.dataChange.next(this.data);
          node.isLoading = false;
        }, 1000);
      } else {
        this.data.splice(index + 1, this.getLengthCollapseTree(levels, groups)); //  levels.length); //  children.length); //  cuando ya se guarde el nodo quitar el ternario: , hijos.length === 0 ? 1 : hijos.length
        this.dataChange.next(this.data);
      }
    }); // close then
  }

  private getLengthCollapseTree(levels: HierarchicalStructure[], groups: HierarchicalStructure[]): number {
    if (levels.length === 0 && groups.length > 0) {
      return groups.length;
    } else if (groups.length === 0 && levels.length > 0) {
      return levels.length;
    } else if (levels.length > 0 && groups.length > 0) {
      return levels.length + groups.length;
    } else {
      return 0;
    }
  }

  insertRootItem(idPath: number, parent: DynamicFlatNode, name: string): void {
    parent.isLoading = true;
    // if (index >= 0) {
    const nodes = new Array<DynamicFlatNode>();
    nodes.push(new DynamicFlatNode(idPath, name, 0, false));
    // const index = this.data.indexOf(parent);
    const totalRootNodes = this.data.length;
    this.data.splice(totalRootNodes, 0, ...nodes);
    this.dataChange.next(this.data);
    // }
    parent.isLoading = false;
  }

  insertItem(parent: DynamicFlatNode, name: string): void {
    parent.isLoading = true;
    // if (index >= 0) {
    const nodes = new Array<DynamicFlatNode>();
    nodes.push(new DynamicFlatNode(parent.idDb, name, parent.level + 1, false));
    const index = this.data.indexOf(parent);
    this.data.splice(index + 1, 0, ...nodes);
    this.dataChange.next(this.data);
    // }
    parent.isLoading = false;
  }

  updateItem(node: DynamicFlatNode, name: string): void {
    const nodes = new Array<DynamicFlatNode>();
    const index = this.data.indexOf(node);

    if (node.level > 0) {
      this.addNewChildrenToTree(name, this.data[index].idDb).then((n: any) => {
        if (n) {
          nodes.push(new DynamicFlatNode(n.id, n.nombre, node.level, true));
          this.data.splice(index, 1, ...nodes); //  replace node with new elements
          this.dataChange.next(this.data);
        }
      });
    } else {
      this.addNewLevelToTree(name, node.idDb).then((n: any) => {
        if (n) {
          nodes.push(new DynamicFlatNode(n.id, n.nombre, node.level, true));
          this.data.splice(index, 1, ...nodes);
          this.dataChange.next(this.data);
        }
      });
    }
  }

  /**
   * Execute request to save a new root node
   * @param name new node name
   */
  private async addNewLevelToTree(name: string, idPath: number): Promise<HierarchicalLevel | undefined> {
    const newLevel: HierarchicalLevel = {
      nombre: name,
      imagenUrl: '',
      agrupadores: [],
      nivelRuta: [
        {
          id: idPath,
          orden: this.data.filter(n => n.level === 0).length - 1
        }
      ]
    };

    return (await this.nivelJerarquicoService!.createLevel(newLevel).toPromise()).body as HierarchicalLevel;
    // return new Promise((resolve, reject) => {
    //   resolve(new HierarchicalLevelModel(99, name, undefined, undefined, undefined, undefined,undefined, undefined, 0, 0));
    // });
  }

  private async addNewChildrenToTree(name: string, parentId: number): Promise<HierarchicalLevel | undefined> {
    const children: HierarchicalLevel = {
      nombre: name,
      imagenUrl: '',
      agrupadores: [],
      estructuraJerarquica: [
        {
          id: parentId,
          ordenNivel: 0
        }
      ],
      nivelRuta: []
    };

    return (await this.nivelJerarquicoService!.createLevel(children).toPromise()).body as HierarchicalLevel;
  }

  insertGroup(parent: DynamicFlatNode, req: HierarchicalLevel): void {
    parent.isLoading = true;
    const nodes = new Array<DynamicFlatNode>();

    this.executePutRequest(req).then((res: any) => {
      if (res.agrupadores) {
        res.agrupadores.forEach((ag: any) => {
          nodes.push(new DynamicFlatNode(ag.id, ag.nombre, parent.level + 1, true));
        });

        const index = this.data.indexOf(parent);
        this.data.splice(index + 1, 0, ...nodes);
        this.dataChange.next(this.data);
        parent.isLoading = false;
      }
    });
  }

  private async executePutRequest(request: HierarchicalLevelModel): Promise<HierarchicalStructureGroup> {
    return (await this.nivelJerarquicoService!.updateNode(request).toPromise()).body as HierarchicalStructureGroup;
  }

  editTreeNode(node: DynamicFlatNode, newName: string): void {
    //
    const editRequest: HierarchicalLevel = {
      id: node.idDb,
      nombre: newName,
      imagenUrl: '',
      agrupadores: []
    };

    this.executePutRequest(editRequest).then((res: HierarchicalStructureGroup) => {
      console.error('Finish edit response: ', res);

      const index = this.data.indexOf(node);
      const editNode: DynamicFlatNode = this.data[index];
      editNode.nombre = newName;
      // console.error('response insert group: ', res);
      this.data.splice(index, 1, editNode);
      this.dataChange.next(this.data);
      node.isLoading = false;
    });
  }
}
