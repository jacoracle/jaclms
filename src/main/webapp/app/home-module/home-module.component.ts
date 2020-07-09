import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { ModuloService } from 'app/entities/modulo/modulo.service';
import { IModulo } from 'app/shared/model/modulo.model';

import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-home-module',
  templateUrl: './home-module.component.html',
  styleUrls: ['home-module.component.scss']
})
export class HomeModuleComponent implements OnInit, OnDestroy, AfterContentInit {
  account: Account | null = null;
  authSubscription?: Subscription;
  coverPaths = [];
  modulos: any = [];

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private moduleService: ModuloService
  ) // private cursoService: CursoService,
  // private fileUploadService: FileUploadService,
  // private sanitizer: DomSanitizer
  {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.moduleService.query().subscribe(
          (res: HttpResponse<IModulo[]>) => this.onQuerySuccess(res.body),
          () => this.onQueryError()
        );
      }
    });
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

  protected onQuerySuccess(data: IModulo[] | null): void {
    if (data) {
      this.modulos = data;
      for (let i = 0; i < this.modulos.length; i++) {
        this.modulos[i].sanitizedPortadaUrl = '../../../content/images/no_cover.png';
      }
    }
  }

  protected onQueryError(): void {
    console.error('Error');
  }

  deleteCourse(id: number, $event: any): void {
    $event.stopPropagation();
    this.moduleService.delete(id).subscribe(() => {
      this.modulos.splice(this.findElementById(this.modulos, id), 1);
    });
  }

  protected onDeleteSuccess(data: IModulo[] | null): void {
    this.modulos = data ? data : [];
  }

  protected onDeleteError(): void {}

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