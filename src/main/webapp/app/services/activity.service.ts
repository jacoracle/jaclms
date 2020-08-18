import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { ActividadInteractiva } from 'app/shared/model/actividad-interactiva.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activitySrc = new Subject<SafeUrl>();
  private editing = new Subject<boolean>();
  private activityProperties = new Subject<ActividadInteractiva[]>();

  constructor() {}

  setActivitySrc(activitySrc: SafeUrl): void {
    this.activitySrc.next(activitySrc);
  }

  getActivitySrc(): Observable<SafeUrl> {
    return this.activitySrc.asObservable();
  }

  setEditing(editing: boolean): void {
    this.editing.next(editing);
  }

  getEditing(): Observable<boolean> {
    return this.editing.asObservable();
  }

  /**
   * to send values between video component and properties component
   * @param activityProperties object with values of video properties
   */
  setActivityProperties(activityProperties: ActividadInteractiva[]): void {
    this.activityProperties.next(activityProperties);
  }
  /**
   * get properties from video file
   */
  getActivityProperties(): Observable<ActividadInteractiva[]> {
    return this.activityProperties.asObservable();
  }
}
