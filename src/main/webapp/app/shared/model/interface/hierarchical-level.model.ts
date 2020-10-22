import { HierarchicalFlatNode } from './hierarchical-flat-node.model';
export interface HierarchicalLevel {
  name?: string;
  children?: HierarchicalLevel[];

  id?: number;
  nombre?: string;
  agrupadores?: any[];
  imagenUrl?: string;
  // estructuraJerarquica?: HierarchicalLevel[];
  nivelJerarquico?: HierarchicalLevel[];
  subNivelJerarquico?: HierarchicalLevel[];
}

export class HierarchicalLevelModel implements HierarchicalLevel {
  constructor(
    public id?: number,
    public nombre?: string,
    public agrupadores?: any[],
    public imagenUrl?: string,
    // public estructuraJerarquica?: HierarchicalLevel[],
    public nivelJerarquico?: HierarchicalLevel[],
    public subnivelJerarquico?: HierarchicalLevel[]
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
