export interface ITipoModulo {
  id?: number;
  descripcion?: string;
}
export class TipoModulo implements ITipoModulo {
  constructor(public id?: number, public descripcion?: string) {}
}
