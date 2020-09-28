import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActividadInteractiva, IActividadInteractiva } from 'app/shared/model/actividad-interactiva.model';
import { SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private editing = new Subject<boolean>();
  private activityProperties = new Subject<ActividadInteractiva[]>();
  private typeQuestion = new Subject<string>();
  private imgSrc = new Subject<SafeUrl>();

  private activity = new Subject<IActividadInteractiva>();

  constructor() {}

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

  /**
   * @param typeQuestion object with values type question text or media
   */
  setTypeQuestion(typeQuestion: string): void {
    this.typeQuestion.next(typeQuestion);
  }
  /**
   * get properties from type question
   */
  getTypeQuestion(): Observable<string> {
    return this.typeQuestion.asObservable();
  }

  setActivity(activity: IActividadInteractiva): void {
    this.activity.next(activity);
  }

  getActivity(): Observable<IActividadInteractiva> {
    return this.activity.asObservable();
  }
}
