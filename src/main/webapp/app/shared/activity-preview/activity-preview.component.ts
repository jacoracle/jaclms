import { Component, Input } from '@angular/core';
import { ActividadPregunta } from 'app/shared/model/actividad-pregunta.model';

@Component({
  selector: 'jhi-activity-preview',
  templateUrl: './activity-preview.component.html',
  styleUrls: ['./activity-preview.component.scss']
})
export class ActivityPreviewComponent {
  @Input()
  jsonForm?: ActividadPregunta;

  constructor() {}
}
