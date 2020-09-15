import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpcionPreguntas, SubTipoActividad, TipoActividad } from 'app/shared/model/enumerations/tipo-actividad.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { IActividadPregunta } from 'app/shared/model/actividad-pregunta.model';
import { cantidadAtributos } from 'app/shared/util/util';
import UtilActivityQuestions from 'app/shared/activity-questions-preview/util-activity-questions';
import { FileUploadInteractivasService } from 'app/services/file-upload-interactivas.service';

@Component({
  selector: 'jhi-activity-form-media-modal',
  templateUrl: './activity-form-media-modal.component.html',
  styleUrls: ['./activity-form-media-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityFormMediaModalComponent implements OnInit {
  submitted = false;
  id = 0;
  jsonFormIn: IActividadPregunta | undefined;
  activityForm = this.formGroupActivity(this.jsonFormIn);
  typeActivityQuestions = '';
  ultimaOpcion = '';
  filesAnswersDelete = [];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private eventManager: JhiEventManager,
    public fileUploadInteractivas: FileUploadInteractivasService
  ) {}

  ngOnInit(): void {
    if (this.jsonFormIn) {
      this.activityForm = this.formGroupActivity(this.jsonFormIn);
      UtilActivityQuestions.refreshForm(this.activityForm);
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
        preguntas: UtilActivityQuestions.arrayFormGroupPreguntas(jsonForm, this.formBuilder)
      });
    } else {
      return this.formBuilder.group({
        tipoActividad: this.formBuilder.group({
          tipoActividad: new FormControl(TipoActividad.pregunta, [Validators.required]),
          subtipo: new FormControl(SubTipoActividad.imagen, [Validators.required]),
          opcion: new FormControl(SubTipoActividad.imagen + '_' + OpcionPreguntas.unica, [Validators.required])
        }),
        evaluable: new FormControl(false, [Validators.required]),
        preguntas: UtilActivityQuestions.arrayFormGroupPreguntas(jsonForm, this.formBuilder)
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
    const controlesPreguntas = UtilActivityQuestions.controlesPreguntas(this.activityForm);
    let campoPregunta;
    for (let i = 0; i < controlesPreguntas.length; i++) {
      campoPregunta = controlesPreguntas[i].get('tipoPregunta');
      if (campoPregunta) {
        campoPregunta.setValue(event.value);
      }

      if (event.value === 'verdaderoFalso') {
        UtilActivityQuestions.verdaderoFalso(this.activityForm, i);
      } else {
        if (event.value === 'imagen_unica' || event.value === 'imagen_multiple') {
          UtilActivityQuestions.imagen(
            this.activityForm,
            i,
            this.ultimaOpcion !== 'imagen_unica' && this.ultimaOpcion !== 'imagen_multiple'
          );
        }
      }

      if (this.ultimaOpcion === 'verdaderoFalso') {
        this.vaciaActivaInputsBoolean(i, event.value === 'unica' || event.value === 'multiple');
      } else {
        if (
          (this.ultimaOpcion === 'imagen_multiple' || this.ultimaOpcion === 'imagen_unica') &&
          event.value !== 'imagen_unica' && event.value !== 'imagen_multiple' && event.value !== 'verdaderoFalso'
        ) {
          this.vaciaActivaInputs(i);
        }
      }

      this.onRadioChange(i, 0);
    }
    this.ultimaOpcion = event.value;
  }

  onRadioChange(indQuestion: number, indAnswer: number): void {
    UtilActivityQuestions.onRadioChange(this.activityForm, indQuestion, indAnswer);
  }

  vaciaActivaInputsBoolean(indQuestion: number, activa: boolean): void {
    const campoVerdadero = UtilActivityQuestions.campoRespuesta(this.activityForm, indQuestion, 0, 'respuesta');
    if (campoVerdadero) {
      campoVerdadero.setValue('');
      if (activa) {
        campoVerdadero.enable();
      }
    }

    const campoFalso = UtilActivityQuestions.campoRespuesta(this.activityForm, indQuestion, 1, 'respuesta');
    if (campoFalso) {
      campoFalso.setValue('');
      if (activa) {
        campoFalso.enable();
      }
    }
  }

  vaciaActivaInputs(indQuestion: number): void {
    const cantidadRespuestas = UtilActivityQuestions.controlesRespuestas(this.activityForm, indQuestion).length;
    let respuesta;
    for (let i = 0; i < cantidadRespuestas; i++) {
      respuesta = UtilActivityQuestions.campoRespuesta(this.activityForm, indQuestion, i, 'respuesta');
      if (respuesta) {
        respuesta.setValue('');
        respuesta.enable();
      }
    }
    UtilActivityQuestions.refreshAnswers(this.activityForm);
  }

  onSubmit(): any {
    this.submitted = true;
    UtilActivityQuestions.refreshForm(this.activityForm);
    if (this.activityForm.invalid) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', {
          message: 'constructorApp.activityForm.invalidForm.error',
          type: 'danger'
        })
      );
    } else {
      this.fileUploadInteractivas.deleteFiles(this.filesAnswersDelete).subscribe(() => {});
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

  onKeyDown(event: any): boolean {
    return UtilActivityQuestions.onKeyDown(event);
  }
}
