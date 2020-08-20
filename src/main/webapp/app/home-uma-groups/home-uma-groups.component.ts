import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { HttpResponse } from '@angular/common/http';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { ErrorStateMatcherUtil } from './error-state-matcher';

import { map, startWith, takeUntil } from 'rxjs/operators';
import { IAgrupador } from 'app/shared/model/agrupador.model';
import { AgrupadorService } from 'app/entities/agrupador/agrupador.service';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

@Component({
  selector: 'jhi-home-uma-groups',
  templateUrl: './home-uma-groups.component.html',
  styleUrls: ['home-uma-groups.component.scss']
})
export class HomeUmaGroupsComponent implements OnInit, OnDestroy, AfterContentInit {
  account: Account | null = null;
  authSubscription?: Subscription;
  subscription?: Subscription;
  private ngUnsubscribeSubject = new Subject();
  secuenciasUma: IAgrupador[] = new Array<IAgrupador>();
  // defaultModuleUrl: SafeUrl = './../../../../content/images/module.png';

  filteredSequencesUmas: any;
  matcher = new ErrorStateMatcherUtil();

  groupUmaForm = this.formbuilder.group({
    tituloAgrupador: [],
    sequenceTitleFormCtrl: new FormControl('', [
      Validators.required
      // Validators.email,
    ]),
    sequenceDescriptionFormCtrl: new FormControl('', [Validators.maxLength(50)]),
    sequenceAreaKnowledgeFormCtrl: [],
    sequenceAcademicGradeFormCtrl: [],
    sequenceTopicFormCtrl: []
  });

  constructor(
    private accountService: AccountService,
    private formbuilder: FormBuilder,
    private agrupadorService: AgrupadorService,
    private eventManager: JhiEventManager
  ) {
    this.filteredSequencesUmas = this.groupUmaForm.get('tituloAgrupador')!.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.descripcion)),
      map(title => (title ? this._filterSequencesByTitle(title) : this.secuenciasUma.slice()))
    );
    // console.error(this.filteredSequencesUmas);
  }

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.subscription = this.agrupadorService.query().subscribe(
          (res: HttpResponse<IAgrupador[]>) => {
            this.secuenciasUma = Array.from(res.body!);
          },
          () => this.onQueryError()
        );
      }
    });
  }

  private _filterSequencesByTitle(value: string): IAgrupador[] {
    const filterValue = value.toLowerCase();
    return this.secuenciasUma.filter((option: IAgrupador) => option.titulo!.toLowerCase().includes(filterValue));
  }

  displayFn(mod: IAgrupador): string {
    return mod && mod.titulo ? mod.titulo : '';
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    this.subscription!.unsubscribe();
    this.ngUnsubscribeSubject.next();
    this.ngUnsubscribeSubject.complete();
  }

  ngAfterContentInit(): void {}

  protected onQueryError(): void {
    console.error('Error');
  }

  searchUmas(): void {
    console.error('Debera buscar agrupadociones/secuencias de UMAs');
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.uma.validations.save' })
    );
  }

  deleteGroup(agrupador: IAgrupador, evt: any): void {
    evt.stopPropagation();
    this.secuenciasUma.splice(this.secuenciasUma.indexOf(agrupador), 1);
    this.subscription = this.filteredSequencesUmas.pipe(takeUntil(this.ngUnsubscribeSubject)).subscribe((res: IAgrupador[]) => {
      console.error('eliminacion subscribe');
      console.error(res);
    });
    this.groupUmaForm.get('tituloAgrupador')!.setValue('');

    this.subscription = this.agrupadorService
      .delete(agrupador.id!)
      .pipe(takeUntil(this.ngUnsubscribeSubject))
      .subscribe(() => {
        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.validationError', {
            message: 'constructorApp.agrupador.deleted',
            type: 'success'
          })
        );
      });
  }
}
