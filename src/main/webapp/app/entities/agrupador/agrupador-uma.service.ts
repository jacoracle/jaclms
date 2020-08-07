import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IModulo } from 'app/shared/model/modulo.model';

type EntityResponseType = HttpResponse<IModulo>;
type EntityArrayResponseType = HttpResponse<IModulo[]>;

@Injectable({ providedIn: 'root' })
export class AgrupadorService {
  public resourceUrl = SERVER_API_URL + 'api/agrupador';

  constructor(protected http: HttpClient) {}

  create(modulo: any): Observable<EntityResponseType> {
    return this.http
      .post<IModulo>(this.resourceUrl, modulo, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(modulo: any): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(modulo);
    return this.http
      .put<IModulo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IModulo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IModulo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(curso: IModulo): IModulo {
    const copy: IModulo = Object.assign({}, curso, {
      fechaCreacion: curso.fechaCreacionSys && curso.fechaCreacionSys.isValid() ? curso.fechaCreacionSys.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaCreacionSys = res.body.fechaCreacionSys ? moment(res.body.fechaCreacionSys) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((modulo: IModulo) => {
        modulo.fechaCreacionSys = modulo.fechaCreacionSys ? moment(modulo.fechaCreacionSys) : undefined;
      });
    }
    return res;
  }
}
