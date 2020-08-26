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
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AgrupadorUmaService } from './agrupador-uma.service';
import { ModuloService } from '../modulo/modulo.service';
import { IAgrupadorUma, AgrupadorUma } from 'app/shared/model/agrupador-uma.model';
// import { IOrdenUMA } from 'app/shared/model/uma-agrupador-orden.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

@Component({
  selector: 'jhi-secuencia-uma-update',
  templateUrl: './secuencia-uma-update.component.html',
  styleUrls: ['./secuencia-uma-update.component.scss']
})
export class SecuenciaAgrupadorUpdateComponent implements OnInit, OnDestroy {
  @Input()
  set createdGroup(val: any) {
    if (val) {
      this.agrupadorObj = val;
    }
  }
  get createdGroup(): any {
    return this.agrupadorObj;
  }

  agrupadorObj!: IAgrupador | null;

  account: Account | null = null;
  authSubscription?: Subscription;
  umasList: IModulo[] = new Array<IModulo>();
  // tiraUmas: IModulo[] = new Array<IModulo>();
  tiraUmas: IAgrupadorUma[] = new Array<IAgrupadorUma>();
  isReorder: boolean;

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
  idSequenceToLoad!: number;

  constructor(
    private formbuilder: FormBuilder,
    private accountService: AccountService,
    protected agrupadorService: AgrupadorService,
    protected umaService: ModuloService,
    protected agrupadorUmaService: AgrupadorUmaService,
    protected asignaturaService: AsignaturaService,
    protected gradoAcademicoService: GradoAcademicoService,
    protected activatedRoute: ActivatedRoute,
    private eventManager: JhiEventManager,
    // private route: ActivatedRoute,
    private router: Router
  ) {
    this.isReorder = false;
    this.idSequenceToLoad = this.activatedRoute.snapshot.paramMap.get('id') as any;
    // console.error('#### Group UMA configuration ID Grupo recibido: ', this.idSequenceToLoad);
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {
      // console.error('#### URL Data: ', data);
    });

    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.umaService.query().subscribe(
          (res: HttpResponse<IModulo[]>) => {
            this.umasList = Array.from(res.body!);
          },
          () => this.onQueryError()
        );
        if (this.idSequenceToLoad) {
          this.agrupadorService.find(this.idSequenceToLoad).subscribe(res => {
            if (res.body) {
              // console.error('#### Response Query Agrupador con ID: ', this.idSequenceToLoad);
              // console.error(res.body);
              this.agrupadorObj = res.body;
              this.tiraUmas = [...res.body.modulos!];
              // this.updatingGradesSelected(null, false);
            }
          });
        }
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
    console.error('Aquí debería informar el error con un alerta en pantalla. ERROR AL CARGAR LAS UMAS');
  }

  // drag drop tira de umas
  drop(event: CdkDragDrop<any[]>): void {
    const objExiste = event.container.data.find((au: IAgrupadorUma) => {
      return au.modulo!.id === event.previousContainer.data[event.previousIndex].id;
    });

    if (objExiste) {
      return;
    } else if (event.previousContainer === event.container) {
      this.isReorder = true;
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateUmasOrder();
      this.updateSequenceUmaOrder();
    } else {
      this.isReorder = false;
      //  transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      // copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.addUmaToSequence(event.previousIndex, event.currentIndex);
    }

    /*
    const idx = event.container.data.indexOf(event.previousContainer.data[event.previousIndex]);
    if (event.previousContainer === event.container) {
      this.isReorder = true;
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // this.updateUmasOrder();
      // this.updateSequenceUmaOrder();

    } else if (idx !== -1) {
      return;
    } else {
      this.isReorder = false;
      //  transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      // copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.addUmaToSequence(event.previousIndex, event.currentIndex);
    }
    */
  }

  /**
   * Execute PUT request to update order uma list
   */
  updateSequenceUmaOrder(): void {
    this.agrupadorUmaService.update(this.tiraUmas).subscribe(
      res => {
        if (res.body) {
          // console.error('#### Response PUT umas');
          // console.error(res.body);
          this.tiraUmas = res.body.agrupador!.modulos!;
        }
      },
      () => {
        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.tiraUpdate', {
            message: 'constructorApp.tiraUpdate.error',
            type: 'danger'
          })
        );
      }
    );
  }

  updateUmasOrder(): void {
    for (let i = 0; i < this.tiraUmas.length; i++) {
      this.tiraUmas[i].orden = i;
    }
  }

  addUmaToSequence(idx: number, orden: number): void {
    const objUmaToAdd = this.umasList[idx];
    // console.error(objUmaToAdd);
    // console.error('#### Agrupador Creado');
    // console.error(this.agrupadorObj);

    // console.error('#### Agrupador Modulo to Save');
    const objToSave: IAgrupadorUma = this.dataToAgrupadorUma(objUmaToAdd, orden);
    // console.error(objToSave);
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

  deleteUmaFromSequence(item: IAgrupadorUma): void {
    // console.error('#### Elemento a Eliminar de la tira de UMAs');
    // console.error(item);
    this.tiraUmas.splice(this.tiraUmas.indexOf(item), 1);

    this.agrupadorUmaService.delete(item.id!).subscribe(() => {
      this.updateUmasOrder();
      this.updateSequenceUmaOrder();
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgrupadorUma>>): void {
    result.subscribe(
      res => this.onSaveSuccess(res.body),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(res: any): void {
    // this.router.navigate(['/uma-groups-home', res.body.modulo.id, 'module']);
    // console.error('#### Sequencia creada (Agrupador Modulo)');
    // console.error(res);
    this.isSaving = false;
    if (!this.isReorder) {
      this.tiraUmas.push(res);
    }
    // this.tiraUmas
    // this.router.navigate(['/uma-groups-home']);
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
