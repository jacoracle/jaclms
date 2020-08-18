import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IActividadInteractiva } from 'app/shared/model/actividad-interactiva.model';

type EntityResponseType = HttpResponse<IActividadInteractiva>;

@Injectable({ providedIn: 'root' })
export class ContenidoActividadService {
  public resourceUrl = SERVER_API_URL + 'api/actividad';

  constructor(protected http: HttpClient) {}

  update(actividad: IActividadInteractiva): Observable<EntityResponseType> {
    return this.http.put<IActividadInteractiva>(this.resourceUrl, actividad, { observe: 'response' });
  }
}
