import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { IRutaModel } from '../shared/model/ruta-aprendizaje.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

@Component({
  selector: 'jhi-learning-module',
  templateUrl: './home-learning.component.html',
  styleUrls: ['home-learning.component.scss']
})
export class HomeLearningComponent implements OnInit, OnDestroy, AfterContentInit {
  account: Account | null = null;
  subscription?: Subscription;

  // paths list
  pathsList: IRutaModel[] = new Array<IRutaModel>();

  learningForm = this.formbuilder.group({
    titlePath: new FormControl('', [Validators.maxLength(20)]),
    other: new FormControl('', [Validators.required])
  });

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private formbuilder: FormBuilder,
    private eventManager: JhiEventManager
  ) {
    this.fillListDummy();
  }

  ngOnInit(): void {
    this.subscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        //
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterContentInit(): void {}

  displayFn(path: IRutaModel): string {
    return path && path.titulo ? path.titulo : '';
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

  fillListDummy(): void {
    this.pathsList.push({ id: 1, titulo: 'Ruta Uno', descripcion: 'Prueba ruta uno' });
    this.pathsList.push({ id: 2, titulo: 'Ruta Dos', descripcion: 'Prueba ruta dos' });
    this.pathsList.push({ id: 3, titulo: 'Ruta Tres', descripcion: 'Prueba ruta tres' });
    this.pathsList.push({ id: 4, titulo: 'Ruta Cuatro', descripcion: 'Prueba ruta cuatro' });
    this.pathsList.push({ id: 5, titulo: 'Ruta Cinco', descripcion: 'Prueba ruta cinco' });
    this.pathsList.push({ id: 6, titulo: 'Ruta Seís', descripcion: 'Prueba ruta seís' });
  }

  deletePath(path: IRutaModel, evt: any): void {
    evt.stopPropagation();
    console.error('Intentando borrar: ', path);
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', {
        message: 'constructorApp.path.deleted',
        type: 'success'
      })
    );
  }
}
