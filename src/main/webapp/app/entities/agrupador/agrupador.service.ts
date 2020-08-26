import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAgrupador } from 'app/shared/model/agrupador.model';

type EntityResponseType = HttpResponse<IAgrupador>;
type EntityArrayResponseType = HttpResponse<IAgrupador[]>;

@Injectable({ providedIn: 'root' })
export class AgrupadorService {
  public resourceUrl = SERVER_API_URL + 'api/agrupador';

  constructor(protected http: HttpClient) {}

  create(modulo: any): Observable<EntityResponseType> {
    return this.http
      .post<IAgrupador>(this.resourceUrl, modulo, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(modulo: any): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(modulo);
    return this.http
      .put<IAgrupador>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAgrupador>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAgrupador[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(agrupador: IAgrupador): IAgrupador {
    const copy: IAgrupador = Object.assign({}, agrupador, {
      fechaInicioSys:
        agrupador.fechaInicioSys && agrupador.fechaInicioSys.isValid() ? agrupador.fechaInicioSys.format(DATE_FORMAT) : undefined,
      fechaFinSys: agrupador.fechaFinSys && agrupador.fechaFinSys.isValid() ? agrupador.fechaFinSys.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaInicioSys = res.body.fechaInicio ? moment(res.body.fechaInicio) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((agrupador: IAgrupador) => {
        agrupador.fechaInicioSys = agrupador.fechaInicio ? moment(agrupador.fechaInicio) : undefined;
        agrupador.fechaFinSys = agrupador.fechaFin ? moment(agrupador.fechaFin) : undefined;
      });
    }
    return res;
  }
}
