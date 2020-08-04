import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAsignatura } from 'app/shared/model/asignatura.model';
import { AsignaturaService } from 'app/entities/asignatura/asignatura.service';
import { JhiEventManager, JhiAlert, JhiEventWithContent } from 'ng-jhipster';
import { ModuloService } from './modulo.service';
import { IModulo, Modulo } from 'app/shared/model/modulo.model';
import { TopicModuleComponent } from '../tema/temas-modulo.component';
import { TypeModuleComponent } from '../tipo-modulo/tipo-modulo.component';
import { IGradoAcademico } from 'app/shared/model/grado-academico.model';
import { INumeroGrado } from 'app/shared/model/numero-grado.model';
import { GradoAcademicoService } from '../grado-academico/grado-academico.service';
import { ColaboradoresModuleComponent } from '../colaborador/colaboradores-modulo.component';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'jhi-modulo-update',
  templateUrl: './modulo-update.component.html',
  styleUrls: ['./modulo-update.component.scss']
})
export class ModuloUpdateComponent implements OnInit {
  firstClick = false;
  gradoAcademicos: IGradoAcademico[] = [];
  numerogrados: INumeroGrado[] = [];
  selectedGradeModule: any;
  selectedGradesModule: INumeroGrado[] = [];
  actualSelectedGradesModule: number[] = [];

  gradosCtrl = new FormControl();
  // actualSelectedGradesModule: INumeroGrado[] = [];

  // chips
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
    descripcion: new FormControl('', [
      Validators.maxLength(50)
      // Validators.email,
    ]),
    asignatura: [],
    rolesColaboradores: [],
    gradoAcademico: [],
    numeroGrados: [],
    estatus: []
  });
  subscription: any;
  @ViewChild(ColaboradoresModuleComponent, { static: false }) colaboradoresComponent!: ColaboradoresModuleComponent;
  @ViewChild(TopicModuleComponent, { static: false }) temasModuloComponent!: TopicModuleComponent;
  @ViewChild(TypeModuleComponent, { static: false }) tiposModuloComponent!: TypeModuleComponent;
  @ViewChild('inputGrades', { static: false }) inputGradesSelected!: MatSelect;

  constructor(
    protected moduloService: ModuloService,
    protected asignaturaService: AsignaturaService,
    protected gradoAcademicoService: GradoAcademicoService,
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

  updateForm(modulo: IModulo): void {
    if (modulo === undefined) {
      return;
    }
    this.editForm.patchValue({
      id: modulo.id,
      titulo: modulo.titulo,
      descripcion: modulo.descripcion,
      fechaCreacionSys: modulo.fechaCreacionSys,
      asignatura: modulo.asignatura,
      temas: modulo.temas,
      tiposModulos: modulo.tiposModulos,
      rolesColaboradores: modulo.rolesColaboradores,
      numeroGrados: modulo.numeroGrados
    });
  }

  save(): void {
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
      this.firstClick = true;
      if (modulo.id) {
        // console.error('##########   Deberá actualizar: ', modulo);
        this.subscribeToSaveResponse(this.moduloService.update(modulo));
      } else {
        // console.error('##########   Deberá guardar: ', modulo);
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
      fechaCreacionSys: this.editForm.get(['fechaCreacionSys'])!.value,
      asignatura: this.editForm.get(['asignatura'])!.value,
      temas: this.temasModuloComponent.getTopics(),
      rolesColaboradores: this.colaboradoresComponent.getColaboradores(),
      numeroGrados: this.selectedGradesModule
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IModulo>>): void {
    result.subscribe(
      res => this.onSaveSuccess(res),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(res: any): void {
    this.router.navigate(['/constructor-layout', res.body.modulo.id, 'module']);
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

  // when academic grade selection change, must be loaded grades number
  changeGradoAcademico(e: any): void {
    this.gradoAcademicoService.find(e.target.selectedIndex + 1).subscribe(res => {
      if (res.body && res.body.numeroGrados) {
        this.numerogrados = res.body.numeroGrados;
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
      objectsGradesSelectedIds = this.numerogrados.filter(el => {
        return evt.value.some((f: number) => {
          return f === el.id;
        });
      });
    } else {
      //  get objects from selected ids using general array to grade numbers selected globally
      objectsGradesSelectedIds = this.numerogrados.filter(el => {
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
      this.editForm.get('gradoAcademico')!.disable();
    } else {
      this.editForm.get('gradoAcademico')!.enable();
    }
  }

  /**
   * Verify element to add on ful list selected to delete unmarked items from multiple select
   * @param academicGradeIdToAdd
   * @param objectsGradesSelectedIds
   */
  verifyList(academicGradeIdToAdd: number, objectsGradesSelectedIds: INumeroGrado[]): INumeroGrado[] {
    const onlySelected = this.selectedGradesModule.filter(ag => {
      return ag.gradoAcademico!.id !== academicGradeIdToAdd;
    });
    return [...onlySelected, ...objectsGradesSelectedIds];
  }
}
