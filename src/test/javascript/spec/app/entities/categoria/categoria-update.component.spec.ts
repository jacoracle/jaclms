import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ConstructorTestModule } from '../../../test.module';
import { CategoriaUpdateComponent } from 'app/entities/categoria/categoria-update.component';
import { CategoriaService } from 'app/entities/categoria/categoria.service';
import { Categoria } from 'app/shared/model/categoria.model';

describe('Component Tests', () => {
  describe('Categoria Management Update Component', () => {
    let comp: CategoriaUpdateComponent;
    let fixture: ComponentFixture<CategoriaUpdateComponent>;
    let service: CategoriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConstructorTestModule],
        declarations: [CategoriaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CategoriaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoriaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategoriaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Categoria(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Categoria();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
