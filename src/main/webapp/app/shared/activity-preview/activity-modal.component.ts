import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpcionPreguntas, SubTipoActividad, TipoActividad } from 'app/shared/model/enumerations/tipo-actividad.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { IActividadPregunta } from 'app/shared/model/actividad-pregunta.model';
import { cantidadAtributos } from 'app/shared/util/util';

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

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private eventManager: JhiEventManager) {}

  ngOnInit(): void {
    if (this.jsonFormIn) {
      this.activityForm = this.formGroupActivity(this.jsonFormIn);
      this.refreshForm();
    }
  }

  formGroupActivity(jsonForm: IActividadPregunta | undefined): FormGroup {
    if (jsonForm && cantidadAtributos(jsonForm) > 0) {
      return this.formBuilder.group({
        tipoActividad: this.formBuilder.group({
          tipoActividad: new FormControl(jsonForm.tipoActividad.tipoActividad, [Validators.required]),
          subtipo: new FormControl(jsonForm.tipoActividad.subtipo, [Validators.required]),
          opcion: new FormControl(jsonForm.tipoActividad.opcion, [Validators.required])
        }),
        evaluable: new FormControl(jsonForm.evaluable, [Validators.required]),
        preguntas: this.arrayFormGroupPreguntas(jsonForm)
      });
    } else {
      return this.formBuilder.group({
        tipoActividad: this.formBuilder.group({
          tipoActividad: new FormControl(TipoActividad.pregunta, [Validators.required]),
          subtipo: new FormControl(SubTipoActividad.texto, [Validators.required]),
          opcion: new FormControl(OpcionPreguntas.unica, [Validators.required])
        }),
        evaluable: new FormControl(false, [Validators.required]),
        preguntas: this.arrayFormGroupPreguntas(jsonForm)
      });
    }
  }

  arrayFormGroupPreguntas(jsonForm: IActividadPregunta | undefined): FormArray {
    const preguntas = this.formBuilder.array([]);
    if (jsonForm && cantidadAtributos(jsonForm) > 0) {
      for (let i = 0; i < jsonForm.preguntas.length; i++) {
        preguntas.push(
          new FormGroup({
            pregunta: new FormControl(jsonForm.preguntas[i].pregunta, [Validators.required, Validators.maxLength(50)]),
            tipoPregunta: new FormControl(jsonForm.preguntas[i].tipoPregunta, [Validators.required]),
            respuestas: this.arrayFormGroupRespuestas(jsonForm, i),
            calificada: new FormControl(jsonForm.preguntas[i].calificada, [Validators.required]),
            marcada: new FormControl(jsonForm.preguntas[i].marcada, [Validators.required]),
            correcta: new FormControl(jsonForm.preguntas[i].correcta, [Validators.required])
          })
        );
      }
    } else {
      preguntas.push(this.formGroupVacioPregunta());
    }
    return preguntas;
  }

  formGroupVacioPregunta(): FormGroup {
    return new FormGroup({
      pregunta: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      tipoPregunta: new FormControl(OpcionPreguntas.unica, [Validators.required]),
      respuestas: this.arrayFormGroupRespuestas(undefined, 0),
      calificada: new FormControl(false, [Validators.required]),
      marcada: new FormControl(false, [Validators.required]),
      correcta: new FormControl(false, [Validators.required])
    });
  }

  arrayFormGroupRespuestas(jsonForm: IActividadPregunta | undefined, indQuestion: number): FormArray {
    const respuestas = this.formBuilder.array([]);
    let respuestasJson;
    if (jsonForm && cantidadAtributos(jsonForm) > 0) {
      respuestasJson = jsonForm.preguntas[indQuestion].respuestas;
      if (respuestasJson) {
        for (let i = 0; i < respuestasJson.length; i++) {
          respuestas.push(
            new FormGroup({
              respuesta: new FormControl(respuestasJson[i].respuesta, [Validators.required, Validators.maxLength(50)]),
              correcta: new FormControl(respuestasJson[i].correcta, [Validators.required]),
              seleccionada: new FormControl(respuestasJson[i].seleccionada, [Validators.required])
            })
          );
        }
      }
    } else {
      respuestas.push(this.formGroupVacioRespuesta(true));
    }
    return respuestas;
  }

  formGroupVacioRespuesta(esPrimer: boolean): FormGroup {
    return new FormGroup({
      respuesta: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      correcta: new FormControl(esPrimer, [Validators.required]),
      seleccionada: new FormControl(false, [Validators.required])
    });
  }

  preguntas(): FormArray {
    return this.activityForm.get('preguntas') as FormArray;
  }

  respuestas(indQuestion: number): FormArray {
    return this.preguntas().controls[indQuestion].get('respuestas') as FormArray;
  }

  isValidQuestion(indQuestion: number): boolean {
    let controlPregunta;
    this.refreshForm();
    if (this.submitted) {
      let response = true;
      controlPregunta = this.controlPregunta(indQuestion);
      if (controlPregunta) {
        response = controlPregunta.status === 'VALID';
      }
      return response;
    } else {
      return true;
    }
  }

  addQuestion(): any {
    const controlesPreguntas = this.preguntas().controls;
    let campoPregunta;

    this.refreshForm();
    if (controlesPreguntas.length < 10) {
      controlesPreguntas.push(this.formGroupVacioPregunta());
    }

    for (let i = 0; i < controlesPreguntas.length; i++) {
      campoPregunta = controlesPreguntas[i].get('tipoPregunta');
      if (campoPregunta) {
        campoPregunta.setValue(this.typeQuestion());
      }
    }
    this.refreshForm();
  }

  removeQuestion(indQuestion: number): any {
    this.refreshForm();
    const controlesPreguntas = this.preguntas().controls;
    if (indQuestion > -1 && controlesPreguntas.length > 1) {
      controlesPreguntas.splice(indQuestion, 1);
    }
    this.refreshForm();
  }

  controlPregunta(indQuestion: number): AbstractControl | null | undefined {
    const controlesPreguntas = this.preguntas().controls;
    let controlPregunta;
    if (controlesPreguntas[indQuestion]) {
      controlPregunta = controlesPreguntas[indQuestion];
    }
    return controlPregunta;
  }

  typeQuestion(): string {
    const controlTipoActividad = this.activityForm.controls['tipoActividad'];
    let campoOpcion;
    let tipoPregunta;
    if (controlTipoActividad) {
      campoOpcion = controlTipoActividad.get('opcion');
      if (campoOpcion) {
        tipoPregunta = campoOpcion.value;
      }
    }
    return tipoPregunta;
  }

  isValidAnswer(indQuestion: number, indAnswer: number): boolean {
    const controlRespuesta = this.controlRespuesta(indQuestion, indAnswer);
    this.refreshForm();
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
    const controlesRespuestas = this.controlesRespuestas(indQuestion);
    this.refreshForm();
    if (controlesRespuestas.length < 4) {
      controlesRespuestas.push(this.formGroupVacioRespuesta(false));
    }
    this.refreshForm();
  }

  removeAnswer(indQuestion: number, indAnswer: number): any {
    this.refreshForm();
    const controlesRespuestas = this.controlesRespuestas(indQuestion);
    if (indAnswer > -1 && controlesRespuestas.length > 1) {
      controlesRespuestas.splice(indAnswer, 1);
    }
    this.refreshForm();
  }

  onOpcionChange(event: any): void {
    const controlesPreguntas = this.preguntas().controls;
    let campoPregunta;
    for (let i = 0; i < controlesPreguntas.length; i++) {
      campoPregunta = controlesPreguntas[i].get('tipoPregunta');
      if (campoPregunta) {
        campoPregunta.setValue(event.value);
      }

      this.onRadioChange(i, 0);
    }
  }

  onRadioChange(indQuestion: number, indAnswer: number): void {
    const cantidadRespuestas = this.controlesRespuestas(indQuestion).length;
    let respuestasPorNegar;
    let respuestaPorAfirmar;
    this.refreshAnswers();
    for (let i = 0; i < cantidadRespuestas; i++) {
      if (i !== indAnswer) {
        respuestasPorNegar = this.campoRespuesta(indQuestion, i, 'correcta');
        if (respuestasPorNegar) {
          respuestasPorNegar.setValue(false);
        }
      } else {
        respuestaPorAfirmar = this.campoRespuesta(indQuestion, i, 'correcta');
        if (respuestaPorAfirmar) {
          if (respuestaPorAfirmar.value === false) {
            respuestaPorAfirmar.setValue(true);
          }
          respuestaPorAfirmar.updateValueAndValidity({ onlySelf: true, emitEvent: true });
        }
      }
    }
    this.refreshAnswers();
  }

  onCheckChange(): void {
    this.refreshAnswers();
  }

  campoRespuesta(indQuestion: number, indAnswer: number, nombreCampo: string): AbstractControl | null | undefined {
    const controlRespuesta = this.controlRespuesta(indQuestion, indAnswer);
    let campo;
    if (controlRespuesta) {
      campo = controlRespuesta.get(nombreCampo);
    }
    return campo;
  }

  campoRespuestaCorrecta(indQuestion: number, indAnswer: number): boolean {
    const campoRespuesta = this.campoRespuesta(indQuestion, indAnswer, 'correcta');
    if (campoRespuesta) {
      return campoRespuesta.value;
    } else {
      return false;
    }
  }

  controlRespuesta(indQuestion: number, indAnswer: number): AbstractControl | null | undefined {
    const controlesRespuestas = this.respuestas(indQuestion).controls;
    let controlRespuesta;

    if (controlesRespuestas) {
      if (controlesRespuestas[indAnswer]) {
        controlRespuesta = controlesRespuestas[indAnswer];
      }
    }
    return controlRespuesta;
  }

  controlesRespuestas(indQuestion: number): AbstractControl[] {
    const controlesRespuestas = this.respuestas(indQuestion).controls;
    if (controlesRespuestas) {
      return controlesRespuestas;
    } else {
      return [];
    }
  }

  refreshQuestion(indQuestion: number): void {
    const controlPregunta = this.controlPregunta(indQuestion);
    if (controlPregunta) {
      controlPregunta.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    }
  }

  refreshQuestions(): void {
    this.preguntas().updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }

  refreshAnswers(): void {
    for (let i = 0; i < this.preguntas().length; i++) {
      this.respuestas(i).updateValueAndValidity({ onlySelf: true, emitEvent: true });
      this.refreshQuestions();
    }
  }

  refreshForm(): void {
    this.refreshAnswers();
    const evaluable = this.activityForm.get('evaluable');
    if (evaluable) {
      evaluable.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    }
    this.activityForm.updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }

  onSubmit(): any {
    this.submitted = true;
    this.refreshForm();
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
