import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaService } from 'app/entities/asignatura/asignatura.service';
import { GradoAcademicoService } from '../grado-academico/grado-academico.service';
import { AgrupadorService } from './agrupador.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { IModulo } from 'app/shared/model/modulo.model';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { HttpResponse } from '@angular/common/http';
import { IAgrupador } from 'app/shared/model/agrupador.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AgrupadorUmaService } from './agrupador-uma.service';
import { ModuloService } from '../modulo/modulo.service';
import { AgrupadorUma, IAgrupadorUma } from 'app/shared/model/agrupador-uma.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { UmaPreviewModalService } from 'app/services/uma-preview-modal.service';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { AgrupadorConfigService } from 'app/services/agrupador-config.service';

@Component({
  selector: 'jhi-secuencia-uma-update',
  templateUrl: './secuencia-uma-update.component.html',
  styleUrls: ['./secuencia-uma-update.component.scss']
})
export class SecuenciaAgrupadorUpdateComponent implements OnInit, OnDestroy {
  @Input()
  agrupadorObj!: IAgrupador | null;

  @Output()
  step = new EventEmitter();

  account: Account | null = null;
  subscription!: Subscription;
  private ngUnsubscribeSubject = new Subject();
  umasList: IModulo[] = new Array<IModulo>();
  originalUmasList: IModulo[] = new Array<IModulo>();
  tiraUmas: IAgrupadorUma[] = new Array<IAgrupadorUma>();
  isReorder: boolean;
  isSearching: boolean;

  filteredUmas: any;
  groupUmaForm!: FormGroup;
  isSaving = false;
  idSequenceToLoad!: number;

  constructor(
    private formbuilder: FormBuilder,
    private accountService: AccountService,
    private agrupadorConfigService: AgrupadorConfigService,
    protected agrupadorService: AgrupadorService,
    protected umaService: ModuloService,
    protected agrupadorUmaService: AgrupadorUmaService,
    protected asignaturaService: AsignaturaService,
    protected gradoAcademicoService: GradoAcademicoService,
    private umaPreviewModal: UmaPreviewModalService,
    protected activatedRoute: ActivatedRoute,
    private eventManager: JhiEventManager,
    private router: Router,
    private moduleService: ModuloService
  ) {
    this.isSearching = false;
    this.isReorder = false;
    this.initForm();
    this.idSequenceToLoad = this.activatedRoute.snapshot.paramMap.get('id') as any;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {
      // console.error('#### URL Data: ', data);
    });

    this.filteredUmas = this.groupUmaForm
      .get('umaGral')!
      .valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.descripcion)),
        map(title => (title ? this._filterUmasByTitle(title) : this.umasList.slice()))
      )
      .subscribe((umas: IModulo[]) => {
        this.isSearching = true;
        this.umasList = [...this.checkListUmas(umas)];
      });

    this.subscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.umaService.query().subscribe(
          (res: HttpResponse<IModulo[]>) => {
            this.umasList = Array.from(res.body!);
            this.originalUmasList = this.umasList;
          },
          () => this.onQueryError()
        );
        if (this.idSequenceToLoad) {
          this.agrupadorService
            .find(this.idSequenceToLoad)
            .pipe(takeUntil(this.ngUnsubscribeSubject))
            .subscribe(res => {
              if (res.body) {
                this.agrupadorObj = res.body;
                this.tiraUmas = [...res.body.modulos!];
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

  initForm(): void {
    this.groupUmaForm = this.formbuilder.group({
      umaGral: new FormControl('', [Validators.maxLength(30)]),
      sessionTopicFormCtrl: new FormControl('', [Validators.maxLength(30)]),
      umaAreaKnowledgeFormCtrl: new FormControl('', [Validators.maxLength(30)]),
      academicGradeFormCtrl: new FormControl('', [Validators.maxLength(30)]),
      umaDescriptionFormCtrl: new FormControl('', [Validators.maxLength(30)]),
      umaTitleFormCtrl: new FormControl('', [Validators.maxLength(30)])
    });
  }

  private checkListUmas(umas: IModulo[]): IModulo[] {
    if (this.groupUmaForm.get('umaGral')!.value !== '' && umas.length > 0) {
      return umas;
    } else if (this.groupUmaForm.get('umaGral')!.value === '') {
      return this.originalUmasList;
    } else {
      return [];
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
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', {
        message: 'constructorApp.agrupador.validations.error',
        type: 'success'
      })
    );
  }

  // drag drop tira de umas
  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
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
          this.tiraUmas = [...res.body[0].modulos!];
        }
        // this.agrupadorConfigService.setValidationUmaGroups(this.tiraUmas.length > 0);
        this.agrupadorConfigService.setUmasAddedEvent(this.tiraUmas);

        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.validationError', {
            message: 'constructorApp.agrupador.umas.updateOrder',
            type: 'success'
          })
        );
      },
      () => {
        this.agrupadorConfigService.setUmasAddedEvent(this.tiraUmas);
        // this.agrupadorConfigService.setValidationUmaGroups(this.tiraUmas.length > 0);
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
    // eslint-disable-next-line no-console
    console.log(objToSave);
    this.tiraUmas.push(objToSave);
    this.agrupadorConfigService.setUmasAddedEvent(this.tiraUmas);
    if (this.idSequenceToLoad) {
      this.updateUmasOrder();
      // this.updateSequenceUmaOrder();
      this.subscribeToSaveResponse(this.agrupadorUmaService.create(objToSave));
    }
  }

  private dataToAgrupadorUma(objUmaToAdd: IModulo, ordenn: number): IAgrupadorUma {
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
    if (this.idSequenceToLoad) {
      this.subscription = this.agrupadorUmaService.delete(item.id!).subscribe(() => {
        this.updateUmasOrder();
        this.updateSequenceUmaOrder();
      });
    } else {
      this.updateUmasOrder();
      this.agrupadorConfigService.setUmasAddedEvent(this.tiraUmas);
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgrupadorUma>>): void {
    this.subscription = result.subscribe(
      () => this.onSaveSuccess(), // res
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    // this.router.navigate(['/uma-groups-home', res.body.modulo.id, 'module']);
    this.isSaving = false;
    this.agrupadorConfigService.setValidationUmaGroups(this.tiraUmas.length > 0);
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', {
        message: 'constructorApp.agrupador.updated',
        type: 'success'
      })
    );
    // this.router.navigate(['/uma-groups-home']);
  }

  protected onSaveError(): void {
    this.agrupadorConfigService.setValidationUmaGroups(this.tiraUmas.length > 0);
    this.isSaving = false;
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', {
        message: 'constructorApp.agrupador.validations.error',
        type: 'danger'
      })
    );
  }

  openPreview(secuence: any): void {
    this.umaPreviewModal.open(secuence);
  }

  resetUmas(): void {
    this.groupUmaForm.reset();
    this.initForm();
    this.umasList = [...this.originalUmasList];
  }

  executeSearch(): void {
    this.subscription = this.umaService
      .search(this.mapFormToSearchParams())
      .pipe(takeUntil(this.ngUnsubscribeSubject))
      .subscribe(res => {
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

  getSizeSecuenciaUmas(): number {
    return this.tiraUmas.length;
  }

  // drag drop umas
  dropOrder(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      this.isReorder = true;
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateUmasOrder();
      if (this.idSequenceToLoad) {
        this.updateSequenceUmaOrder();
      }
    } else {
      this.isReorder = false;
      this.addUmaToSequence(event.previousIndex, event.currentIndex);
    }
  }

  previusStep(evt: any): void {
    this.step.emit(evt);
  }

  editModule(idModule: number): void {
    this.router.navigate(['/uma-configuration', idModule, 'group']).then(r => {
      return r;
    });
  }

  deleteModule(id: number, $event: any): void {
    $event.stopPropagation();
    this.moduleService.delete(id).subscribe(() => {
      this.umasList.splice(this.findElementById(this.umasList, id), 1);
    });
  }

  findElementById(objectArray: any, id: number): number {
    let foundIndex = -1;
    objectArray.forEach((value: any, index: number) => {
      if (value.id === id) {
        foundIndex = index;
      }
    });
    return foundIndex;
  }
}
