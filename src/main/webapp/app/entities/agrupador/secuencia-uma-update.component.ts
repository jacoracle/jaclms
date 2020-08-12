import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaService } from 'app/entities/asignatura/asignatura.service';
import { GradoAcademicoService } from '../grado-academico/grado-academico.service';
import { AgrupadorService } from './agrupador-uma.service';
import { Subscription, Observable } from 'rxjs';
import { IModulo } from 'app/shared/model/modulo.model';
import { ErrorStateMatcherUtil } from 'app/home-uma-groups/error-state-matcher';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { HttpResponse } from '@angular/common/http';
import { map, startWith } from 'rxjs/operators';
import { INumeroGrado } from 'app/shared/model/numero-grado.model';
import { TagAgrupador } from 'app/shared/model/tag-agrupador.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { Agrupador, IAgrupador } from 'app/shared/model/agrupador-uma.model';
import { JhiEventWithContent, JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-secuencia-uma-update',
  templateUrl: './secuencia-uma-update.component.html',
  styleUrls: ['./secuencia-uma-update.component.scss']
})
export class SecuenciaAgrupadorUpdateComponent implements OnInit, OnDestroy {
  @ViewChild('chipList', { static: false }) chipList: MatChipList | undefined;

  account: Account | null = null;
  authSubscription?: Subscription;
  secuenciasUma: IModulo[] = new Array<IModulo>();

  // chips
  selectedGradesModule: INumeroGrado[] = [];
  actualSelectedGradesModule: number[] = [];
  numerogrados: INumeroGrado[] = [];
  selectedGradeModule: any;

  // ajuste
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

  filteredTopicOpts: any; // : Observable<IModulo[]>;
  filteredTypeOpts: any;
  filteredSubjectOpts: any;
  filteredRoleOpts: any;

  matcher = new ErrorStateMatcherUtil();

  groupUmaForm = this.formbuilder.group({
    sessionTopic: [],
    umaAreaKnowledge: [],
    sessionType: [],
    umaDescriptionFormCtrl: new FormControl('', [Validators.maxLength(50)]),
    umaTitleFormCtrl: new FormControl('', [
      Validators.required
      // Validators.email,
    ]),

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
    private eventManager: JhiEventManager,
    private router: Router
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
    this.activatedRoute.data.subscribe(({ agrupador }) => {
      //   this.updateForm(agrupador);
      console.error(agrupador);

      /*
            this.filteredTopicOpts = this.groupUmaForm.get('sessionTopic')!.valueChanges.pipe(
              startWith(''),
              map(value => (typeof value === 'string' ? value : value.descripcion)),
              map(name => (name ? this._filter(name) : this.secuenciasUma.slice()))
            );
      
            this.filteredTypeOpts = this.groupUmaForm.get('sessionType')!.valueChanges.pipe(
              startWith(''),
              map(value => (typeof value === 'string' ? value : value.descripcion)),
              map(name => (name ? this._filter(name) : this.secuenciasUma.slice()))
            );
            */

      this.filteredSubjectOpts = this.groupUmaForm.get('searchTagsSequenceUmas')!.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.descripcion)),
        map(name => (name ? this._filter_(name) : this.secuenciasUma.slice()))
      );

      this.groupUmaForm
        .get('searchTagsSequenceUmas')!
        .statusChanges.subscribe(status => (this.chipList!.errorState = status === 'INVALID'));
    });

    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.agrupadorService.query().subscribe(
          (res: HttpResponse<IModulo[]>) => {
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
      const agrupador: IAgrupador = this.createFromForm();
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

  private createFromForm(): IAgrupador {
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

  private _filter(value: string): IModulo[] {
    const filterValue = value.toLowerCase();
    return this.secuenciasUma.filter((option: IModulo) => option.descripcion!.toLowerCase().includes(filterValue));
  }

  private _filter_(value: string): IModulo[] {
    const filterValue = value.toLowerCase();
    return this.secuenciasUma.filter((option: IModulo) => option.descripcion!.toLowerCase().includes(filterValue));
  }

  displayFn(mod: IModulo): string {
    return mod && mod.descripcion ? mod.descripcion : '';
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IModulo>>): void {
    result.subscribe(
      res => this.onSaveSuccess(res),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(res: any): void {
    // this.router.navigate(['/uma-groups-home', res.body.modulo.id, 'module']);
    console.error('####         POST AGRUPADOR DONE');
    console.error(res);
    this.isSaving = false;
    // this.router.navigate(['/uma-groups-home']);
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  protected onQueryError(): void {
    console.error('Error');
  }

  addGradoToList(): void {
    this.selectedGradesModule.push(this.selectedGradeModule);
    // this.tagsBusquedaAgrupador.push('Test');
  }

  remove(grado: INumeroGrado): void {
    const index = this.selectedGradesModule.indexOf(grado);

    if (index >= 0) {
      this.selectedGradesModule.splice(index, 1);
      this.actualSelectedGradesModule.splice(index, 1);
      this.updatingGradesSelected(null, false);
    }
  }

  setSelectedGrades(evt: any): void {
    this.updatingGradesSelected(evt, true);
  }

  /**
   * update grades arrays to keep selected grades
   * @param evt null or event if change option academic grades
   * @param isChangeAcademicGrade flag to know if it's change event
   */
  updatingGradesSelected(evt: any, isChangeAcademicGrade: boolean): void {
    let objectsGradesSelectedIds: INumeroGrado[];
    let idAcademicGradeToAdd = -1;
    if (isChangeAcademicGrade) {
      //  get objects from selected ids using event value and
      objectsGradesSelectedIds = this.numerogrados.filter(el => {
        return evt.value.some((f: number) => {
          return f === el.id;
        });
      });
    } else {
      //  get objects from selected ids using general array to grade numbers selected globally
      objectsGradesSelectedIds = this.numerogrados.filter(el => {
        return this.selectedGradesModule.some((f: INumeroGrado) => {
          return f.id === el.id && f.descripcion === el.descripcion;
        });
      });
    }

    if (objectsGradesSelectedIds.length) {
      idAcademicGradeToAdd = objectsGradesSelectedIds[0].gradoAcademico!.id!;
    }

    const selectedGradesId = objectsGradesSelectedIds.map(function(obj): number {
      return obj.id!;
    });
    //  set ids selected to array property on component
    this.actualSelectedGradesModule = [...selectedGradesId];

    if (idAcademicGradeToAdd > 0) {
      const selectedGrades = this.verifyList(idAcademicGradeToAdd, objectsGradesSelectedIds);
      this.selectedGradesModule = [...selectedGrades];
      // this.editForm.get('gradoAcademico')!.disable();
    } else {
      this.selectedGradesModule = [];
      // this.editForm.get('gradoAcademico')!.enable();
    }
  }

  /**
   * Verify element to add on ful list selected to delete unmarked items from multiple select
   * @param academicGradeIdToAdd
   * @param objectsGradesSelectedIds
   */
  verifyList(academicGradeIdToAdd: number, objectsGradesSelectedIds: INumeroGrado[]): INumeroGrado[] {
    const onlySelected = this.selectedGradesModule.filter(ag => {
      return ag.gradoAcademico!.id !== academicGradeIdToAdd;
    });
    return [...onlySelected, ...objectsGradesSelectedIds];
  }

  simulacionTagsChips(tagToAdd: string): void {
    console.error('add tag ', tagToAdd);
    this.numerogrados = [];
    this.gradoAcademicoService.find(1).subscribe(res => {
      if (res.body && res.body.numeroGrados) {
        this.numerogrados = res.body.numeroGrados;
        // this.updatingGradesSelected(null, false);
      }
    });
    this.selectedGradesModule.push(this.numerogrados[0]);
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
