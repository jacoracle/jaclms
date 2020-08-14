import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AsignaturaService } from 'app/entities/asignatura/asignatura.service';
import { GradoAcademicoService } from '../grado-academico/grado-academico.service';
import { AgrupadorService } from './agrupador.service';
import { Subscription, Observable } from 'rxjs';
import { ErrorStateMatcherUtil } from 'app/home-uma-groups/error-state-matcher';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { HttpResponse } from '@angular/common/http';
import { TagAgrupador } from 'app/shared/model/tag-agrupador.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { Agrupador, IAgrupador } from 'app/shared/model/agrupador.model';
import { JhiEventWithContent, JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-agrupador-uma-update',
  templateUrl: './agrupador-uma-update.component.html',
  styleUrls: ['./agrupador-uma-update.component.scss']
})
export class AgrupadorUmaUpdateComponent implements OnInit, OnDestroy {
  @ViewChild('chipList', { static: false }) chipList: MatChipList | undefined;

  createdGroupSequence!: IAgrupador;

  account: Account | null = null;
  authSubscription?: Subscription;
  secuenciasUma: IAgrupador[] = new Array<IAgrupador>();

  // chips
  tagsBusquedaAgrupador: TagAgrupador[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // termina chips

  // stepper
  isCompleted = false;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  // termina stepper

  matcher = new ErrorStateMatcherUtil();

  groupUmaForm = this.formbuilder.group({
    titleSequenceUmas: new FormControl('', [
      Validators.required
      // Validators.email,
    ]),
    desciptionSequenceUmas: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    searchTagsSequenceUmas: [] //  this.formbuilder.array(this.tagsBusquedaAgrupador, this.validateArrayNotEmpty)
  });

  gradosCtrl = new FormControl();
  isSaving = false;
  subscription: any;

  constructor(
    private formbuilder: FormBuilder,
    private accountService: AccountService,
    protected agrupadorService: AgrupadorService,
    protected asignaturaService: AsignaturaService,
    protected gradoAcademicoService: GradoAcademicoService,
    protected activatedRoute: ActivatedRoute,
    private eventManager: JhiEventManager
  ) {
    this.firstFormGroup = this.formbuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formbuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.tagsBusquedaAgrupador = [];
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {
      //   this.updateForm(agrupador);

      // este subscribe es para la validación que no logre hacer funcionar con la funcion al final de este ts
      this.groupUmaForm
        .get('searchTagsSequenceUmas')!
        .statusChanges.subscribe(status => (this.chipList!.errorState = status === 'INVALID'));
    });

    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.agrupadorService.query().subscribe(
          (res: HttpResponse<IAgrupador[]>) => {
            this.secuenciasUma = Array.from(res.body!);
          },
          () => this.onQueryError()
        );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  saveSequenceGroup(): void {
    if (this.groupUmaForm.valid) {
      this.isCompleted = true;
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

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
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
    this.isSaving = false;
    // this.router.navigate(['/uma-groups-home']);
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  protected onQueryError(): void {
    console.error('Error');
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
