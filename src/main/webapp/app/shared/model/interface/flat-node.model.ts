export interface FlatNode {
  expandable?: boolean;
  // name: string;
  nombre?: string;
  level?: number;
  node?: any;
}

export class FlatNodeModel implements FlatNode {
  constructor(public expandable?: boolean, public nombre?: string, public level?: number, public node?: any) {}
}
