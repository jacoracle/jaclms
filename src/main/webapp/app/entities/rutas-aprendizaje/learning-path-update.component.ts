import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AccountService } from 'app/core/auth/account.service';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { ErrorStateMatcherLearning } from 'app/home-learning/error-state-matcher-learning';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators'; //  startWith
import { Account } from 'app/core/user/account.model';
import { HttpResponse } from '@angular/common/http';
import { INumeroGrado } from 'app/shared/model/numero-grado.model';
import { IGradoAcademico } from 'app/shared/model/grado-academico.model';
import { GradoAcademicoService } from '../grado-academico/grado-academico.service';
import { IRutaModel, RutaModel } from '../../shared/model/ruta-aprendizaje.model';
import { ColaboradoresModuleComponent } from '../colaborador/colaboradores-modulo.component';
import { TopicModuleComponent } from '../tema/temas-modulo.component';
import { FileUploadService } from 'app/services/file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaAprendizajeService } from './ruta-aprendizaje.service';

@Component({
  selector: 'jhi-learing-path-update',
  templateUrl: './learning-path-update.component.html',
  styleUrls: ['./learning-path-update.component.scss']
})
export class LearningPathUpdateComponent implements OnInit, OnDestroy {
  @ViewChild(ColaboradoresModuleComponent, { static: false }) colaboradoresComponent!: ColaboradoresModuleComponent;
  @ViewChild(TopicModuleComponent, { static: false }) temasModuloComponent!: TopicModuleComponent;

  idPath!: number;
  learningPathObj!: IRutaModel;
  account: Account | null = null;
  subscription?: Subscription;
  private ngUnsubscribeSubject = new Subject();

  learningForm = this.formbuilder.group({
    titlePath: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    descriptionPath: new FormControl('', [Validators.maxLength(50)]),
    managePartners: ['add'],
    nivelAcademico: [],
    gradosCtrl: []
  });

  matcher = new ErrorStateMatcherLearning();

  // modulos: any = [];
  defaultPathUrl: SafeUrl = './../../../content/images/cover_upload.png';
  pathCover: SafeUrl = '';
  maxCoverSize = 5000000;
  allowedFileTypes: string[] = ['image/jpg', 'image/png', 'image/jpeg'];
  changeImage = false;
  selectedFiles = FileList;
  currentFileUpload: File = this.selectedFiles[0];
  portadaUrl = '';
  showUploadButton = false;

  nivelAcademicoList: IGradoAcademico[] = [];
  numerosGradoList: INumeroGrado[] = [];
  selectedGradeModule: any;
  selectedGradesModule: INumeroGrado[] = [];
  actualSelectedGradesModule: number[] = [];

  // chips
  visible = true;
  selectable = true;
  removable = true;

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private gradoAcademicoService: GradoAcademicoService,
    private fileUploadService: FileUploadService,
    private rutaService: RutaAprendizajeService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private formbuilder: FormBuilder,
    private eventManager: JhiEventManager,
    private aroute: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) {
    aroute.params.subscribe(val => {
      this.idPath = val.id; // console.error('Recibido: ', val.id);
    });
  }

  ngOnInit(): void {
    this.subscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.loadAcademicGrades();
        if (this.idPath) {
          this.getLearningPathData();
        }
      }
    });
  }

  loadAcademicGrades(): void {
    this.subscription = this.gradoAcademicoService
      .query()
      .pipe(
        map((res: HttpResponse<IGradoAcademico[]>) => {
          return res.body ? res.body : [];
        })
      )
      .subscribe((resBody: INumeroGrado[]) => (this.nivelAcademicoList = [...resBody]));
  }

  getLearningPathData(): void {
    this.subscription = this.rutaService
      .find(this.idPath)
      .pipe(takeUntil(this.ngUnsubscribeSubject))
      .subscribe(response => {
        this.learningPathObj = response.body as IRutaModel;
        this.mapDataToForm();
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

  // ACADEMIC GRADE

  // when academic grade selection change, must be loaded grades number
  changeGradoAcademico(e: any): void {
    this.loadAcademicGradesByAcademicLevel(e.value.id + 1);
  }

  loadAcademicGradesByAcademicLevel(level: number): void {
    this.gradoAcademicoService.find(level).subscribe(res => {
      if (res.body && res.body.numeroGrados) {
        this.numerosGradoList = [...res.body.numeroGrados];
        this.updatingGradesSelected(null, false);
      }
    });
  }

  addGradoToList(): void {
    this.selectedGradesModule.push(this.selectedGradeModule);
  }

  remove(grado: INumeroGrado): void {
    const index = this.selectedGradesModule.indexOf(grado);

    if (index >= 0) {
      this.selectedGradesModule.splice(index, 1);
      this.actualSelectedGradesModule.splice(index, 1);
      this.updatingGradesSelected(null, false);
    }
  }

  setSelectedGrades(evt: any): void {
    this.updatingGradesSelected(evt, true);
  }

  /**
   * update grades arrays to keep selected grades
   * @param evt null or event if change option academic grades
   * @param isChangeAcademicGrade flag to know if it's change event
   */
  updatingGradesSelected(evt: any, isChangeAcademicGrade: boolean): void {
    let objectsGradesSelectedIds: INumeroGrado[];
    let idAcademicGradeToAdd = -1;
    if (isChangeAcademicGrade) {
      //  get objects from selected ids using event value and
      objectsGradesSelectedIds = this.numerosGradoList.filter(el => {
        return evt.value.some((f: number) => {
          return f === el.id;
        });
      });
    } else {
      //  get objects from selected ids using general array to grade numbers selected globally
      objectsGradesSelectedIds = this.numerosGradoList.filter(el => {
        return this.selectedGradesModule.some((f: INumeroGrado) => {
          return f.id === el.id && f.descripcion === el.descripcion;
        });
      });
    }

    if (objectsGradesSelectedIds.length) {
      idAcademicGradeToAdd = objectsGradesSelectedIds[0].gradoAcademico!.id!;
    }

    const selectedGradesId = objectsGradesSelectedIds.map(function(obj): number {
      return obj.id!;
    });
    //  set ids selected to array property on component
    this.actualSelectedGradesModule = [...selectedGradesId];

    if (idAcademicGradeToAdd > 0) {
      const selectedGrades = this.verifyList(idAcademicGradeToAdd, objectsGradesSelectedIds);
      this.selectedGradesModule = [...selectedGrades];
      this.learningForm.get('nivelAcademico')!.disable();
    } else {
      this.selectedGradesModule = [];
      this.learningForm.get('nivelAcademico')!.enable();
    }
  }

  /**
   * Verify an element to add on full list selected to delete unmarked items from multiple select
   * @param academicGradeIdToAdd
   * @param objectsGradesSelectedIds
   */
  verifyList(academicGradeIdToAdd: number, objectsGradesSelectedIds: INumeroGrado[]): INumeroGrado[] {
    const onlySelected = this.selectedGradesModule.filter(ag => {
      return ag.gradoAcademico!.id !== academicGradeIdToAdd;
    });
    return [...onlySelected, ...objectsGradesSelectedIds];
  }

  // portada

  /*
   * mantener en memoria la imagen de portada seleccionada.
   */
  selectFile(event: any): void {
    if (event.target.files.length) {
      // Validar tamaño máximo
      if (event.target.files[0].size > this.maxCoverSize) {
        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.validationError', {
            message: 'constructorApp.ruta.validations.fileSize'
          })
        );
        return;
        // Validar tipo de archivo
      } else if (!this.allowedFileTypes.includes(event.target.files[0].type)) {
        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.validationError', {
            message: 'constructorApp.ruta.validations.fileType'
          })
        );
        return;
      } else {
        this.selectedFiles = event.target.files;
        this.showUploadButton = true;
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e: any): void => {
          // called once readAsDataURL is completed
          this.pathCover = e.target!['result'];
        };
      }
    }
  }

  deletePathCover(): void {
    this.pathCover = '';
    this.portadaUrl = '';
    this.selectedFiles = FileList;
    // this.fileInputPathCover.nativeElement.value = '';
  }

  /*
   * subir la imagen seleccionada como portada.
   */
  upload(id: number): void {
    this.currentFileUpload = this.selectedFiles[0];
    this.fileUploadService.pushFileStorage(this.currentFileUpload, id, 'path').subscribe(event => {
      this.portadaUrl = event.path;
      if (event) {
        this.getCover(event.path);
        this.showUploadButton = false;
      }
    });
  }

  getCover(path: string): void {
    this.fileUploadService.getImageFile(path).subscribe(data => {
      const objectUrl = URL.createObjectURL(data.body);
      this.pathCover = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    });
  }

  saveLearningPathToConfigure(): void {
    const request: IRutaModel = this.createRequestFromForm();
    if (!request.titulo!.trim()) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.formError' })
      );
      this.makeInvalid('titlePath');
      return;
    }

    if (!this.selectedFiles[0]) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.formError' })
      );
      // hacer algo aquí para la portada
      return;
    }

    if (request.id) {
      // console.error('##### update');
      this.subscribeToSaveResponse(this.rutaService.update(request));
    } else {
      // console.error('##### save');
      this.subscribeToSaveResponse(this.rutaService.create(request, this.selectedFiles[0]));
    }
  }

  private createRequestFromForm(): IRutaModel {
    return {
      ...new RutaModel(),
      id: this.learningForm.get(['id']) ? this.learningForm.get(['id'])!.value : undefined,
      titulo: this.learningForm.get(['titlePath'])!.value,
      descripcion: this.learningForm.get(['descriptionPath'])!.value,
      portadaUrl: this.portadaUrl,
      temas: this.temasModuloComponent.getTopics(),
      rolesColaboradores: this.colaboradoresComponent.getColaboradores(),
      nivelAcademico: this.selectedGradesModule
    };
  }

  private mapDataToForm(): void {
    if (this.learningPathObj) {
      this.selectedGradesModule = [...this.learningPathObj.nivelAcademico!];
      this.loadLevelsAndFormData(this.learningPathObj.nivelAcademico![0].gradoAcademico!.id!);
    }
  }

  private loadLevelsAndFormData = async (level: number): Promise<void> => {
    const response = await this.gradoAcademicoService.find(level).toPromise();
    this.numerosGradoList = [...response.body!.numeroGrados!];
    this.learningForm.get('gradosCtrl')!.setValue(this.selectedGradesModule.map(s => s.id));
    this.colaboradoresComponent.setColaboradores(this.learningPathObj.rolesColaboradores!);
    this.temasModuloComponent.setTopics(this.learningPathObj.temas!);
    this.subscription = this.fileUploadService.getImageFile(this.learningPathObj.portadaUrl!).subscribe(data => {
      const imagePath = URL.createObjectURL(data.body);
      this.pathCover = this.domSanitizer.bypassSecurityTrustUrl(imagePath);
    });
    this.learningForm.patchValue({
      titlePath: this.learningPathObj.titulo,
      descriptionPath: this.learningPathObj.descripcion,
      managePartners: this.learningPathObj.rolesColaboradores,
      nivelAcademico: this.learningPathObj.nivelAcademico!.length ? this.learningPathObj.nivelAcademico![0].gradoAcademico : []
    });
  };

  getSafeUrl(path: any): SafeUrl {
    let safeUrl: SafeUrl = '';
    if (path) {
      this.fileUploadService.getImageFile(path).subscribe(data => {
        const imagePath = URL.createObjectURL(data.body);
        safeUrl = this.domSanitizer.bypassSecurityTrustUrl(imagePath);
      });
    }
    return safeUrl;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRutaModel>>): void {
    result.subscribe(
      res => this.onSaveSuccess(res),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(res: any): void {
    // this.upload(res.body.id);
    this.router.navigate(['/path-hierarchical', res.body.id]);
  }

  protected onSaveError(): void {
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', {
        message: 'constructorApp.path.validations.saveError',
        type: 'danger'
      })
    );
  }

  makeInvalid(controlName: string): void {
    this.learningForm.controls[controlName].markAsDirty();
    this.learningForm.controls[controlName].markAsTouched();
    // this.learningForm.controls[controlName].setErrors(new Error());
  }

  makeValid(controlName: string): void {
    this.learningForm.controls[controlName].setErrors(null);
  }
}
