export interface ITema {
  id?: number;
  descripcion?: string;
}
export class Tema implements ITema {
  constructor(public id?: number, public descripcion?: string) {}
}
