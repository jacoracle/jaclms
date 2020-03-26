import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import * as moment from 'moment';

import { IFicha, Ficha } from 'app/shared/model/ficha.model';
import { FichaService } from './ficha.service';
import { ICurso } from 'app/shared/model/curso.model';
import { CursoService } from 'app/entities/curso/curso.service';
import { IColaborador } from 'app/shared/model/colaborador.model';
import { ColaboradorService } from 'app/entities/colaborador/colaborador.service';
import { IEditorial } from 'app/shared/model/editorial.model';
import { EditorialService } from 'app/entities/editorial/editorial.service';

type SelectableEntity = ICurso | IColaborador | IEditorial;

@Component({
  selector: 'jhi-ficha-update',
  templateUrl: './ficha-update.component.html'
})
export class FichaUpdateComponent implements OnInit {
  isSaving = false;

  cursos: ICurso[] = [];

  colaboradors: IColaborador[] = [];
  selectedColaboradors: IColaborador[] = [];
  foundColaboradors: IColaborador[] = [];
  @ViewChild('inputstring', { static: false }) searchElement: ElementRef | undefined;

  editorials: IEditorial[] = [];
  fechaCreacionDp: any;

  editForm = this.fb.group({
    id: [],
    descripcion: [],
    fechaCreacion: [],
    curso: [],
    colaboradors: [],
    editorial: []
  });

  constructor(
    protected fichaService: FichaService,
    protected cursoService: CursoService,
    protected colaboradorService: ColaboradorService,
    protected editorialService: EditorialService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ficha }) => {
      this.updateForm(ficha);

      this.cursoService
        .query({ filter: 'ficha-is-null' })
        .pipe(
          map((res: HttpResponse<ICurso[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICurso[]) => {
          if (!ficha || !ficha.curso || !ficha.curso.id) {
            this.cursos = resBody;
          } else {
            this.cursoService
              .find(ficha.curso.id)
              .pipe(
                map((subRes: HttpResponse<ICurso>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICurso[]) => {
                this.cursos = concatRes;
              });
          }
        });

      this.colaboradorService
        .query()
        .pipe(
          map((res: HttpResponse<IColaborador[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IColaborador[]) => (this.colaboradors = resBody));

      this.editorialService
        .query()
        .pipe(
          map((res: HttpResponse<IEditorial[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IEditorial[]) => (this.editorials = resBody));
    });
  }

  updateForm(ficha: IFicha): void {
    if (!ficha) return;
    this.editForm.patchValue({
      id: ficha.id,
      descripcion: ficha.descripcion,
      fechaCreacion: ficha.fechaCreacion,
      curso: ficha.curso,
      colaboradors: ficha.colaboradors,
      editorial: ficha.editorial
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ficha = this.createFromForm();
    if (ficha.id !== undefined) {
      this.subscribeToSaveResponse(this.fichaService.update(ficha));
    } else {
      this.subscribeToSaveResponse(this.fichaService.create(ficha));
    }
  }

  public createFromForm(): IFicha {
    return {
      ...new Ficha(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      fechaCreacion: this.editForm.get(['fechaCreacion'])!.value,
      curso: this.editForm.get(['curso'])!.value,
      colaboradors: this.selectedColaboradors,
      editorial: this.editForm.get(['editorial'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFicha>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IColaborador[], option: IColaborador): IColaborador {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }

  addTag(index: number, colaborador: IColaborador): void {
    this.selectedColaboradors.push(colaborador);
    setTimeout(() => {
      if (this.searchElement) this.searchElement.nativeElement.focus();
    }, 0);
    this.foundColaboradors.splice(index, 1);
  }

  searchColaborador(value: string): Array<any> {
    value = value.toLocaleLowerCase();
    const results: Array<any> = [];
    for (let i = 0; i < this.colaboradors.length; i++) {
      const colaboradorName = (
        this.colaboradors[i].nombres +
        ' ' +
        this.colaboradors[i].apellido1 +
        this.colaboradors[i].apellido2 +
        this.colaboradors[i].rolColaborador
      ).toLowerCase();
      if (colaboradorName.search(value) !== -1 && this.findInArray(this.selectedColaboradors, this.colaboradors[i].id) === -1) {
        results.push(this.colaboradors[i]);
      }
    }
    return results;
  }

  removeTag(index: number): void {
    this.selectedColaboradors.splice(index, 1);
    setTimeout(() => {
      if (this.searchElement) this.searchElement.nativeElement.focus();
    }, 0);
  }

  findInArray(array: Array<any>, id: number | undefined): number {
    let index = -1;
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  search(value: string): void {
    this.foundColaboradors = [];
    if (value !== '') this.foundColaboradors = this.searchColaborador(value);
  }
}
