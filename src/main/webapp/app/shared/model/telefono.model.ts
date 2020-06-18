import { IUser } from 'app/core/user/user.model';
import { IPais } from 'app/shared/model/pais.model';

export interface ITelefono {
  id?: number;
  telefono?: number;
  user?: IUser;
  pais?: IPais;
}

export class Telefono implements ITelefono {
  constructor(public id?: number, public telefono?: number, public user?: IUser, public pais?: IPais) {}
}
