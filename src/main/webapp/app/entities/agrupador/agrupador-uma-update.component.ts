import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcherUtil } from 'app/home-uma-groups/error-state-matcher';
import { Agrupador, IAgrupador } from 'app/shared/model/agrupador.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TagAgrupador } from 'app/shared/model/tag-agrupador.model';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { Subscription, Observable, Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { JhiEventWithContent, JhiEventManager } from 'ng-jhipster';
import { AgrupadorService } from 'app/entities/agrupador/agrupador.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { takeUntil } from 'rxjs/operators';
import { IWrapperModel } from 'app/shared/model/wrapper.model';
import { AgrupadorConfigService } from '../../services/agrupador-config.service';
import { IAgrupadorUma } from '../../shared/model/agrupador-uma.model';

@Component({
  selector: 'jhi-agrupador-uma-update',
  templateUrl: './agrupador-uma-update.component.html',
  styleUrls: ['./agrupador-uma-update.component.scss']
})
export class AgrupadorUmaUpdateComponent implements OnInit, OnDestroy {
  @Input() groupId!: number;
  // @Output() createdGroupEventEmit: EventEmitter<IAgrupador> = new EventEmitter<IAgrupador>();
  @Output() createdGroupEventEmit: EventEmitter<IWrapperModel<boolean, IAgrupador>> = new EventEmitter<
    IWrapperModel<boolean, IAgrupador>
  >();
  @Output() formCreateEvent: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @ViewChild('chipList', { static: false }) chipList: MatChipList | undefined;

  // session
  account: Account | null = null;

  isSaving = false;
  subscription!: Subscription;
  private ngUnsubscribeSubject = new Subject();
  createdGroupSequence!: IAgrupador;
  // chips
  tagsBusquedaAgrupador: TagAgrupador[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // termina chips

  isSequenceValid = false;
  umasListGroup: IAgrupadorUma[] = [];

  // FORMULARIO
  matcher = new ErrorStateMatcherUtil();
  groupUmaForm = this.formbuilder.group({
    titleSequenceUmas: new FormControl('', [
      Validators.required
      // Validators.email,
    ]),
    desciptionSequenceUmas: new FormControl('', [Validators.maxLength(50)]),
    durationSequence: new FormControl([]),
    searchTagsSequenceUmas: [],
    sendRegisterForm: new FormControl('')
  });
  // TERMINA FORMULARIO

  secuenciasUma: IAgrupador[] = new Array<IAgrupador>();
  durationValuesList: number[] = [0, 15, 30, 45, 60];

  constructor(
    private agrupadorConfigService: AgrupadorConfigService,
    private accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private eventManager: JhiEventManager,
    protected agrupadorService: AgrupadorService,
    private router: Router
  ) {
    this.tagsBusquedaAgrupador = [];
    // console.error('#### agrupador-uma-update Agrupador recibido con ID: ', this.groupId);
    this.groupUmaForm.statusChanges.subscribe(() => {
      // console.error('#### Estado del formulario de registro de agrupador: ', val);
      // this.formCreateEvent.emit(this.groupUmaForm);//  lo comente porque ya no se usa el stepper
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {
      //   this.updateForm(agrupador);
    });

    this.subscription = this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.ngUnsubscribeSubject))
      .subscribe(account => {
        this.account = account;
        if (this.account && this.groupId) {
          this.loadDataAgrupador();
        }
      });

    this.subscription = this.agrupadorConfigService
      .getValidationUmaGroups()
      .pipe(takeUntil(this.ngUnsubscribeSubject))
      .subscribe(res => {
        this.isSequenceValid = res;
      });

    this.subscription = this.agrupadorConfigService
      .getUmasAddedEvent()
      .pipe(takeUntil(this.ngUnsubscribeSubject))
      .subscribe(res => {
        // console.error('Add UMA to Agrupador: ', res);
        this.umasListGroup = [...res];
      });

    // console.error('#### Consultar datos de Agrupador: ', this.groupId);
    // este subscribe es para la validación que no logre hacer funcionar con la funcion al final de este ts
    this.groupUmaForm.get('searchTagsSequenceUmas')!.statusChanges.subscribe(status => (this.chipList!.errorState = status === 'INVALID'));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription.unsubscribe();
      this.ngUnsubscribeSubject.next();
      this.ngUnsubscribeSubject.complete();
    }
  }

  loadDataAgrupador(): void {
    this.subscription = this.agrupadorService
      .find(this.groupId)
      .pipe(takeUntil(this.ngUnsubscribeSubject))
      .subscribe(res => {
        this.mapDataToForm(res.body as IAgrupador);
      });
  }

  mapDataToForm(data: IAgrupador): void {
    if (!data) {
      return;
    }
    this.groupUmaForm.patchValue({
      titleSequenceUmas: data.titulo,
      desciptionSequenceUmas: data.descripcion,
      searchTagsSequenceUmas: [],
      durationSequence: data.duracion,
      sendRegisterForm: true
    });
    this.tagsBusquedaAgrupador = [...data.etiquetas!];
  }

  saveSequenceGroup(): void {
    // if (this.groupUmaForm.valid) {
    // this.isCompleted = true;
    this.isSaving = true;
    const agrupador: IAgrupador = this.mapFormDataToAgrupador();
    // console.error('Deberá guardar');
    // console.error(agrupador);

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

    if (!this.umasListGroup.length) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', {
          message: 'constructorApp.agrupador.validations.formErrorSequence',
          type: 'danger'
        })
      );
      return;
    }

    if (this.groupUmaForm.valid) {
      // this.firstClick = true;
      if (agrupador.id) {
        // console.error('##########   Deberá actualizar: ', agrupador);
        this.subscribeToUpdateResponse(this.agrupadorService.update(agrupador));
      } else {
        // console.error('##########   Deberá guardar: ', agrupador);
        this.subscribeToSaveResponse(this.agrupadorService.create(agrupador));
      }
    }
    /*
    } else {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.uma.validations.formError' })
      );
    }
    */
  }

  revertSequenceGroup(groupId: number): void {
    if (groupId) {
      this.subscription = this.agrupadorService
        .delete(groupId)
        .pipe(takeUntil(this.ngUnsubscribeSubject))
        .subscribe(() => {
          // console.error('#### agrupador-uma-update - 2');
          console.error('#### Agrupador eliminado con ID: ', groupId);
        });
    }
    // console.error('#### Termina eliminación, regresa a group-uma-configuration');
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
      id: this.getGroupIdFromInputReceived(), //  0, //  this.groupUmaForm.get(['id'])!.value,
      duracion: this.groupUmaForm.get('durationSequence')!.value,
      fechaFin: '',
      fechaInicio: '',
      modulos: this.umasListGroup.map((uma: IAgrupadorUma) => {
        return { modulo: { id: uma.modulo!.id }, orden: uma.orden };
      }) // []
      // tiposModulos: this.tiposModuloComponent.getModuleTypes()
    };
  }

  getGroupIdFromInputReceived(): number {
    return this.groupId ? this.groupId : 0;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgrupador>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  private subscribeToUpdateResponse(result: Observable<HttpResponse<IAgrupador>>): void {
    result.subscribe(
      res => {
        this.createdGroupSequence = res.body!;
        this.makeValid('sendRegisterForm');
        this.createdGroupEventEmit.emit({ param1: true, param2: res.body! });
        this.isSaving = false;
      },
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    // console.error(res.body);
    this.isSaving = false;
    this.router.navigate(['/uma-groups-home']);
  }

  protected onSaveError(): void {
    this.isSaving = false;
    this.makeInvalid('sendRegisterForm');
    this.createdGroupEventEmit.emit(undefined);
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
      // this.tagsBusquedaAgrupador.push({ id: 0, descripcion: value.trim() });
      this.tagsBusquedaAgrupador.push({ id: undefined, descripcion: value.trim() });
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
