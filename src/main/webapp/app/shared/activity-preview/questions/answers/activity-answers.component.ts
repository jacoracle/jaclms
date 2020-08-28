import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import UtilActivity from 'app/shared/activity-preview/util-activity';

@Component({
  selector: 'jhi-activity-answers',
  templateUrl: './activity-answers.component.html',
  styleUrls: ['./activity-answers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityAnswersComponent {
  @Input()
  indQuestion = 0;

  @Input()
  activityForm = new FormGroup({});

  @Input()
  submitted = false;

  @Input()
  groupQuestion = new FormGroup({});

  @Input()
  typeQuestion = '';

  constructor() {}

  onRadioChange(indQuestion: number, indAnswer: number): void {
    UtilActivity.onRadioChange(this.activityForm, indQuestion, indAnswer);
  }

  onCheckChange(): void {
    UtilActivity.refreshAnswers(this.activityForm);
  }

  isValidAnswer(indQuestion: number, indAnswer: number): boolean {
    const controlRespuesta = UtilActivity.controlRespuesta(this.activityForm, indQuestion, indAnswer);
    UtilActivity.refreshForm(this.activityForm);
    if (this.submitted) {
      if (controlRespuesta) {
        return controlRespuesta.status === 'VALID';
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  addAnswer(indQuestion: number): any {
    const controlesRespuestas = UtilActivity.controlesRespuestas(this.activityForm, indQuestion);
    UtilActivity.refreshForm(this.activityForm);
    if (controlesRespuestas.length < 4) {
      controlesRespuestas.push(UtilActivity.formGroupVacioRespuesta(false));
    }
    UtilActivity.refreshForm(this.activityForm);
  }

  removeAnswer(indQuestion: number, indAnswer: number): any {
    UtilActivity.refreshForm(this.activityForm);
    const controlesRespuestas = UtilActivity.controlesRespuestas(this.activityForm, indQuestion);
    if (indAnswer > -1 && controlesRespuestas.length > 1) {
      controlesRespuestas.splice(indAnswer, 1);
    }
    UtilActivity.refreshForm(this.activityForm);
  }

  controlesRespuestas(indQuestion: number): AbstractControl[] {
    return UtilActivity.controlesRespuestas(this.activityForm, indQuestion);
  }

  refreshQuestion(indQuestion: number): void {
    UtilActivity.refreshAnswersQuestion(this.activityForm, indQuestion);
    UtilActivity.refreshQuestion(this.activityForm, indQuestion);
  }

  campoRespuestaCorrecta(indQuestion: number, indAnswer: number): boolean {
    const campoRespuesta = UtilActivity.campoRespuesta(this.activityForm, indQuestion, indAnswer, 'correcta');
    if (campoRespuesta) {
      return campoRespuesta.value;
    } else {
      return false;
    }
  }

  onKeyDown(event: any): boolean {
    return UtilActivity.onKeyDown(event);
  }
}
