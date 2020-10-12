import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRutaModel } from '../../shared/model/ruta-aprendizaje.model';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import * as moment from 'moment';

type EntityResponseType = HttpResponse<IRutaModel>;
type EntityArrayResponseType = HttpResponse<IRutaModel[]>;

@Injectable({
  providedIn: 'root'
})
export class RutaAprendizajeService {
  public resourceUrl = SERVER_API_URL + 'api/rutas';

  constructor(protected http: HttpClient) {}

  create(learningPath: IRutaModel): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(learningPath);
    // const form = new FormData();
    // form.append('path', JSON.stringify(copy));
    return this.http
      .post<IRutaModel>(this.resourceUrl, learningPath /*form*/, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(curso: any): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(curso);
    return this.http
      .put<IRutaModel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(curso: IRutaModel): IRutaModel {
    const copy: IRutaModel = Object.assign({}, curso, {
      fechaCreacion: curso.fechaCreacion && curso.fechaCreacion.isValid() ? curso.fechaCreacion.format(DATE_FORMAT) : undefined,
      fechaPublicacion: curso.fechaPublicacion && curso.fechaPublicacion.isValid() ? curso.fechaPublicacion.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaCreacion = res.body.fechaCreacion ? moment(res.body.fechaCreacion) : undefined;
      res.body.fechaPublicacion = res.body.fechaPublicacion ? moment(res.body.fechaPublicacion) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((curso: IRutaModel) => {
        curso.fechaCreacion = curso.fechaCreacion ? moment(curso.fechaCreacion) : undefined;
        curso.fechaPublicacion = curso.fechaPublicacion ? moment(curso.fechaPublicacion) : undefined;
      });
    }
    return res;
  }
}
