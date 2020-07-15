import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAsignatura } from 'app/shared/model/asignatura.model';
import { AsignaturaService } from 'app/entities/asignatura/asignatura.service';
import { JhiEventManager, JhiAlert, JhiEventWithContent } from 'ng-jhipster';
import { ModuloService } from './modulo.service';
import { IModulo, Modulo } from 'app/shared/model/modulo.model';
import { ColaboradoresModuleComponent } from '../colaboradores-modulo/colaboradores-modulo.component';
import { TopicModuleComponent } from '../tema/temas-modulo.component';
import { TypeModuleComponent } from '../tipo-modulo/tipo-modulo.component';

@Component({
  selector: 'jhi-modulo-update',
  templateUrl: './modulo-update.component.html',
  styleUrls: ['./modulo-update.component.scss']
})
export class ModuloUpdateComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;

  isSaving = false;
  asignaturas: IAsignatura[] = [];
  fechaCreacionSysDp: any;
  showUploadButton = false;
  alerts: JhiAlert[] = [];

  editForm = this.fb.group({
    id: [],
    tiposModulos: [],
    temas: [],
    titulo: [],
    fechaCreacion: [],
    fechaCreacionSys: [],
    descripcion: [],
    asignatura: [],
    rolesColaboradores: [],
    numeroGrado: [],
    estatus: []
  });
  subscription: any;
  @ViewChild(ColaboradoresModuleComponent, { static: false }) colaboradoresComponent!: ColaboradoresModuleComponent;
  @ViewChild(TopicModuleComponent, { static: false }) temasModuloComponent!: TopicModuleComponent;
  @ViewChild(TypeModuleComponent, { static: false }) tiposModuloComponent!: TypeModuleComponent;

  constructor(
    protected moduloService: ModuloService,
    protected asignaturaService: AsignaturaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private eventManager: JhiEventManager,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ modulo }) => {
      this.updateForm(modulo);

      this.asignaturaService
        .query()
        .pipe(
          map((res: HttpResponse<IAsignatura[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAsignatura[]) => (this.asignaturas = resBody));
    });
  }

  updateForm(modulo: IModulo): void {
    if (modulo === undefined) {
      return;
    }
    this.editForm.patchValue({
      id: modulo.id,
      titulo: modulo.titulo,
      descripcion: modulo.descripcion,
      fechaCreacion: modulo.fechaCreacion,
      fechaCreacionSys: modulo.fechaCreacionSys,
      asignatura: modulo.asignatura,
      temas: modulo.temas,
      tiposModulos: modulo.tiposModulos,
      rolesColaboradores: modulo.rolesColaboradores,
      numeroGrado: modulo.numeroGrado,
      estatus: modulo.estatus
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    console.error('######   SAVE');
    this.isSaving = true;
    const modulo = this.createFromForm();

    this.makeValid('fechaCreacion');
    if (!modulo.titulo) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.formError' })
      );
      this.makeInvalid('titulo');
    }
    if (modulo.titulo && modulo.titulo.length > 80) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.formError' })
      );
      this.makeInvalid('titulo');
    }

    if (modulo.descripcion && modulo.descripcion.length > 255) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.formError' })
      );
      this.makeInvalid('descripcion');
    }

    if (this.editForm.valid) {
      if (modulo.id) {
        // console.error('##########   Deberá actualizar');
        this.subscribeToSaveResponse(this.moduloService.update(modulo));
      } else {
        // console.error('##########   Deberá guardar');
        this.subscribeToSaveResponse(this.moduloService.create(modulo));
      }
    }
  }

  private createFromForm(): IModulo {
    return {
      ...new Modulo(),
      id: this.editForm.get(['id'])!.value,
      titulo: this.editForm.get(['titulo'])!.value,
      tiposModulos: this.tiposModuloComponent.getModuleTypes(),
      descripcion: this.editForm.get(['descripcion'])!.value,
      fechaCreacion: this.editForm.get(['fechaCreacion'])!.value,
      fechaCreacionSys: this.editForm.get(['fechaCreacionSys'])!.value,
      asignatura: this.editForm.get(['asignatura'])!.value,
      temas: this.temasModuloComponent.getTopics(),
      rolesColaboradores: this.colaboradoresComponent.getColaboradores(),
      numeroGrado: this.editForm.get(['numeroGrado'])!.value,
      estatus: this.editForm.get(['estatus'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IModulo>>): void {
    result.subscribe(
      res => this.onSaveSuccess(res),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(res: any): void {
    console.error('########   ID Módulo creado: ', res.body.id);
    this.router.navigate(['/modules-home']); //  (['/constructor-layout', res.body.id]);
    this.isSaving = false;
  }

  protected onSaveError(): void {
    this.isSaving = false;
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

  test(): void {
    console.error(this.colaboradoresComponent.getColaboradores());
  }
}
