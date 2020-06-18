import { ITelefono } from 'app/shared/model/telefono.model';

export interface IUser {
  id?: any;
  login?: string;
  firstName?: string;
  lastName1?: string;
  lastName2?: string;
  telefonos?: ITelefono[];
  email?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: string[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  password?: string;
}

export class User implements IUser {
  constructor(
    public id?: any,
    public login?: string,
    public firstName?: string,
    public lastName1?: string,
    public lastName2?: string,
    public telefonos?: ITelefono[],
    public email?: string,
    public phone?: string,
    public activated?: boolean,
    public langKey?: string,
    public authorities?: string[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public password?: string
  ) {}
}
