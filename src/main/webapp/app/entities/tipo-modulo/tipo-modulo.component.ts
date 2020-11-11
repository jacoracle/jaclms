import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ITipoModulo } from 'app/shared/model/tipo-modulo.model';
import { TipoModuloService } from './tipo-modulo.service';

// chips anguar material

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'jhi-tipos-modulo',
  templateUrl: './tipo-modulo.component.html',
  styleUrls: ['./tipo-modulo.component.scss']
})
export class TypeModuleComponent implements OnInit {
  // chips angular material

  private allowFreeTextAddModuleType = false;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  moduleTypeCtrl = new FormControl();

  @Input()
  listTiposModuloTest: ITipoModulo[] = [];
  listFullTiposModuloTest: ITipoModulo[] = [];
  filteredTiposModulo: Observable<ITipoModulo[]>;

  @ViewChild('moduleTypeInput', { static: false }) moduleTypeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete!: MatAutocomplete;
  // termina chips angular material

  selectedModuleTypes: ITipoModulo[] = [];
  moduleTypes: ITipoModulo[] = [];
  foundTypesModule: ITipoModulo[] = [];

  constructor(protected tipoModuloService: TipoModuloService) {
    this.tipoModuloService
      .query()
      .pipe(
        map((res: HttpResponse<ITipoModulo[]>) => {
          return res.body ? res.body : [];
        })
      )
      .subscribe((resBody: ITipoModulo[]) => {
        this.listFullTiposModuloTest = resBody;
      });

    this.filteredTiposModulo = this.moduleTypeCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filterTipo(fruit) : this.listFullTiposModuloTest.slice()))
    );
  }

  ngOnInit(): void {
    this.tipoModuloService
      .query()
      .pipe(
        map((res: HttpResponse<ITipoModulo[]>) => {
          return res.body ? res.body : [];
        })
      )
      .subscribe((resBody: ITipoModulo[]) => {
        this.moduleTypes = resBody;
      });
  }

  public getModuleTypes(): ITipoModulo[] {
    return this.listTiposModuloTest; // this.selectedModuleTypes;
  }

  // PARA CHIPS ANGULAR MATERIAL

  // COMIENZA CODE DE CHIPS ANGULAR MATERIAL

  addTipo(event: MatChipInputEvent): void {
    if (!this.allowFreeTextAddModuleType) {
      // only allowed to select from the filtered autocomplete list
      console.error('allowFreeTextAddModuleType is false');
      return;
    }

    // Add our module type
    const value = event.value;
    if ((value || '').trim()) {
      this.selectModuleTypeByName(value.trim());
    }

    this.resetInputs();
  }

  private resetInputs(): void {
    // clear input element
    this.moduleTypeInput.nativeElement.value = '';
    // clear control value and trigger moduleTypeCtrl.valueChanges event
    this.moduleTypeCtrl.setValue(null);
  }

  removeTipo(moduleType: ITipoModulo): void {
    const index = this.listTiposModuloTest.indexOf(moduleType);

    if (index >= 0) {
      this.listTiposModuloTest.splice(index, 1);
    }
  }

  selectedTipo(event: MatAutocompleteSelectedEvent): void {
    if (
      this.listTiposModuloTest.filter(tipo => {
        return tipo.id === event.option.value.id;
      }).length === 0
    ) {
      this.listTiposModuloTest.push(event.option.value as ITipoModulo);
    }
    this.moduleTypeInput.nativeElement.value = '';
    this.moduleTypeCtrl.setValue(null);
  }

  private _filterTipo(value: any): ITipoModulo[] {
    if (typeof value === 'string') {
      //  return this.listFullTiposModuloTest.filter(tipos => tipos.nombre!.toLowerCase().includes(value.toLowerCase()));
      return this.filterModuleTypes(this.listFullTiposModuloTest, value);
    }
    return this.listFullTiposModuloTest.filter(tipos => {
      tipos.id === value.id && tipos.nombre === value.nombre;
    });
  }

  private filterModuleTypes(moduleTypesList: ITipoModulo[], moduleTypeValue: String): ITipoModulo[] {
    let filteredModuleTypesList: ITipoModulo[] = [];
    const typedValue = moduleTypeValue.toLowerCase();
    const moduleTypesMatchingModuleTypeName = moduleTypesList.filter(t => t.nombre!.toLowerCase().includes(typedValue));
    if (moduleTypesMatchingModuleTypeName.length || this.allowFreeTextAddModuleType) {
      filteredModuleTypesList = moduleTypesMatchingModuleTypeName;
      this.allowFreeTextAddModuleType = true;
    } else {
      filteredModuleTypesList = moduleTypesMatchingModuleTypeName;
    }

    return filteredModuleTypesList;
  }

  private selectModuleTypeByName(tipoModulo: string): void {
    const foundTipoModulo = this.listFullTiposModuloTest.filter(t => t.nombre!.toLocaleLowerCase() === tipoModulo.toLowerCase());
    if (foundTipoModulo.length) {
      this.listTiposModuloTest.push(foundTipoModulo[0]);
      this.allowFreeTextAddModuleType = true;
    } else {
      this.allowFreeTextAddModuleType = false;
      console.error('Tipo Módulo inexistente, no puede agregarse.');
    }
  }

  // TERMINA CODE DE CHIPS ANGULAR MATERIAL
}
