import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  moduleTypeCtrl = new FormControl();

  listTiposModuloTest: ITipoModulo[] = [];
  listFullTiposModuloTest: ITipoModulo[] = [];
  filteredTiposModulo: Observable<ITipoModulo[]>;

  @ViewChild('moduleTypeInput', { static: false }) moduleTypeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete!: MatAutocomplete;
  // termina chips angular material

  selectedModuleTypes: ITipoModulo[] = [];
  moduleTypes: ITipoModulo[] = [];
  foundTypesModule: ITipoModulo[] = [];

  @ViewChild('inputstring', { static: false }) searchElement: ElementRef | undefined;

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
    console.error(this.filteredTiposModulo);
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
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if (value) {
      this.listTiposModuloTest.push(value as ITipoModulo);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.moduleTypeCtrl.setValue(null);
  }

  removeTipo(fruit: ITipoModulo): void {
    const index = this.listTiposModuloTest.indexOf(fruit);

    if (index >= 0) {
      this.listTiposModuloTest.splice(index, 1);
    }
  }

  selectedTipo(event: MatAutocompleteSelectedEvent): void {
    if (!this.listTiposModuloTest.includes(event.option.value)) {
      this.listTiposModuloTest.push(event.option.value as ITipoModulo); //   viewValue
    }
    this.moduleTypeInput.nativeElement.value = '';
    this.moduleTypeCtrl.setValue(null);
  }

  private _filterTipo(value: any): ITipoModulo[] {
    // const filterValue = value.toLowerCase();
    // let objTipo: ITipoModulo = value as ITipoModulo;
    // objTipo.nombre = objTipo.nombre?.toLocaleLowerCase();
    if (typeof value === 'string') {
      return this.listFullTiposModuloTest.filter(tipos => tipos.nombre!.toLowerCase().includes(value.toLowerCase())); //  { fruit.id === value.id && fruit.nombre === value.nombre });
    }
    return this.listFullTiposModuloTest.filter(tipos => {
      tipos.id === value.id && tipos.nombre === value.nombre;
    });
  }

  // TERMINA CODE DE CHIPS ANGULAR MATERIAL
}
