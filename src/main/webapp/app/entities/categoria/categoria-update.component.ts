import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICategoria, Categoria } from 'app/shared/model/categoria.model';
import { CategoriaService } from './categoria.service';

@Component({
  selector: 'jhi-categoria-update',
  templateUrl: './categoria-update.component.html'
})
export class CategoriaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descripcion: []
  });

  constructor(protected categoriaService: CategoriaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categoria }) => {
      this.updateForm(categoria);
    });
  }

  updateForm(categoria: ICategoria): void {
    this.editForm.patchValue({
      id: categoria.id,
      descripcion: categoria.descripcion
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const categoria = this.createFromForm();
    if (categoria.id !== undefined) {
      this.subscribeToSaveResponse(this.categoriaService.update(categoria));
    } else {
      this.subscribeToSaveResponse(this.categoriaService.create(categoria));
    }
  }

  private createFromForm(): ICategoria {
    return {
      ...new Categoria(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoria>>): void {
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
}
