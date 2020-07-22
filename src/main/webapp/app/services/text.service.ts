import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ITipoBloqueComponentes } from 'app/shared/model/tipo-bloque-componentes.model';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  private text = new Subject<string>();
  private editing = new Subject<boolean>();
  private templateTypeId = new Subject<ITipoBloqueComponentes>();

  constructor() {}

  getText(): Observable<string> {
    return this.text.asObservable();
  }

  setText(text: string): void {
    this.text.next(text);
  }

  getEditing(): Observable<boolean> {
    return this.editing.asObservable();
  }

  setEditing(editing: boolean): void {
    this.editing.next(editing);
  }

  getTemplateType(): Observable<ITipoBloqueComponentes> {
    return this.templateTypeId.asObservable();
  }

  setTemplateType(templateType: ITipoBloqueComponentes): void {
    this.templateTypeId.next(templateType);
  }
}
