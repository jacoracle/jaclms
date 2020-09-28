import { Component, OnInit, Input } from '@angular/core';
import { ActividadInteractiva } from 'app/shared/model/actividad-interactiva.model';
import { Preguntas, Respuestas } from './../../../shared/model/actividad-pregunta.model';

@Component({
  selector: 'jhi-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  _activity?: ActividadInteractiva;
  @Input()
  set activity(activity: ActividadInteractiva) {
    this._activity = activity;
    console.error(this._activity);
  }
  get activity(): ActividadInteractiva {
    return this._activity!;
  }

  constructor() {}

  ngOnInit(): void {}

  createQuestion(): Preguntas {
    return {
      ...new Preguntas(),
      pregunta: '',
      tipoPregunta: undefined,
      respuestas: [],
      calificada: false,
      marcada: false,
      correcta: false,
      tipoRespuestas: undefined
    };
  }

  createAnswer(): Respuestas {
    return {
      ...new Respuestas(),
      respuesta: '',
      correcta: false,
      seleccionada: false,
      path: ''
    };
  }
}
