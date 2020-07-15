import { Moment } from 'moment';
import { ITipoModulo } from './tipo-modulo.model';
import { IAsignatura } from './asignatura.model';
import { ITema } from './tema.model';
import { INumeroGrado } from './numero-grado.model';
// import { INumeroGrado } from 'app/shared/model/numero-grado.model';

export interface IModulo {
  id?: number;
  tiposModulos?: ITipoModulo[];
  asignatura?: IAsignatura;
  temas?: Array<ITema>;
  rolesColaboradores?: any[];
  usuario?: any;
  titulo?: string;
  descripcion?: string;
  fechaCreacion?: Moment;
  fechaCreacionSys?: Moment;
  numeroGrado?: INumeroGrado[];
  estatus?: string;
}

export class Modulo implements IModulo {
  constructor(
    public id?: number,
    public tiposModulos?: ITipoModulo[],
    public asignatura?: IAsignatura,
    public temas?: ITema[],
    public rolesColaboradores?: any,
    public usuario?: any,
    public titulo?: string,
    public descripcion?: string,
    public fechaCreacion?: Moment,
    public fechaCreacionSys?: Moment,
    public numeroGrado?: INumeroGrado[],
    public estatus?: string
  ) {}
}
