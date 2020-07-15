export interface ITipoModulo {
  id?: number;
  nombre?: string;
}
export class TipoModulo implements ITipoModulo {
  constructor(public id?: number, public nombre?: string) {}
}
