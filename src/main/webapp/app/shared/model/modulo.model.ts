import { Moment } from 'moment';
import { ITipoModulo } from './tipo-modulo.model';
import { IAsignatura } from './asignatura.model';
import { ITema } from './tema.model';
// import { INumeroGrado } from 'app/shared/model/numero-grado.model';

export interface IModulo {
  id?: number;
  tipoModulo?: ITipoModulo;
  asignatura?: IAsignatura;
  temas?: ITema;
  rolesColaborador?: any;
  usuario?: any;
  titulo?: string;
  descripcion?: string;
  fechaCreacion?: Moment;
}

export class Modulo implements IModulo {
  constructor(
    public id?: number,
    public tipoModulo?: ITipoModulo,
    public asignatura?: IAsignatura,
    public temas?: ITema,
    public rolesColaborador?: any,
    public usuario?: any,
    public titulo?: string,
    public descripcion?: string,
    public fechaCreacion?: Moment
  ) {}
}