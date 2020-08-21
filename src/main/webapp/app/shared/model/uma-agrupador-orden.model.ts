export interface IOrdenUMA {
  id?: number;
  orden?: number;
}

export class OrdenUMA implements IOrdenUMA {
  constructor(public id?: number, public orden?: number) {}
}
