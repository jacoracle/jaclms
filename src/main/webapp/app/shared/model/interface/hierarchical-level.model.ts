export interface HierarchicalLevel {
  name?: string;
  children?: HierarchicalLevel[];

  id?: number;
  nombre?: string;
  agrupadores?: any[];
  imagenUrl?: string;
  estructuraJerarquica?: HierarchicalLevel[];
}

export class HierarchicalLevelModel implements HierarchicalLevel {
  constructor(
    public id?: number,
    public nombre?: string,
    public agrupadores?: any[],
    public imagenUrl?: string,
    public estructuraJerarquica?: HierarchicalLevel[]
  ) {}
}
