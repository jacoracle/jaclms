import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { ModuloService } from 'app/entities/modulo/modulo.service';
import { IModulo } from 'app/shared/model/modulo.model';

import { HttpResponse } from '@angular/common/http';
import { SafeUrl } from '@angular/platform-browser';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { takeUntil, startWith, map } from 'rxjs/operators';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

@Component({
  selector: 'jhi-home-module',
  templateUrl: './home-module.component.html',
  styleUrls: ['home-module.component.scss']
})
export class HomeModuleComponent implements OnInit, OnDestroy, AfterContentInit {
  account: Account | null = null;
  subscription!: Subscription;
  private ngUnsubscribeSubject = new Subject();
  modulos: IModulo[] = new Array<IModulo>();
  originalUmasList: IModulo[] = new Array<IModulo>();
  defaultModuleUrl: SafeUrl = './../../../../content/images/module.png';
  showLoader = false;
  isSearching!: boolean;
  filteredUmas: any;
  umaForm!: FormGroup;

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private formbuilder: FormBuilder,
    private moduleService: ModuloService,
    private umaSeachService: ModuloService,
    private eventManager: JhiEventManager
  ) {
    this.isSearching = false;
    this.initForm();
  }

  ngOnInit(): void {
    this.showLoader = true;

    this.umaForm
      .get('titleSearchGral')!
      .valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.descripcion)),
        map(title => (title ? this._filterUmasByTitle(title) : this.modulos.slice()))
      )
      .subscribe((seqs: IModulo[]) => {
        this.isSearching = true;
        this.modulos = [...this.checkListUmas(seqs)];
      });

    this.subscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.moduleService.query().subscribe(
          (res: HttpResponse<IModulo[]>) => {
            this.modulos = res.body!;
            this.originalUmasList = this.modulos;
            this.showLoader = false;
          },
          () => this.onQueryError()
        );
      }
    });
  }

  private checkListUmas(umas: IModulo[]): IModulo[] {
    if (this.umaForm.get('titleSearchGral')!.value !== '' && umas.length > 0) {
      return umas;
    } else if (this.umaForm.get('titleSearchGral')!.value === '') {
      return this.originalUmasList;
    } else {
      return [];
    }
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.ngUnsubscribeSubject.next();
      this.ngUnsubscribeSubject.complete();
    }
  }

  ngAfterContentInit(): void {}

  protected onQueryError(): void {
    console.error('Error');
  }

  initForm(): void {
    this.umaForm = this.formbuilder.group({
      titleSearchGral: new FormControl('', [Validators.maxLength(30)]),
      sessionTopicFormCtrl: new FormControl('', [Validators.maxLength(30)]),
      umaAreaKnowledgeFormCtrl: new FormControl('', [Validators.maxLength(30)]),
      academicGradeFormCtrl: new FormControl('', [Validators.maxLength(30)]),
      umaDescriptionFormCtrl: new FormControl('', [Validators.maxLength(30)]),
      umaTitleFormCtrl: new FormControl('', [Validators.maxLength(30)])
    });
  }

  deleteModule(id: number, $event: any): void {
    $event.stopPropagation();
    this.moduleService.delete(id).subscribe(() => {
      this.modulos.splice(this.findElementById(this.modulos, id), 1);
      /*
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', {
          message: 'constructorApp.agrupador.deleted',
          type: 'success'
        })
      );
      */
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

  displayFn(mod: IModulo): string {
    return mod && mod.descripcion ? mod.descripcion : '';
  }

  private _filterUmasByTitle(value: string): IModulo[] {
    const filterValue = value.toLowerCase();
    return this.modulos.filter((option: IModulo) => option.titulo!.toLowerCase().includes(filterValue));
  }

  resetUmas(): void {
    this.modulos = [...this.originalUmasList];
    this.umaForm.reset();
    this.initForm();
  }

  executeSearch(): void {
    this.isSearching = true;
    this.subscription = this.umaSeachService
      .search(this.mapFormToSearchParams())
      .pipe(takeUntil(this.ngUnsubscribeSubject))
      .subscribe(res => {
        console.error('#### Response búsqueda: ');
        console.error(res.body);
        this.modulos = [...res.body!];
        if (this.modulos.length === 0) {
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
      asignatura: this.umaForm.get('umaAreaKnowledgeFormCtrl')!.value,
      descripcion: this.umaForm.get('umaDescriptionFormCtrl')!.value,
      numeroGrados: this.umaForm.get('academicGradeFormCtrl')!.value,
      temas: this.umaForm.get('sessionTopicFormCtrl')!.value,
      titulo: this.umaForm.get('umaTitleFormCtrl')!.value
    };
  }
}
