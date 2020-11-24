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
    public orden: number = 0,
    public nodeType: string = 'n', //  n -> nodo a -> agroupador
    public nivelId: number = 0, //  padre
    public nivelAgrupadorId: number = 0, // para tabla intermedia
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

    // console.error('Termina getchildrenPath() ', childrensResponse.body);
    return childrensResponse.body as HierarchicalStructure;
  }

  /**
   * execute request to load childrens and refresh tree with new nodes
   * @param node selected node from tree
   * @param expand if the node is expanded
   */
  toggleNode(node: DynamicFlatNode, expand: boolean): void {
    if (node.level < 3) {
      this.getChildrenPath(node.idDb).then((res: any) => {
        const levels = res.niveles.map((child: HierarchicalStructure) => {
          return { id: child.id, nombre: child.nombre, orden: child.orden };
        });

        const groups = res.agrupadores.map((child: HierarchicalStructure) => {
          return {
            id: child.id,
            nombre: child.nombre,
            orden: child.orden,
            nivelId: child.nivelId,
            nivelAgrupadorId: child.nivelAgrupadorId
          };
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
              ...levels.map((c: any) => new DynamicFlatNode(c.id, c.nombre, node.level + 1, c.orden, 'n', 0, 0, true)),
              ...groups.map(
                (c: any) => new DynamicFlatNode(c.id, c.nombre, node.level + 1, c.orden, 'a', c.nivelId, c.nivelAgrupadorId, true)
              )
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
    const totalRootNodes = this.data.length;
    nodes.push(new DynamicFlatNode(idPath, name, 0, totalRootNodes, 'n', 0, 0, false)); //  check the nivelId and nivelAgrupadorId params
    // const index = this.data.indexOf(parent);
    this.data.splice(totalRootNodes, 0, ...nodes);
    this.dataChange.next(this.data);
    // }
    parent.isLoading = false;
  }

  insertItem(parent: DynamicFlatNode, name: string): void {
    parent.isLoading = true;
    // if (index >= 0) {
    const nodes = new Array<DynamicFlatNode>();
    const idx = this.data.indexOf(parent);
    const orderNewNode = this.treeControl.getDescendants(parent).length; // this.data.filter((n, index) => n.level === parent.level+1 && index + 1 === idx).length;// this.data.filter(n => n.level === parent.level + 1).length;
    nodes.push(new DynamicFlatNode(parent.idDb, name, parent.level + 1, orderNewNode, 'n', parent.idDb, 0, false)); //  check the nivelId and nivelAgrupadorId params and check this order zero cause it must be the order that user gives
    // this.data.splice(index + 1, 0, ...nodes);
    this.data.splice(idx + 1 + orderNewNode, 0, ...nodes);
    this.dataChange.next(this.data);
    // }
    parent.isLoading = false;
  }

  updateItem(node: DynamicFlatNode, name: string): void {
    const nodes = new Array<DynamicFlatNode>();
    const index = this.data.indexOf(node);

    if (node.level > 0) {
      this.addNewChildrenToTree(name, this.data[index].idDb, node).then((n: any) => {
        // console.error('addNewChildrenToTree() ', n);
        if (n) {
          nodes.push(new DynamicFlatNode(n.id, n.nombre, node.level, node.orden, 'n', node.nivelId, 0, true)); //  check the nivelId and nivelAgrupadorId params and check this order zero cause it must be the order that user gives
          this.data.splice(index, 1, ...nodes); //  replace node with new elements
          this.dataChange.next(this.data);
        }
      });
    } else {
      this.addNewLevelToTree(name, node.idDb).then((n: any) => {
        // console.error('addNewLevelToTree() ', n);
        if (n) {
          nodes.push(new DynamicFlatNode(n.id, n.nombre, node.level, node.orden, 'n', node.nivelId, 0, true)); //  check the nivelId and nivelAgrupadorId params and check this order zero cause it must be the order that user gives
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

  private async addNewChildrenToTree(name: string, parentId: number, node: DynamicFlatNode): Promise<HierarchicalLevel | undefined> {
    const children: HierarchicalLevel = {
      nombre: name,
      imagenUrl: '',
      agrupadores: [],
      estructuraJerarquica: [
        {
          id: parentId,
          ordenNivel: node.orden //  node.orden === 0 ? this.data.filter(n => n.level === node.level).length : node.orden
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
      // console.error('insertGroup() ', res);

      if (res.agrupadores) {
        res.agrupadores.forEach((ag: any) => {
          nodes.push(new DynamicFlatNode(ag.id, ag.nombre, parent.level + 1, ag.orden, 'a', ag.nivelId, ag.nivelAgrupadorId, false)); //  check this order zero cause it must be the order that user gives
        });
      }

      if (res.niveles) {
        res.niveles.forEach((ni: any) => {
          nodes.push(new DynamicFlatNode(ni.id, ni.nombre, parent.level + 1, ni.orden, 'n', 0, 0, true)); //  check this order zero cause it must be the order that user gives
        });
      }

      const index = this.data.indexOf(parent);

      this.data.splice(
        index + 1, // parent.level > 0 ? index + 2 : index + 1,//  index + 1, //  2,
        parent.level === 0 ? this.treeControl.getDescendants(parent).length : nodes.length > 1 ? nodes.length - 1 : 0, // nodes.length > 1 ? this.data.filter(n=>n.level+1 === parent.level+1).length-1 : 0, // 0,//  this.data.filter(n=>n.level+1 === parent.level+1).length-1,
        ...nodes.sort((a: DynamicFlatNode, b: DynamicFlatNode) => {
          if (a.orden > b.orden) {
            return 1;
          }
          if (a.orden < b.orden) {
            return -1;
          }
          return 0;
        })
      );
      this.dataChange.next(this.data);
      parent.isLoading = false;
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
      // eslint-disable-next-line no-console
      console.info('Finish edit response: ', res);
      const index = this.data.indexOf(node);
      const editNode: DynamicFlatNode = this.data[index];
      editNode.nombre = newName;
      // console.error('response insert group: ', res);
      this.data.splice(index, 1, editNode);
      this.dataChange.next(this.data);
      node.isLoading = false;
    });
  }

  deleteGroup(node: DynamicFlatNode): void {
    const index = this.data.indexOf(node);
    if (index >= 0) {
      this.executeDeleteGroupRequest(node.nivelAgrupadorId);
      this.data.splice(index, 1);
      this.dataChange.next(this.data);
      // node.isLoading = false;
    }
  }

  private executeDeleteGroupRequest(nivelAgrupadorId: number): void {
    this.nivelJerarquicoService!.deleteGroup(nivelAgrupadorId).subscribe();
  }
}
