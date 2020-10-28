import { Component, Input } from '@angular/core';
import { Preguntas, Respuestas } from 'app/shared/model/actividad-pregunta.model';
import { FileUploadInteractivasService } from 'app/services/file-upload-interactivas.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import UtilActivityQuestions from 'app/shared/activity-questions-preview/util-activity-questions';

@Component({
  selector: 'jhi-activity-preview',
  templateUrl: './activity-preview.component.html',
  styleUrls: ['./activity-preview.component.scss']
})
export class ActivityPreviewComponent {
  @Input()
  jsonForm?: any;

  @Input()
  activityForm = new FormGroup({});

  @Input()
  typeQuestion = '';

  subscription: any;

  constructor(public fileUploadInteractivas: FileUploadInteractivasService, private domSanitizer: DomSanitizer) {}

  preguntas(): Preguntas[] {
    let res: Preguntas[] = [];
    if (this.jsonForm) {
      res = this.jsonForm.preguntas;
    }
    return res;
  }

  respuestas(indQuestion: number): Respuestas[] {
    let res: Respuestas[] = [];
    if (this.jsonForm) {
      const pregunta = this.preguntas()[indQuestion];
      if (pregunta.respuestas) {
        res = pregunta.respuestas;
      }
    }
    return res;
  }

  getImage(path: string, indQuestion: number, indAnswer: number): void {
    UtilActivityQuestions.getImage(this.activityForm, path, indQuestion, indAnswer, this.fileUploadInteractivas, this.domSanitizer);
  }

  getAudio(path: string, indQuestion: number, indAnswer: number): void {
    UtilActivityQuestions.getAudio(this.activityForm, path, indQuestion, indAnswer, this.fileUploadInteractivas, this.domSanitizer);
  }

  refreshQuestion(indQuestion: number): void {
    UtilActivityQuestions.refreshAnswersQuestion(this.activityForm, indQuestion);
    UtilActivityQuestions.refreshQuestion(this.activityForm, indQuestion);
  }

  isAnswersText(): boolean {
    return UtilActivityQuestions.isAnswersText(this.typeQuestion);
  }

  isMediaAudio(): boolean {
    return UtilActivityQuestions.isMediaAudio(this.typeQuestion);
  }

  isMediaImage(): boolean {
    return UtilActivityQuestions.isMediaImage(this.typeQuestion);
  }

  isQuestionText(): boolean {
    return UtilActivityQuestions.isQuestionText(this.typeQuestion);
  }

  isQuestionAudio(): boolean {
    return UtilActivityQuestions.isQuestionAudio(this.typeQuestion);
  }

  getAudioQuestion(path: string, indQuestion: number): void {
    UtilActivityQuestions.getAudioQuestion(this.activityForm, path, indQuestion, this.fileUploadInteractivas, this.domSanitizer);
  }
}
