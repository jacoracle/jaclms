import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AsignaturaService } from 'app/entities/asignatura/asignatura.service';
import { GradoAcademicoService } from '../grado-academico/grado-academico.service';
import { AgrupadorService } from './agrupador-uma.service';
import { Subscription } from 'rxjs';
import { IModulo } from 'app/shared/model/modulo.model';
import { ErrorStateMatcherUtil } from 'app/home-uma-groups/error-state-matcher';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { HttpResponse } from '@angular/common/http';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'jhi-agrupador-uma-update',
  templateUrl: './agrupador-uma-update.component.html',
  styleUrls: ['./agrupador-uma-update.component.scss']
})
export class AgrupadorUmaUpdateComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  secuenciasUma: IModulo[] = new Array<IModulo>();

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
    protected agrupadorService: AgrupadorService,
    protected asignaturaService: AsignaturaService,
    protected gradoAcademicoService: GradoAcademicoService,
    protected activatedRoute: ActivatedRoute
  ) {}

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

  save(): void {
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
}
