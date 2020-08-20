import { Component, Input } from '@angular/core';
import { ActividadPregunta, Preguntas, Respuestas } from 'app/shared/model/actividad-pregunta.model';

@Component({
  selector: 'jhi-activity-preview',
  templateUrl: './activity-preview.component.html',
  styleUrls: ['./activity-preview.component.scss']
})
export class ActivityPreviewComponent {
  @Input()
  jsonForm?: ActividadPregunta;

  constructor() {}

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
}
