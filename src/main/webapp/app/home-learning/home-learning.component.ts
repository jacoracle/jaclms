import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { IRutaModel } from '../shared/model/ruta-aprendizaje.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { RutaAprendizajeService } from '../entities/rutas-aprendizaje/ruta-aprendizaje.service';
import { HttpResponse } from '@angular/common/http';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { FileUploadService } from 'app/services/file-upload.service';

@Component({
  selector: 'jhi-learning-module',
  templateUrl: './home-learning.component.html',
  styleUrls: ['home-learning.component.scss']
})
export class HomeLearningComponent implements OnInit, OnDestroy, AfterContentInit {
  account: Account | null = null;
  subscription?: Subscription;
  private ngUnsubscribeSubject = new Subject();

  // paths list
  pathsList: IRutaModel[] = new Array<IRutaModel>();
  pathsOriginList: IRutaModel[] = new Array<IRutaModel>();

  learningForm = this.formbuilder.group({
    titlePath: new FormControl('', [Validators.maxLength(20)]),
    other: new FormControl('', [Validators.required])
  });

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private pathService: RutaAprendizajeService,
    private formbuilder: FormBuilder,
    private eventManager: JhiEventManager,
    private fileUploadServide: FileUploadService
  ) {
    // this.fillListDummy();
  }

  ngOnInit(): void {
    this.subscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.subscription = this.pathService.query().subscribe(
          (res: HttpResponse<IRutaModel[]>) => {
            this.pathsList = res.body!;
            this.pathsOriginList = this.pathsList;
            this.getCovers();
          },
          () => this.onQueryError()
        );
      }
    });

    this.learningForm
      .get('titlePath')!
      .valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.descripcion)),
        map(title => (title ? this._filterPathsByTitle(title) : this.pathsList.slice()))
      )
      .subscribe((seqs: IRutaModel[]) => {
        this.pathsList = [...this.checkListSequences(seqs)];
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

  private _filterPathsByTitle(value: string): IRutaModel[] {
    const filterValue = value.toLowerCase();
    // return this.pathsList.filter((option: IRutaModel) => option.titulo!.toLowerCase().includes(filterValue));
    return this.pathsOriginList.filter((option: IRutaModel) => option.titulo!.toLowerCase().includes(filterValue));
  }

  displayFn(path: IRutaModel): string {
    return path && path.titulo ? path.titulo : '';
  }

  private checkListSequences(paths: IRutaModel[]): IRutaModel[] {
    if (this.learningForm.get('titlePath')!.value !== '' && paths.length > 0) {
      return paths;
    } /*  else if (this.learningForm.get('titlePath')!.value !== '' && paths.length === 0) {
      return [];
    }*/ else if (
      this.learningForm.get('titlePath')!.value === ''
    ) {
      return this.pathsOriginList;
    } else {
      return [];
    }
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
    this.pathsList.splice(this.pathsList.indexOf(path), 1);
    this.subscription = this.pathService
      .delete(path.id!)
      .pipe(takeUntil(this.ngUnsubscribeSubject))
      .subscribe(() => {
        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.validationError', {
            message: 'constructorApp.path.deleted',
            type: 'success'
          })
        );
      });
  }

  protected onQueryError(): void {
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', {
        message: 'constructorApp.path.validations.error',
        type: 'danger'
      })
    );
  }

  getCovers(): void {
    if (this.pathsList && this.pathsList.length) {
      for (let i = 0; i < this.pathsList.length; i++) {
        if (this.pathsList[i] && this.pathsList[i].portadaUrl && this.pathsList[i].portadaUrl !== '') {
          this.fileUploadServide.getImageFile(this.pathsList[i].portadaUrl!).subscribe(data => {
            if (data.body) {
              this.pathsList[i].safeUrl = this.fileUploadServide.getSafeResourceUrl(data.body);
            }
          });
        }
      }
    }
  }
}
