import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpcionPreguntas, SubTipoActividad, TipoActividad } from 'app/shared/model/enumerations/tipo-actividad.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { IActividadPregunta } from 'app/shared/model/actividad-pregunta.model';
import { cantidadAtributos } from 'app/shared/util/util';
import UtilActivity from 'app/shared/activity-preview/util-activity';

@Component({
  selector: 'jhi-activity-modal',
  templateUrl: './activity-modal.component.html',
  styleUrls: ['./activity-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityModalComponent implements OnInit {
  submitted = false;
  jsonFormIn: IActividadPregunta | undefined;
  activityForm = this.formGroupActivity(this.jsonFormIn);
  ultimaOpcion = '';

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private eventManager: JhiEventManager) {}

  ngOnInit(): void {
    if (this.jsonFormIn) {
      this.activityForm = this.formGroupActivity(this.jsonFormIn);
      UtilActivity.refreshForm(this.activityForm);
    }
  }

  formGroupActivity(jsonForm: IActividadPregunta | undefined): FormGroup {
    if (jsonForm && cantidadAtributos(jsonForm) > 0) {
      if (jsonForm.tipoActividad.opcion != null) {
        this.ultimaOpcion = jsonForm.tipoActividad.opcion;
      }
      return this.formBuilder.group({
        tipoActividad: this.formBuilder.group({
          tipoActividad: new FormControl(jsonForm.tipoActividad.tipoActividad, [Validators.required]),
          subtipo: new FormControl(jsonForm.tipoActividad.subtipo, [Validators.required]),
          opcion: new FormControl(jsonForm.tipoActividad.opcion, [Validators.required])
        }),
        evaluable: new FormControl(jsonForm.evaluable, [Validators.required]),
        preguntas: UtilActivity.arrayFormGroupPreguntas(jsonForm, this.formBuilder)
      });
    } else {
      return this.formBuilder.group({
        tipoActividad: this.formBuilder.group({
          tipoActividad: new FormControl(TipoActividad.pregunta, [Validators.required]),
          subtipo: new FormControl(SubTipoActividad.texto, [Validators.required]),
          opcion: new FormControl(OpcionPreguntas.unica, [Validators.required])
        }),
        evaluable: new FormControl(false, [Validators.required]),
        preguntas: UtilActivity.arrayFormGroupPreguntas(jsonForm, this.formBuilder)
      });
    }
  }

  typeQuestion(): string {
    let campoOpcion;
    let tipoPregunta;
    let controlTipoActividad;
    if (this.activityForm) {
      controlTipoActividad = this.activityForm.controls['tipoActividad'];
      if (controlTipoActividad) {
        campoOpcion = controlTipoActividad.get('opcion');
        if (campoOpcion) {
          tipoPregunta = campoOpcion.value;
        }
      }
    }
    return tipoPregunta;
  }

  onOpcionChange(event: any): void {
    const controlesPreguntas = UtilActivity.controlesPreguntas(this.activityForm);
    let campoPregunta;
    for (let i = 0; i < controlesPreguntas.length; i++) {
      campoPregunta = controlesPreguntas[i].get('tipoPregunta');
      if (campoPregunta) {
        campoPregunta.setValue(event.value);
      }
      if (event.value === 'verdaderoFalso') {
        UtilActivity.verdaderoFalso(this.activityForm, i);
      } else if (this.ultimaOpcion === 'verdaderoFalso') {
        this.vaciaActivaInputs(i);
      }
      this.onRadioChange(i, 0);
    }
    this.ultimaOpcion = event.value;
  }

  onRadioChange(indQuestion: number, indAnswer: number): void {
    UtilActivity.onRadioChange(this.activityForm, indQuestion, indAnswer);
  }

  vaciaActivaInputs(indQuestion: number): void {
    const campoVerdadero = UtilActivity.campoRespuesta(this.activityForm, indQuestion, 0, 'respuesta');
    if (campoVerdadero) {
      campoVerdadero.setValue('');
      campoVerdadero.enable();
    }

    const campoFalso = UtilActivity.campoRespuesta(this.activityForm, indQuestion, 1, 'respuesta');
    if (campoFalso) {
      campoFalso.setValue('');
      campoFalso.enable();
    }
  }

  onSubmit(): any {
    this.submitted = true;
    UtilActivity.refreshForm(this.activityForm);
    if (this.activityForm.invalid) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', {
          message: 'constructorApp.activityForm.invalidForm.error',
          type: 'danger'
        })
      );
    } else {
      this.activeModal.close(this.activityForm.getRawValue());
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', {
          message: 'constructorApp.activityForm.closeModal.success',
          type: 'info'
        })
      );
    }
  }

  close(): any {
    this.activeModal.close();
  }
}
