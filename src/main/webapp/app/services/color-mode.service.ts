import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorModeService {
  colorMode = new Subject<string>();

  constructor() {}

  getColorMode(): Observable<string> {
    return this.colorMode.asObservable();
  }

  setColorMode(colorMode: string): void {
    this.colorMode.next(colorMode);
  }
}
