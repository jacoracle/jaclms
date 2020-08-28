import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import UtilActivity from 'app/shared/activity-preview/util-activity';

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

  constructor(private formBuilder: FormBuilder) {}

  isValidQuestion(indQuestion: number): boolean {
    let controlPregunta;
    UtilActivity.refreshForm(this.activityForm);
    if (this.submitted) {
      let response = true;
      controlPregunta = UtilActivity.controlPregunta(this.activityForm, indQuestion);
      if (controlPregunta) {
        response = controlPregunta.status === 'VALID';
      }
      return response;
    } else {
      return true;
    }
  }

  addQuestion(): any {
    const preguntas = UtilActivity.preguntas(this.activityForm);
    if (preguntas) {
      const controlesPreguntas = preguntas.controls;
      let campoPregunta;

      UtilActivity.refreshForm(this.activityForm);
      if (controlesPreguntas.length < 10) {
        controlesPreguntas.push(UtilActivity.formGroupVacioPregunta(this.formBuilder));
      }

      for (let i = 0; i < controlesPreguntas.length; i++) {
        campoPregunta = controlesPreguntas[i].get('tipoPregunta');
        if (campoPregunta) {
          campoPregunta.setValue(this.typeQuestion);
        }
        if (this.typeQuestion === 'verdaderoFalso') {
          UtilActivity.verdaderoFalso(this.activityForm, i);
        }
      }
      UtilActivity.refreshForm(this.activityForm);
    }
  }

  removeQuestion(indQuestion: number): any {
    UtilActivity.refreshForm(this.activityForm);
    const preguntas = UtilActivity.preguntas(this.activityForm);
    if (preguntas) {
      const controlesPreguntas = preguntas.controls;
      if (indQuestion > -1 && controlesPreguntas.length > 1) {
        controlesPreguntas.splice(indQuestion, 1);
      }
      UtilActivity.refreshForm(this.activityForm);
    }
  }

  controlesPreguntas(): AbstractControl[] {
    return UtilActivity.controlesPreguntas(this.activityForm);
  }

  onKeyDown(event: any): boolean {
    return UtilActivity.onKeyDown(event);
  }
}
