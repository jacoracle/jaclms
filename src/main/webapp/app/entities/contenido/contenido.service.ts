import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IContenido } from 'app/shared/model/contenido.model';

type EntityResponseType = HttpResponse<IContenido>;

@Injectable({ providedIn: 'root' })
export class ContenidoService {
  public resourceUrl = SERVER_API_URL + 'api/contenido';

  constructor(protected http: HttpClient) {}

  update(contenido: IContenido): Observable<EntityResponseType> {
    return this.http.put<IContenido>(this.resourceUrl, contenido, { observe: 'response' });
  }
}
