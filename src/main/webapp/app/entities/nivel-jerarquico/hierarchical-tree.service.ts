import { Injectable } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SubNivelRutas } from 'app/shared/model/interface/hierarchical-level.model';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { NivelJerarquicoService } from './nivel-jerarquico.service';
import { RutaAprendizajeService } from '../rutas-aprendizaje/ruta-aprendizaje.service';

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
    private rutaService?: RutaAprendizajeService,
    private realData?: NivelJerarquicoService
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
  private async getChildrenPath(idDb: number): Promise<SubNivelRutas | undefined> {
    console.error('getChildrenPath()');
    const childrensResponse = await this.nivelJerarquicoService!.find(idDb).toPromise();

    console.error('Termina getchildrenPath()');
    return childrensResponse.body as SubNivelRutas;
  }

  /**
   * execute request to load childrens and refresh tree with new nodes
   * @param node selected node from tree
   * @param expand if the node is expanded
   */
  toggleNode(node: DynamicFlatNode, expand: boolean): void {
    console.error('Nodo seleccioado: ');
    console.error(node);

    console.error('toggleNodeCool() por ejecutar getChildrenPath()');
    // let childrenCool;
    this.getChildrenPath(node.idDb).then((res: any) => {
      console.error(res);
      console.error('found childrens');

      const hijos = res.map((child: SubNivelRutas) => {
        return { id: child.subNivelJerarquico!.id, nombre: child.subNivelJerarquico!.nombre };
      });

      const index = this.data.indexOf(node);
      if (!hijos || index < 0) {
        // If no children, or cannot find the node, no op
        return;
      }

      if (expand) {
        node.isLoading = true;

        // let contador = 1;

        setTimeout(() => {
          //  const nodes = children.map(name =>
          //  new DynamicFlatNode(contador++, name, node.level + 1, true));//  this.database.isExpandable(name)));  //  verificar si se puede consultar esto desde un endpoint

          const nodes = hijos.map((c: any) => new DynamicFlatNode(c.id, c.nombre, node.level + 1, true));

          this.data.splice(index + 1, 0, ...nodes);
          // notify the change
          this.dataChange.next(this.data);
          node.isLoading = false;
        }, 1000);
      } else {
        this.data.splice(index + 1, hijos.length); //  children.length);
        this.dataChange.next(this.data);
      }
    }); // close then
  }

  insertItem(parent: DynamicFlatNode, name: string): void {
    // index: number, name: string): void {

    parent.isLoading = true;
    // if (index >= 0) {
    const nodes = new Array<DynamicFlatNode>();
    // nodes.push({ idDb: 0, nombre: name, level: parent.level + 1, expandable: true, isLoading: false } as DynamicFlatNode);
    nodes.push(new DynamicFlatNode(0, name, parent.level + 1, false));
    const index = this.data.indexOf(parent);
    this.data.splice(index + 1, 0, ...nodes);
    this.dataChange.next(this.data);
    // }
    parent.isLoading = false;
  }

  updateItem(node: DynamicFlatNode, name: string): void {
    const nodes = new Array<DynamicFlatNode>();
    const index = this.data.indexOf(node);
    // nodes.push({ idDb: node.idDb, nombre: name, level: node.level + 1, expandable: node.expandable, isLoading: false } as DynamicFlatNode);
    // node.nombre = name;
    // this.data.splice(index, 0, ...nodes);
    // this.data[index].nombre = name;
    nodes.push(new DynamicFlatNode(0, name, node.level + 1, false));
    this.data.splice(index, 1, ...nodes);
    this.dataChange.next(this.data);
  }
}
