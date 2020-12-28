export interface INivel {
  id?: number;
  name?: string;
  children?: Children[];
}

export class Nivel implements INivel {
  constructor(public id?: number, public name?: string, public children?: Children[]) {}
}

export class Children {
  public id?: number;
  public name?: string;
  public children?: Children[];
}
