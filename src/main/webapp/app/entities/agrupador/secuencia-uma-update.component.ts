import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaService } from 'app/entities/asignatura/asignatura.service';
import { GradoAcademicoService } from '../grado-academico/grado-academico.service';
import { AgrupadorService } from './agrupador.service';
import { Subscription, Observable } from 'rxjs';
import { IModulo } from 'app/shared/model/modulo.model';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { HttpResponse } from '@angular/common/http';
import { IAgrupador } from 'app/shared/model/agrupador.model';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { AgrupadorUmaService } from './agrupador-uma.service';
import { ModuloService } from '../modulo/modulo.service';
import { IAgrupadorUma, AgrupadorUma } from 'app/shared/model/agrupador-uma.model';

@Component({
  selector: 'jhi-secuencia-uma-update',
  templateUrl: './secuencia-uma-update.component.html',
  styleUrls: ['./secuencia-uma-update.component.scss']
})
export class SecuenciaAgrupadorUpdateComponent implements OnInit, OnDestroy {
  @Input()
  set createGroup(val: any) {
    if (val) {
      this.agrupadorObj = val;
      console.error('#### Input Agrupador Recibido');
      console.error(val);
    }
  }
  get createGroup(): any {
    return this.agrupadorObj;
  }

  agrupadorObj!: IAgrupador | null;

  account: Account | null = null;
  authSubscription?: Subscription;
  umasList: IModulo[] = new Array<IModulo>();
  tiraUmas: IModulo[] = new Array<IModulo>();

  filteredTypeOpts: any;

  groupUmaForm = this.formbuilder.group({
    sessionTopic: [],
    umaAreaKnowledge: [],
    sessionType: [],
    umaDescriptionFormCtrl: new FormControl('', [Validators.maxLength(50)]),
    umaTitleFormCtrl: new FormControl('', [Validators.required]),
    titleSequenceUmas: new FormControl('', [Validators.required]),
    desciptionSequenceUmas: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    searchTagsSequenceUmas: []
  });

  isSaving = false;
  subscription: any;

  constructor(
    private formbuilder: FormBuilder,
    private accountService: AccountService,
    protected agrupadorService: AgrupadorService,
    protected umaService: ModuloService,
    protected agrupadorUmaService: AgrupadorUmaService,
    protected asignaturaService: AsignaturaService,
    protected gradoAcademicoService: GradoAcademicoService,
    protected activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // this.tiraUmas.push({
    //   id: 0,
    //   descripcion: 'prueba',
    //   titulo: 'test'
    // });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {});

    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.umaService.query().subscribe(
          (res: HttpResponse<IModulo[]>) => {
            this.umasList = Array.from(res.body!);
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

  displayFn(mod: IModulo): string {
    return mod && mod.descripcion ? mod.descripcion : '';
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  protected onQueryError(): void {
    console.error('Aquí debería informar el erro con un alerta en pantalla. ERROR AL CARGAR LAS UMAS');
  }

  // drag drop tira de umas
  drop(event: CdkDragDrop<any[]>): void {
    const idx = event.container.data.indexOf(event.previousContainer.data[event.previousIndex]);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (idx !== -1) {
      return;
    } else {
      //  transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.addUmaToSequence(event.previousIndex, event.currentIndex);
    }
  }

  addUmaToSequence(idx: number, orden: number): void {
    const objUmaToAdd = this.umasList[idx];
    console.error(objUmaToAdd);
    console.error('#### Agrupador Creado');
    console.error(this.agrupadorObj);

    console.error('#### Agrupador Modulo to Save');
    const objToSave = this.dataToAgrupadorUma(objUmaToAdd, orden);
    console.error(objToSave);
    this.subscribeToSaveResponse(this.agrupadorUmaService.create(objToSave));
  }

  private dataToAgrupadorUma(objUmaToAdd: any, ordenn: number): IAgrupadorUma {
    return {
      ...new AgrupadorUma(),
      id: 0,
      agrupador: this.agrupadorObj!,
      modulo: objUmaToAdd,
      orden: ordenn
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgrupadorUma>>): void {
    result.subscribe(
      res => this.onSaveSuccess(res),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(res: any): void {
    // this.router.navigate(['/uma-groups-home', res.body.modulo.id, 'module']);
    console.error('#### Sequencia creada (Agrupador Modulo)');
    console.error(res);
    this.isSaving = false;
    // this.router.navigate(['/uma-groups-home']);
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
