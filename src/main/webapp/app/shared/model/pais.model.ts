import { ITelefono } from 'app/shared/model/telefono.model';

export interface IPais {
  id?: number;
  nombre?: string;
  name?: string;
  iso3?: string;
  codigoTelefonico?: string;
  telefonos?: ITelefono[];
}

export class Pais implements IPais {
  constructor(
    public id?: number,
    public nombre?: string,
    public name?: string,
    public iso3?: string,
    public codigoTelefonico?: string,
    public telefonos?: ITelefono[]
  ) {}
}
