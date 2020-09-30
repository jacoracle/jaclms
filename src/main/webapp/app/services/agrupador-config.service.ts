import { Injectable } from '@angular/core';
import { IAgrupadorUma } from 'app/shared/model/agrupador-uma.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgrupadorConfigService {
  // private clearTabErrorsMessage = new Subject<any>();
  private validateUmaGroups = new Subject<boolean>();
  private umasAddedEvent = new Subject<IAgrupadorUma[]>();

  constructor() {}

  setValidationUmaGroups(isValid: boolean): void {
    this.validateUmaGroups.next(isValid);
  }

  getValidationUmaGroups(): Observable<boolean> {
    return this.validateUmaGroups.asObservable();
  }

  setUmasAddedEvent(umas: IAgrupadorUma[]): void {
    this.umasAddedEvent.next(umas);
  }

  getUmasAddedEvent(): Observable<IAgrupadorUma[]> {
    return this.umasAddedEvent.asObservable();
  }
}
