export interface ITema {
  id?: number;
  nombre?: string;
}
export class Tema implements ITema {
  constructor(public id?: number, public nombre?: string) {}
}
