import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { ModuloService } from 'app/entities/modulo/modulo.service';
import { IModulo } from 'app/shared/model/modulo.model';

import { HttpResponse } from '@angular/common/http';
import { SafeUrl } from '@angular/platform-browser';
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
  modulos: any = [];
  defaultModuleUrl: SafeUrl = './../../../../content/images/module.png';

  filteredTopicOpts: any; // : Observable<IModulo[]>;
  filteredTypeOpts: any;
  filteredSubjectOpts: any;
  filteredRoleOpts: any;

  matcher = new ErrorStateMatcherUtil();

  learningForm = this.formbuilder.group({
    sessionTopic: [],
    sessionSubject: [],
    sessionType: [],
    sessionDescriptionFormCtrl: [],
    sessionTitleFormCtrl: new FormControl('', [
      Validators.required
      // Validators.email,
    ])
  });

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private formbuilder: FormBuilder,
    private moduleService: ModuloService
  ) {}

  ngOnInit(): void {
    this.filteredTopicOpts = this.learningForm.get('sessionTopic')!.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.descripcion)),
      map(name => (name ? this._filter(name) : this.modulos.slice()))
    );

    this.filteredTypeOpts = this.learningForm.get('sessionType')!.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.descripcion)),
      map(name => (name ? this._filter(name) : this.modulos.slice()))
    );

    this.filteredSubjectOpts = this.learningForm.get('sessionSubject')!.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.descripcion)),
      map(name => (name ? this._filter_(name) : this.modulos.slice()))
    );

    /*
    this.filteredRoleOpts = this.learningForm.get('sessionTopic')!.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.descripcion),
      map(name => name ? this._filter(name) : this.modulos.slice())
    );
    */

    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.moduleService.query().subscribe(
          (res: HttpResponse<IModulo[]>) => {
            this.modulos = res.body;
          },
          () => this.onQueryError()
        );
      }
    });
  }

  private _filter(value: string): IModulo[] {
    const filterValue = value.toLowerCase();
    return this.modulos.filter((option: IModulo) => option.descripcion!.toLowerCase().includes(filterValue));
  }

  private _filter_(value: string): IModulo[] {
    const filterValue = value.toLowerCase();
    return this.modulos.filter((option: IModulo) => option.descripcion!.toLowerCase().includes(filterValue));
  }

  displayFn(mod: IModulo): string {
    return mod && mod.descripcion ? mod.descripcion : '';
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
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

  previewModule(id: number, $event: any): void {
    $event.stopPropagation();
    console.error('####     Debería mostrar el Preview del Módulo');
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
