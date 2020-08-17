import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcherUtil } from 'app/home-uma-groups/error-state-matcher';
import { Agrupador, IAgrupador } from 'app/shared/model/agrupador.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TagAgrupador } from 'app/shared/model/tag-agrupador.model';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { Subscription, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { JhiEventWithContent, JhiEventManager } from 'ng-jhipster';
import { AgrupadorService } from 'app/entities/agrupador/agrupador.service';

@Component({
  selector: 'jhi-agrupador-uma-update',
  templateUrl: './agrupador-uma-update.component.html',
  styleUrls: ['./agrupador-uma-update.component.scss']
})
export class AgrupadorUmaUpdateComponent implements OnInit, OnDestroy {
  @Output() createdGroupEventEmit: EventEmitter<IAgrupador> = new EventEmitter<IAgrupador>();
  @ViewChild('chipList', { static: false }) chipList: MatChipList | undefined;

  isSaving = false;
  subscription!: Subscription;
  createdGroupSequence!: IAgrupador;
  // chips
  tagsBusquedaAgrupador: TagAgrupador[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // termina chips

  // FORMULARIO
  matcher = new ErrorStateMatcherUtil();
  groupUmaForm = this.formbuilder.group({
    titleSequenceUmas: new FormControl('', [
      Validators.required
      // Validators.email,
    ]),
    desciptionSequenceUmas: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    searchTagsSequenceUmas: [] //  this.formbuilder.array(this.tagsBusquedaAgrupador, this.validateArrayNotEmpty)
  });
  secondFormGroup!: FormGroup;
  // TERMINA FORMULARIO

  secuenciasUma: IAgrupador[] = new Array<IAgrupador>();

  constructor(
    protected activatedRoute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private eventManager: JhiEventManager,
    protected agrupadorService: AgrupadorService
  ) {
    this.tagsBusquedaAgrupador = [];
    this.secondFormGroup = this.formbuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {
      //   this.updateForm(agrupador);
    });

    // este subscribe es para la validación que no logre hacer funcionar con la funcion al final de este ts
    this.groupUmaForm.get('searchTagsSequenceUmas')!.statusChanges.subscribe(status => (this.chipList!.errorState = status === 'INVALID'));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  saveSequenceGroup(): void {
    if (this.groupUmaForm.valid) {
      // this.isCompleted = true;
      this.isSaving = true;
      const agrupador: IAgrupador = this.mapFormDataToAgrupador();
      console.error('Deberá guardar');
      console.error(agrupador);

      if (!agrupador.titulo) {
        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.uma.validations.formError' })
        );
        this.makeInvalid('titulo');
      }
      if (agrupador.titulo && agrupador.titulo.length > 50) {
        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.uma.validations.formError' })
        );
        this.makeInvalid('titulo');
      }

      if (agrupador.descripcion && agrupador.descripcion.length > 50) {
        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.uma.validations.formError' })
        );
        this.makeInvalid('descripcion');
      }

      if (this.groupUmaForm.valid) {
        // this.firstClick = true;
        if (agrupador.id) {
          console.error('##########   Deberá actualizar: ', agrupador);
          this.subscribeToSaveResponse(this.agrupadorService.update(agrupador));
        } else {
          console.error('##########   Deberá guardar: ', agrupador);
          this.subscribeToSaveResponse(this.agrupadorService.create(agrupador));
        }
      }
    }
  }

  makeInvalid(controlName: string): void {
    this.groupUmaForm.controls[controlName].setErrors(new Error());
  }

  makeValid(controlName: string): void {
    this.groupUmaForm.controls[controlName].setErrors(null);
  }

  private mapFormDataToAgrupador(): IAgrupador {
    return {
      ...new Agrupador(),
      titulo: this.groupUmaForm.get(['titleSequenceUmas'])!.value,
      descripcion: this.groupUmaForm.get(['desciptionSequenceUmas'])!.value,
      etiquetas: this.tagsBusquedaAgrupador,
      id: 0, //  this.groupUmaForm.get(['id'])!.value,
      fechaFin: '',
      fechaInicio: '',
      modulos: []
      // tiposModulos: this.tiposModuloComponent.getModuleTypes()
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgrupador>>): void {
    result.subscribe(
      res => this.onSaveSuccess(res),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(res: any): void {
    // this.router.navigate(['/uma-groups-home', res.body.modulo.id, 'module']);
    console.error('####         POST AGRUPADOR DONE');
    console.error(res);
    this.createdGroupSequence = res.body.agrupador;
    this.createdGroupEventEmit.emit(res.body.agrupador);
    this.isSaving = false;
    // this.router.navigate(['/uma-groups-home']);
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  private onQueryError(): void {
    console.error('#### ERROR AL REALIZAR LA CONSULTA');
  }

  // chips

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tagsBusquedaAgrupador.push({ id: 0, descripcion: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(fruit: TagAgrupador): void {
    const index = this.tagsBusquedaAgrupador.indexOf(fruit);

    if (index >= 0) {
      this.tagsBusquedaAgrupador.splice(index, 1);
    }
  }

  // no pude hacer que funcionara esta cosa
  validateArrayNotEmpty(c: FormControl): any {
    if (c.value && c.value.length === 0) {
      return {
        validateArrayNotEmpty: { valid: false }
      };
    }
    return null;
  }

  // termina chips
}
