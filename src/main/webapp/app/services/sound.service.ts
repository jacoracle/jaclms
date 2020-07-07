import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { Contenido } from 'app/shared/model/contenido.model';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private soundSrc = new Subject<SafeUrl>();
  private editing = new Subject<boolean>();
  private pathUrl = new Subject<string>();
  private audioProperties = new Subject<Contenido>();

  constructor() {}

  setSoundSrc(soundSrc: SafeUrl): void {
    this.soundSrc.next(soundSrc);
  }

  getSoundSrc(): Observable<SafeUrl> {
    return this.soundSrc.asObservable();
  }

  setEditing(editing: boolean): void {
    this.editing.next(editing);
  }

  getEditing(): Observable<boolean> {
    return this.editing.asObservable();
  }

  setPathUrl(pathUrl: string): void {
    this.pathUrl.next(pathUrl);
  }

  getPathUrl(): Observable<string> {
    return this.pathUrl.asObservable();
  }

  setAudioProperties(audioProperties: Contenido): void {
    this.audioProperties.next(audioProperties);
  }

  getAudioProperties(): Observable<Contenido> {
    return this.audioProperties.asObservable();
  }
}
