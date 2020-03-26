import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IModalidad } from 'app/shared/model/modalidad.model';

type EntityResponseType = HttpResponse<IModalidad>;
type EntityArrayResponseType = HttpResponse<IModalidad[]>;

@Injectable({ providedIn: 'root' })
export class ModalidadService {
  public resourceUrl = SERVER_API_URL + 'api/modalidads';

  constructor(protected http: HttpClient) {}

  create(modalidad: IModalidad): Observable<EntityResponseType> {
    return this.http.post<IModalidad>(this.resourceUrl, modalidad, { observe: 'response' });
  }

  update(modalidad: IModalidad): Observable<EntityResponseType> {
    return this.http.put<IModalidad>(this.resourceUrl, modalidad, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IModalidad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IModalidad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
