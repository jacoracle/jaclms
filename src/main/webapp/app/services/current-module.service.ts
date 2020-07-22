import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IModulo } from 'app/shared/model/modulo.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentModuleService {
  private currentModule = new Subject<IModulo>();
  private type = '';

  constructor() {}

  getType(): string {
    return this.type;
  }

  setType(value: string): void {
    this.type = value;
  }

  getCurrentModule(): Observable<IModulo> {
    return this.currentModule.asObservable();
  }

  setCurrentModule(course: IModulo): void {
    this.currentModule.next(course);
  }
}
