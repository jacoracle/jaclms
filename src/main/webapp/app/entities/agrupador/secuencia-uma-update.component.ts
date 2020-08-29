import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaService } from 'app/entities/asignatura/asignatura.service';
import { GradoAcademicoService } from '../grado-academico/grado-academico.service';
import { AgrupadorService } from './agrupador.service';
import { Subscription, Observable, Subject } from 'rxjs';
import { IModulo } from 'app/shared/model/modulo.model';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { HttpResponse } from '@angular/common/http';
import { IAgrupador } from 'app/shared/model/agrupador.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AgrupadorUmaService } from './agrupador-uma.service';
import { ModuloService } from '../modulo/modulo.service';
import { IAgrupadorUma, AgrupadorUma } from 'app/shared/model/agrupador-uma.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { UmaPreviewModalService } from 'app/services/uma-preview-modal.service';
import { takeUntil, startWith, map } from 'rxjs/operators';

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
  subscription!: Subscription;
  private ngUnsubscribeSubject = new Subject();
  umasList: IModulo[] = new Array<IModulo>();
  originalUmasList: IModulo[] = new Array<IModulo>();
  tiraUmas: IAgrupadorUma[] = new Array<IAgrupadorUma>();
  isReorder: boolean;

  filteredTypeOpts: any;
  filteredUmas: any;

  groupUmaForm = this.formbuilder.group({
    umaGral: [], // new FormControl('', [Validators.maxLength(30)]),
    sessionTopicFormCtrl: new FormControl('', [Validators.maxLength(30)]),
    umaAreaKnowledgeFormCtrl: new FormControl('', [Validators.maxLength(30)]),
    academicGradeFormCtrl: new FormControl('', [Validators.maxLength(30)]),
    umaDescriptionFormCtrl: new FormControl('', [Validators.maxLength(30)]),
    umaTitleFormCtrl: new FormControl('', [Validators.maxLength(30)])
  });

  isSaving = false;
  idSequenceToLoad!: number;

  constructor(
    private formbuilder: FormBuilder,
    private accountService: AccountService,
    protected agrupadorService: AgrupadorService,
    protected umaService: ModuloService,
    protected agrupadorUmaService: AgrupadorUmaService,
    protected asignaturaService: AsignaturaService,
    protected gradoAcademicoService: GradoAcademicoService,
    private umaPreviewModal: UmaPreviewModalService,
    protected activatedRoute: ActivatedRoute,
    private eventManager: JhiEventManager,
    // private route: ActivatedRoute,
    private router: Router
  ) {
    this.isReorder = false;
    this.idSequenceToLoad = this.activatedRoute.snapshot.paramMap.get('id') as any;
    // console.error('#### Group UMA configuration ID Grupo recibido: ', this.idSequenceToLoad);

    this.filteredUmas = this.groupUmaForm
      .get('umaGral')!
      .valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.descripcion)),
        map(title => (title ? this._filterUmasByTitle(title) : this.umasList.slice()))
      )
      .subscribe(umas => {
        this.umasList = [...umas];
      });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {
      // console.error('#### URL Data: ', data);
    });

    this.subscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.umaService.query().subscribe(
          (res: HttpResponse<IModulo[]>) => {
            this.umasList = Array.from(res.body!);
            this.originalUmasList = [...this.umasList];
          },
          () => this.onQueryError()
        );
        if (this.idSequenceToLoad) {
          this.agrupadorService
            .find(this.idSequenceToLoad)
            .pipe(takeUntil(this.ngUnsubscribeSubject))
            .subscribe(res => {
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
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.ngUnsubscribeSubject.next();
      this.ngUnsubscribeSubject.complete();
    }
  }

  private _filterUmasByTitle(value: string): IModulo[] {
    const filterValue = value.toLowerCase();
    return this.umasList.filter((option: IModulo) => option.titulo!.toLowerCase().includes(filterValue));
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
  }

  /**
   * Execute PUT request to update order uma list
   */
  updateSequenceUmaOrder(): void {
    this.subscription = this.agrupadorUmaService.update(this.tiraUmas).subscribe(
      res => {
        if (res.body) {
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
    const objToSave: IAgrupadorUma = this.dataToAgrupadorUma(objUmaToAdd, orden);
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
    this.tiraUmas.splice(this.tiraUmas.indexOf(item), 1);

    this.subscription = this.agrupadorUmaService.delete(item.id!).subscribe(() => {
      this.updateUmasOrder();
      this.updateSequenceUmaOrder();
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgrupadorUma>>): void {
    this.subscription = result.subscribe(
      res => this.onSaveSuccess(res.body),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(res: any): void {
    // this.router.navigate(['/uma-groups-home', res.body.modulo.id, 'module']);
    this.isSaving = false;
    if (!this.isReorder) {
      this.tiraUmas.push(res);
    }
    // this.router.navigate(['/uma-groups-home']);
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  openPreview(secuence: any): void {
    this.umaPreviewModal.open(secuence);
  }

  resetUmas(): void {
    this.umasList = [...this.originalUmasList];
  }

  executeSearch(): void {
    this.subscription = this.umaService
      .search(this.mapFormToSearchParams())
      .pipe(takeUntil(this.ngUnsubscribeSubject))
      .subscribe(res => {
        console.error('#### Response búsqueda: ');
        console.error(res);
        this.umasList = [...res.body!];
        if (this.umasList.length === 0) {
          this.eventManager.broadcast(
            new JhiEventWithContent('constructorApp.validationError', {
              message: 'constructorApp.uma.home.notFound',
              type: 'success'
            })
          );
        }
      });
  }

  mapFormToSearchParams(): any {
    return {
      asignatura: this.groupUmaForm.get('umaAreaKnowledgeFormCtrl')!.value,
      descripcion: this.groupUmaForm.get('umaDescriptionFormCtrl')!.value,
      numeroGrados: this.groupUmaForm.get('academicGradeFormCtrl')!.value,
      temas: this.groupUmaForm.get('sessionTopicFormCtrl')!.value,
      titulo: this.groupUmaForm.get('umaTitleFormCtrl')!.value
    };
  }
}
