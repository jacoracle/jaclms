export interface ITagAgrupador {
  id?: number;
  descripcion?: string;
}

export class TagAgrupador implements ITagAgrupador {
  constructor(public id?: number, public descripcion?: string) {}
}
