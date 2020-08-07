import { Component, OnInit, ViewChild } from '@angular/core';
// import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { IAsignatura } from 'app/shared/model/asignatura.model';
import { AsignaturaService } from 'app/entities/asignatura/asignatura.service';
import { JhiEventManager, JhiAlert } from 'ng-jhipster';
// import { IModulo, Modulo } from 'app/shared/model/modulo.model';
import { TopicModuleComponent } from '../tema/temas-modulo.component';
import { TypeModuleComponent } from '../tipo-modulo/tipo-modulo.component';
import { IGradoAcademico } from 'app/shared/model/grado-academico.model';
import { INumeroGrado } from 'app/shared/model/numero-grado.model';
import { GradoAcademicoService } from '../grado-academico/grado-academico.service';
import { ColaboradoresModuleComponent } from '../colaborador/colaboradores-modulo.component';
import { MatSelect } from '@angular/material/select';
import { AgrupadorService } from './agrupador-uma.service';

@Component({
  selector: 'jhi-agrupador-uma-update',
  templateUrl: './agrupador-uma-update.component.html',
  styleUrls: ['./agrupador-uma-update.component.scss']
})
export class AgrupadorUmaUpdateComponent implements OnInit {
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
    protected agrupadorService: AgrupadorService,
    protected asignaturaService: AsignaturaService,
    protected gradoAcademicoService: GradoAcademicoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private eventManager: JhiEventManager,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agrupador }) => {
      //   this.updateForm(agrupador);
      console.error(agrupador);
    });
  }

  save(): void {
    this.isSaving = true;
    console.error('Deberá guardar');
  }

  //   private createFromForm(): IModulo {
  //     return {
  //       ...new Modulo(),
  //       id: this.editForm.get(['id'])!.value,
  //       titulo: this.editForm.get(['titulo'])!.value,
  //       tiposModulos: this.tiposModuloComponent.getModuleTypes(),
  //       descripcion: this.editForm.get(['descripcion'])!.value,
  //       fechaCreacionSys: this.editForm.get(['fechaCreacionSys'])!.value,
  //       asignatura: this.editForm.get(['asignatura'])!.value,
  //       temas: this.temasModuloComponent.getTopics(),
  //       rolesColaboradores: this.colaboradoresComponent.getColaboradores(),
  //       numeroGrados: this.selectedGradesModule
  //     };
  //   }
}
