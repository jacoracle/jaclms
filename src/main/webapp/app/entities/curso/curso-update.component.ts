import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICurso, Curso } from 'app/shared/model/curso.model';
import { CursoService } from './curso.service';
import { IModalidad } from 'app/shared/model/modalidad.model';
import { ModalidadService } from 'app/entities/modalidad/modalidad.service';
import { IVersion } from 'app/shared/model/version.model';
import { VersionService } from 'app/entities/version/version.service';
import { ICategoria } from 'app/shared/model/categoria.model';
import { CategoriaService } from 'app/entities/categoria/categoria.service';
import { IAsignatura } from 'app/shared/model/asignatura.model';
import { AsignaturaService } from 'app/entities/asignatura/asignatura.service';
import { INumeroGrado } from 'app/shared/model/numero-grado.model';
import { NumeroGradoService } from 'app/entities/numero-grado/numero-grado.service';
import { IGradoAcademico } from 'app/shared/model/grado-academico.model';
import { GradoAcademicoService } from 'app/entities/grado-academico/grado-academico.service';
import { CourseConfigurationService } from 'app/services/course-configuration.service';
import { FileUploadService } from 'app/services/file-upload.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FichaUpdateComponent } from '../ficha/ficha-update.component';

import { JhiEventManager, JhiAlertService, JhiAlert, JhiEventWithContent } from 'ng-jhipster';

type SelectableEntity = IModalidad | IVersion | ICategoria | IAsignatura | INumeroGrado | IGradoAcademico;

@Component({
  selector: 'jhi-curso-update',
  templateUrl: './curso-update.component.html'
})
export class CursoUpdateComponent implements OnInit {
  selectedTabIndex = 0;
  isSaving = false;
  modalidads: IModalidad[] = [];
  versions: IVersion[] = [];
  categorias: ICategoria[] = [];
  asignaturas: IAsignatura[] = [];
  gradoAcademicos: IGradoAcademico[] = [];
  numerogrados: INumeroGrado[] = [];
  fechaCreacionDp: any;
  fechaCreacionSysDp: any;
  fechaPublicacionDp: any;
  fechaPublicacionSysDp: any;
  maxiCoverSize = 5000000;
  allowedFileTypes: any = ['image/jpg', 'image/png', 'image/jpeg'];
  showUploadButton = false;
  alerts: JhiAlert[] = [];
  @ViewChild('fileInput', { static: false }) fileInput: any;

  changeImage = false;
  selectedFiles = FileList;
  currentFileUpload: File = this.selectedFiles[0];
  coverPath: SafeUrl = '';
  portadaUrl = '';

  editForm = this.fb.group({
    id: [],
    titulo: [],
    descripcion: [],
    modoDistribucion: [],
    etapaEditorial: [],
    fechaCreacion: [],
    fechaCreacionSys: [],
    fechaPublicacion: [],
    fechaPublicacionSys: [],
    numeroEdicion: [],
    versionStr: [],
    palabraClave: [],
    resumenContenido: [],
    clave: [],
    estatus: [],
    portadaUrl: [],
    modalidad: [],
    version: [],
    categoria: [],
    asignatura: [],
    gradoAcademico: [],
    numeroGrado: []
  });
  subscription: any;
  @ViewChild(FichaUpdateComponent, { static: false }) fichaUpdateComponent!: FichaUpdateComponent;

  constructor(
    protected cursoService: CursoService,
    protected modalidadService: ModalidadService,
    protected versionService: VersionService,
    protected categoriaService: CategoriaService,
    protected asignaturaService: AsignaturaService,
    protected numeroGradoService: NumeroGradoService,
    protected gradoAcademicoService: GradoAcademicoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private courseConfigurationService: CourseConfigurationService,
    private fileUploadService: FileUploadService,
    private sanitizer: DomSanitizer,
    private alertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private router: Router
  ) {
    this.subscription = this.courseConfigurationService.getSelectedTab().subscribe(selectedTab => {
      if (selectedTab) {
        this.selectedTabIndex = selectedTab.selectedTab;
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ curso }) => {
      this.updateForm(curso);

      this.modalidadService
        .query()
        .pipe(
          map((res: HttpResponse<IModalidad[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IModalidad[]) => (this.modalidads = resBody));

      this.versionService
        .query()
        .pipe(
          map((res: HttpResponse<IVersion[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IVersion[]) => (this.versions = resBody));

      this.categoriaService
        .query()
        .pipe(
          map((res: HttpResponse<ICategoria[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICategoria[]) => (this.categorias = resBody));

      this.asignaturaService
        .query()
        .pipe(
          map((res: HttpResponse<IAsignatura[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAsignatura[]) => (this.asignaturas = resBody));

      this.gradoAcademicoService
        .query()
        .pipe(
          map((res: HttpResponse<IGradoAcademico[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: INumeroGrado[]) => (this.gradoAcademicos = resBody));
    });
  }

  updateForm(curso: ICurso): void {
    if (curso === undefined) {
      return;
    }
    this.editForm.patchValue({
      id: curso.id,
      titulo: curso.titulo,
      descripcion: curso.descripcion,
      modoDistribucion: curso.modoDistribucion,
      etapaEditorial: curso.etapaEditorial,
      fechaCreacion: curso.fechaCreacion,
      fechaCreacionSys: curso.fechaCreacionSys,
      fechaPublicacion: curso.fechaPublicacion,
      fechaPublicacionSys: curso.fechaPublicacionSys,
      numeroEdicion: curso.numeroEdicion,
      versionStr: curso.versionStr,
      palabraClave: curso.palabraClave,
      resumenContenido: curso.resumenContenido,
      clave: curso.clave,
      estatus: curso.estatus,
      portadaUrl: curso.portadaUrl,
      modalidad: curso.modalidad,
      version: curso.version,
      categoria: curso.categoria,
      asignatura: curso.asignatura,
      numeroGrado: curso.numeroGrado
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.courseConfigurationService.clearTabErrors();
    this.isSaving = true;
    const curso = this.createFromForm();
    const ficha = this.fichaUpdateComponent.createFromForm();
    const cursoFicha = {
      curso,
      ficha
    };
    this.makeValid('fechaCreacion');
    this.makeValid('fechaPublicacion');
    if (curso.titulo === '' || curso.titulo === null || curso.titulo === undefined) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.formError' })
      );
      this.makeInvalid('titulo');
      this.courseConfigurationService.setErrorTabIndex(0);
    }
    if (curso.titulo !== null && curso.titulo !== undefined && curso.titulo.length > 80) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.formError' })
      );
      this.makeInvalid('titulo');
      this.courseConfigurationService.setErrorTabIndex(0);
    }
    if (curso.resumenContenido !== null && curso.resumenContenido !== undefined && curso.resumenContenido.length > 2000) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.formError' })
      );
      this.makeInvalid('resumenContenido');
      this.courseConfigurationService.setErrorTabIndex(0);
    }
    if (curso.descripcion !== null && curso.descripcion !== undefined && curso.descripcion.length > 255) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.formError' })
      );
      this.makeInvalid('descripcion');
      this.courseConfigurationService.setErrorTabIndex(0);
    }
    if (curso.numeroEdicion !== null && curso.numeroEdicion !== undefined && curso.numeroEdicion.length > 30) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.formError' })
      );
      this.makeInvalid('numeroEdicion');
      this.courseConfigurationService.setErrorTabIndex(1);
    }
    if (curso.versionStr !== null && curso.versionStr !== undefined && curso.versionStr.length > 30) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.formError' })
      );
      this.makeInvalid('versionStr');
      this.courseConfigurationService.setErrorTabIndex(1);
    }
    if (curso.clave !== null && curso.clave !== undefined && curso.clave.length > 45) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.formError' })
      );
      this.makeInvalid('clave');
      this.courseConfigurationService.setErrorTabIndex(1);
    }
    if (curso.palabraClave !== null && curso.palabraClave !== undefined && curso.palabraClave.length > 80) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.formError' })
      );
      this.makeInvalid('palabraClave');
      this.courseConfigurationService.setErrorTabIndex(1);
    }
    if (curso.fechaCreacion && curso.fechaPublicacion && curso.fechaCreacion.isAfter(curso.fechaPublicacion)) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.dates' })
      );
      this.makeInvalid('fechaCreacion');
      this.makeInvalid('fechaPublicacion');
      this.courseConfigurationService.setErrorTabIndex(1);
    }
    curso.portadaUrl = this.portadaUrl;
    if (this.editForm.valid) {
      if (curso.id !== undefined && curso.id !== null) {
        this.subscribeToSaveResponse(this.cursoService.update(cursoFicha));
      } else {
        this.subscribeToSaveResponse(this.cursoService.create(cursoFicha, this.selectedFiles[0]));
      }
    }
  }

  private createFromForm(): ICurso {
    return {
      ...new Curso(),
      id: this.editForm.get(['id'])!.value,
      titulo: this.editForm.get(['titulo'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      modoDistribucion: this.editForm.get(['modoDistribucion'])!.value,
      etapaEditorial: this.editForm.get(['etapaEditorial'])!.value,
      fechaCreacion: this.editForm.get(['fechaCreacion'])!.value,
      fechaCreacionSys: this.editForm.get(['fechaCreacionSys'])!.value,
      fechaPublicacion: this.editForm.get(['fechaPublicacion'])!.value,
      fechaPublicacionSys: this.editForm.get(['fechaPublicacionSys'])!.value,
      numeroEdicion: this.editForm.get(['numeroEdicion'])!.value,
      versionStr: this.editForm.get(['versionStr'])!.value,
      palabraClave: this.editForm.get(['palabraClave'])!.value,
      resumenContenido: this.editForm.get(['resumenContenido'])!.value,
      clave: this.editForm.get(['clave'])!.value,
      estatus: this.editForm.get(['estatus'])!.value,
      portadaUrl: this.editForm.get(['portadaUrl'])!.value,
      modalidad: this.editForm.get(['modalidad'])!.value,
      version: this.editForm.get(['version'])!.value,
      categoria: this.editForm.get(['categoria'])!.value,
      asignatura: this.editForm.get(['asignatura'])!.value,
      numeroGrado: this.editForm.get(['numeroGrado'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICurso>>): void {
    result.subscribe(
      res => this.onSaveSuccess(res),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(res: any): void {
    this.router.navigate(['/constructor-layout', res.body.curso.id, 'course']);
    this.isSaving = false;
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  changeGradoAcademico(e: any): void {
    this.gradoAcademicoService.find(e.target.selectedIndex + 1).subscribe(res => {
      if (res.body && res.body.numeroGrados) this.numerogrados = res.body.numeroGrados;
    });
  }

  change(): void {
    this.changeImage = true;
  }

  /*
   * Función que sube la imagen seleccionada como portada.
   */
  upload(id: number): void {
    this.currentFileUpload = this.selectedFiles[0];
    this.fileUploadService.pushFileStorage(this.currentFileUpload, id, 'course').subscribe(event => {
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
      this.coverPath = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    });
  }

  /*
   * Función para mantener en memoria la imagen de portada seleccionada.
   */
  selectFile(event: any): void {
    if (event.target.files.length) {
      // Validar tamaño máximo
      if (event.target.files[0].size > this.maxiCoverSize) {
        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.validationError', {
            message: 'constructorApp.curso.validations.fileSize'
          })
        );
        return;
        // Validar tipo de archivo
      } else if (!this.allowedFileTypes.includes(event.target.files[0].type)) {
        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.validationError', {
            message: 'constructorApp.curso.validations.fileType'
          })
        );
        return;
      } else {
        this.selectedFiles = event.target.files;
        this.showUploadButton = true;
        /* Pruebas */
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e: any): void => {
          // called once readAsDataURL is completed
          this.coverPath = e.target!['result'];
          // this.url = event.target.result;
        };
        /* Pruebas */
        // this.upload(event);
      }
    }
  }

  deteleCover(): void {
    /*
    this.fileUploadService.deleteFile(this.portadaUrl).subscribe(() => {
      this.coverPath = '';
      this.portadaUrl = '';
    });
    */
    this.coverPath = '';
    this.portadaUrl = '';
    this.selectedFiles = FileList;
    this.fileInput.nativeElement.value = '';
  }

  isValid(controlName: string): boolean {
    return this.editForm.controls[controlName].status === 'VALID';
  }

  makeInvalid(controlName: string): void {
    this.editForm.controls[controlName].setErrors(new Error());
  }

  makeValid(controlName: string): void {
    this.editForm.controls[controlName].setErrors(null);
  }
}
