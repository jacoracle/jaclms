import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { ModuloService } from 'app/entities/modulo/modulo.service';
import { IModulo } from 'app/shared/model/modulo.model';

import { HttpResponse } from '@angular/common/http';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { ErrorStateMatcherUtil } from './error-state-matcher';

import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'jhi-home-uma-groups',
  templateUrl: './home-uma-groups.component.html',
  styleUrls: ['home-uma-groups.component.scss']
})
export class HomeUmaGroupsComponent implements OnInit, OnDestroy, AfterContentInit {
  account: Account | null = null;
  authSubscription?: Subscription;
  secuenciasUma: IModulo[] = new Array<IModulo>();
  // defaultModuleUrl: SafeUrl = './../../../../content/images/module.png';

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

  constructor(private accountService: AccountService, private formbuilder: FormBuilder, private agrupadorService: ModuloService) {}

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  ngAfterContentInit(): void {}

  protected onQueryError(): void {
    console.error('Error');
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

  searchUmas(): void {
    console.error('Debera buscar agrupadociones/secuencias de UMAs');
  }
}
