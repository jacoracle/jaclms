import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AsignaturaService } from 'app/entities/asignatura/asignatura.service';
import { GradoAcademicoService } from '../grado-academico/grado-academico.service';
// import { AgrupadorService } from './agrupador-uma.service';
import { Subscription } from 'rxjs';
import { IModulo } from 'app/shared/model/modulo.model';
import { ErrorStateMatcherUtil } from 'app/home-uma-groups/error-state-matcher';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { HttpResponse } from '@angular/common/http';
import { map, startWith } from 'rxjs/operators';
import { INumeroGrado } from 'app/shared/model/numero-grado.model';
import { ModuloService } from '../modulo/modulo.service';

@Component({
  selector: 'jhi-agrupador-uma-update',
  templateUrl: './agrupador-uma-update.component.html',
  styleUrls: ['./agrupador-uma-update.component.scss']
})
export class AgrupadorUmaUpdateComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  secuenciasUma: IModulo[] = new Array<IModulo>();

  // chips
  selectedGradesModule: INumeroGrado[] = [];
  actualSelectedGradesModule: number[] = [];
  numerogrados: INumeroGrado[] = [];
  selectedGradeModule: any;
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
    ])
  });

  gradosCtrl = new FormControl();
  isSaving = false;
  subscription: any;

  constructor(
    private formbuilder: FormBuilder,
    private accountService: AccountService,
    protected agrupadorService: ModuloService,
    protected asignaturaService: AsignaturaService,
    protected gradoAcademicoService: GradoAcademicoService,
    protected activatedRoute: ActivatedRoute
  ) {
    this.firstFormGroup = this.formbuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formbuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agrupador }) => {
      //   this.updateForm(agrupador);
      console.error(agrupador);

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

      this.filteredSubjectOpts = this.groupUmaForm.get('umaAreaKnowledge')!.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.descripcion)),
        map(name => (name ? this._filter_(name) : this.secuenciasUma.slice()))
      );
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
    this.isCompleted = true;
    this.isSaving = true;
    console.error('Deberá guardar');
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

  //   private createFromForm(): IModulo {
  //     return {
  //       ...new Modulo(),
  //       id: this.editForm.get(['id'])!.value,
  //       titulo: this.editForm.get(['titulo'])!.value,
  //       tiposModulos: this.tiposModuloComponent.getModuleTypes(),
  //       descripcion: this.editForm.get(['descripcion'])!.value,
  //       fechaCreacionSys: this.editForm.get(['fechaCreacionSys'])!.value,
  //       asignatura: this.editForm.get(['asignatura'])!.value,
  //       temas: this.temasModuloComponent.getTopics(),
  //       rolesColaboradores: this.colaboradoresComponent.getColaboradores(),
  //       numeroGrados: this.selectedGradesModule
  //     };
  //   }

  protected onQueryError(): void {
    console.error('Error');
  }

  addGradoToList(): void {
    this.selectedGradesModule.push(this.selectedGradeModule);
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
}
