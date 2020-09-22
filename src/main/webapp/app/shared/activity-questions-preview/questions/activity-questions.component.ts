import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import UtilActivityQuestions from 'app/shared/activity-questions-preview/util-activity-questions';
import { FileUploadInteractivasService } from 'app/services/file-upload-interactivas.service';

@Component({
  selector: 'jhi-activity-questions',
  templateUrl: './activity-questions.component.html',
  styleUrls: ['./activity-questions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityQuestionsComponent {
  @Input()
  activityForm = new FormGroup({});

  @Input()
  submitted = false;

  @Input()
  typeQuestion = '';

  @Input()
  filesAnswersDelete: string[] = [];

  @Input()
  id = 0;

  constructor(private formBuilder: FormBuilder, public fileUploadInteractivas: FileUploadInteractivasService) {}

  isValidQuestion(indQuestion: number): boolean {
    let controlPregunta;
    UtilActivityQuestions.refreshForm(this.activityForm);
    if (this.submitted) {
      let response = true;
      controlPregunta = UtilActivityQuestions.controlPregunta(this.activityForm, indQuestion);
      if (controlPregunta) {
        response = controlPregunta.status === 'VALID';
      }
      return response;
    } else {
      return true;
    }
  }

  addQuestion(): any {
    const preguntas = UtilActivityQuestions.preguntas(this.activityForm);
    if (preguntas) {
      const controlesPreguntas = preguntas.controls;
      let campoTipoPregunta;

      UtilActivityQuestions.refreshForm(this.activityForm);
      if (controlesPreguntas.length < 10) {
        controlesPreguntas.push(UtilActivityQuestions.formGroupVacioPregunta(this.formBuilder));
      }

      for (let i = 0; i < controlesPreguntas.length; i++) {
        campoTipoPregunta = controlesPreguntas[i].get('tipoPregunta');
        if (campoTipoPregunta) {
          campoTipoPregunta.setValue(this.typeQuestion);
        }
        if (this.typeQuestion === 'verdaderoFalso') {
          UtilActivityQuestions.verdaderoFalso(this.activityForm, i);
        }
      }
      UtilActivityQuestions.refreshForm(this.activityForm);
    }
  }

  removeQuestion(indQuestion: number): any {
    UtilActivityQuestions.refreshForm(this.activityForm);
    const cantidadRespuestas = UtilActivityQuestions.controlesRespuestas(this.activityForm, indQuestion).length;
    const preguntas = UtilActivityQuestions.preguntas(this.activityForm);
    let path;
    if (preguntas) {
      const controlesPreguntas = preguntas.controls;
      if (indQuestion > -1 && controlesPreguntas.length > 1) {
        for (let i = 0; i < cantidadRespuestas; i++) {
          path = UtilActivityQuestions.campoRespuesta(this.activityForm, indQuestion, i, 'path');
          if (path) {
            this.filesAnswersDelete.push(path.value);
          }
        }
        controlesPreguntas.splice(indQuestion, 1);
      }
      UtilActivityQuestions.refreshForm(this.activityForm);
    }
  }

  controlesPreguntas(): AbstractControl[] {
    return UtilActivityQuestions.controlesPreguntas(this.activityForm);
  }

  onKeyDown(event: any): boolean {
    return UtilActivityQuestions.onKeyDown(event);
  }
}
