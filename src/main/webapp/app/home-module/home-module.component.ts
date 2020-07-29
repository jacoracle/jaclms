import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { ModuloService } from 'app/entities/modulo/modulo.service';
import { IModulo } from 'app/shared/model/modulo.model';

import { HttpResponse } from '@angular/common/http';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'jhi-home-module',
  templateUrl: './home-module.component.html',
  styleUrls: ['home-module.component.scss']
})
export class HomeModuleComponent implements OnInit, OnDestroy, AfterContentInit {
  account: Account | null = null;
  authSubscription?: Subscription;
  modulos: any = [];
  defaultModuleUrl: SafeUrl = './../../../../content/images/module.png';
  showLoader = false;

  constructor(private accountService: AccountService, private loginModalService: LoginModalService, private moduleService: ModuloService) {}

  ngOnInit(): void {
    this.showLoader = true;
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.moduleService.query().subscribe(
          (res: HttpResponse<IModulo[]>) => {
            this.modulos = res.body;
            this.showLoader = false;
          },
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

  protected onQueryError(): void {
    console.error('Error');
  }

  deleteModule(id: number, $event: any): void {
    $event.stopPropagation();
    this.moduleService.delete(id).subscribe(() => {
      this.modulos.splice(this.findElementById(this.modulos, id), 1);
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
