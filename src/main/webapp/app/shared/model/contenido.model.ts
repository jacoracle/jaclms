export interface IContenido {
  id?: number;
  contenido?: string;
  nombre?: string;
  extension?: string;
  peso?: number;
}

export class Contenido implements IContenido {
  constructor(public id?: number, public contenido?: string, public nombre?: string, public extension?: string, public peso?: number) {}
}
