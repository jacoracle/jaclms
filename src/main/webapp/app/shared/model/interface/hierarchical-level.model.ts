import { HierarchicalFlatNode } from './hierarchical-flat-node.model';
export interface HierarchicalLevel {
  name?: string;
  children?: HierarchicalLevel[];

  id?: number;
  nombre?: string;
  agrupadores?: any[];
  imagenUrl?: string;
  // estructuraJerarquica?: HierarchicalLevel[];
  estructuraJerarquica?: [{ id: number; ordenNivel: number }];
  nivelJerarquico?: HierarchicalLevel[];
  subNivelJerarquico?: HierarchicalLevel[];
  nivelRuta?: HierarchicalLevel[]; // necesaria para no generar otro modelo y reutilizar este, esta prop solo se ocupa en los post/put
  orden?: number; // orden de los niveles en el arbol, lo ocupa la prop nivelRuta, mismo caso, reutilizar para evitar otro modelo
  level?: number; // prop para identificar que nivel tiene el nodo en el tree
}

export class HierarchicalLevelModel implements HierarchicalLevel {
  constructor(
    public id?: number,
    public nombre?: string,
    public agrupadores?: any[],
    public imagenUrl?: string,
    // public estructuraJerarquica?: HierarchicalLevel[],
    public estructuraJerarquica?: [{ id: number; ordenNivel: number }],
    public nivelJerarquico?: HierarchicalLevel[],
    public subnivelJerarquico?: HierarchicalLevel[],
    public nivelRuta?: HierarchicalLevel[],
    public orden?: number,
    public level?: number
  ) {}
}

// con ajuste back

export interface NivelRutas {
  id?: number;
  nivelJerarquico?: HierarchicalLevel;
  orden?: number;
}

export class NivelRutasModel implements NivelRutas {
  constructor(public id?: number, public nivelJerarquico?: HierarchicalFlatNode) {}
}

export interface SubNivelRutas {
  id?: number;
  nivel?: number;
  subNivelJerarquico?: HierarchicalLevel;
  agrupadores?: HierarchicalLevel[];
  ordenNivel?: number;
}

export class SubNivelRutasModel implements SubNivelRutas {
  constructor(
    public id?: number,
    public nivel?: number,
    public subNivelJerarquico?: HierarchicalLevel,
    public agrupadores?: HierarchicalLevel[],
    public ordenNivel?: number
  ) {}
}
