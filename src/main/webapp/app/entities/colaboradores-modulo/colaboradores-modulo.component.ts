import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IRolesColaboradores } from 'app/shared/model/roles-colaboraderes.model';
import { RolesColaboradoresService } from '../roles-colaboradores/roles-colaboradores.service';

// imports Angular Material Chips
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'jhi-colaboradores-modulo',
  templateUrl: './colaboradores-modulo.component.html',
  styleUrls: ['./colaboradores-modulo.component.scss']
})
export class ColaboradoresModuleComponent implements OnInit {
  // Chips Angular Material

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  moduleTypeCtrl = new FormControl();

  listTiposModuloTest: IRolesColaboradores[] = [];
  listFullTiposModuloTest: IRolesColaboradores[] = [];
  filteredTiposModulo: Observable<IRolesColaboradores[]>;

  @ViewChild('moduleTypeInput', { static: false }) moduleTypeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete!: MatAutocomplete;

  // Termina Chips Angular Material

  selectedColaboradors: IRolesColaboradores[] = [];
  rolesColaboradores: IRolesColaboradores[] = [];
  subscription: any;
  foundColaboradors: IRolesColaboradores[] = [];
  @ViewChild('inputstring', { static: false }) searchElement: ElementRef | undefined;

  constructor(protected rolesColaboradoresService: RolesColaboradoresService) {
    this.rolesColaboradoresService
      .query()
      .pipe(
        map((res: HttpResponse<IRolesColaboradores[]>) => {
          return res.body ? res.body : [];
        })
      )
      .subscribe((resBody: IRolesColaboradores[]) => {
        this.listFullTiposModuloTest = resBody;
      });

    this.filteredTiposModulo = this.moduleTypeCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filterTipo(fruit) : this.listFullTiposModuloTest.slice()))
    );
    console.error(this.filteredTiposModulo);
  }

  ngOnInit(): void {
    this.rolesColaboradoresService
      .query()
      .pipe(
        map((res: HttpResponse<IRolesColaboradores[]>) => {
          return res.body ? res.body : [];
        })
      )
      .subscribe((resBody: IRolesColaboradores[]) => {
        this.rolesColaboradores = resBody;
      });
  }

  public getColaboradores(): IRolesColaboradores[] {
    return this.listTiposModuloTest; //  this.selectedColaboradors;
  }

  removeTag(index: number): void {
    this.selectedColaboradors.splice(index, 1);
    setTimeout(() => {
      if (this.searchElement) this.searchElement.nativeElement.focus();
    }, 0);
  }

  addTag(index: number, rolesColaboradores: IRolesColaboradores): void {
    this.selectedColaboradors.push(rolesColaboradores);
    setTimeout(() => {
      if (this.searchElement) {
        this.searchElement.nativeElement.focus();
        this.foundColaboradors.splice(index, 1);
        this.removeResults();
      }
    }, 0);
  }

  search(value: string): void {
    this.foundColaboradors = [];
    if (value !== '') this.foundColaboradors = this.searchColaborador(value);
  }

  removeResults(): void {
    setTimeout(() => {
      if (this.searchElement) {
        this.searchElement.nativeElement.value = '';
        this.foundColaboradors = [];
      }
    }, 10);
  }

  searchColaborador(value: string): Array<IRolesColaboradores> {
    value = value.toLocaleLowerCase();
    const results: Array<IRolesColaboradores> = [];
    for (let i = 0; i < this.rolesColaboradores.length; i++) {
      let colaboradorName = '';
      colaboradorName += this.rolesColaboradores[i].colaborador!.nombres ? this.rolesColaboradores[i].colaborador!.nombres + ' ' : '';
      colaboradorName += this.rolesColaboradores[i].colaborador!.apellido1 ? this.rolesColaboradores[i].colaborador!.apellido1 + ' ' : '';
      colaboradorName += this.rolesColaboradores[i].colaborador!.apellido2 ? this.rolesColaboradores[i].colaborador!.apellido2 + ' ' : '';
      colaboradorName += this.rolesColaboradores[i].rolColaborador!.descripcion;
      colaboradorName = colaboradorName.toLowerCase();
      colaboradorName = this.removeTildes(colaboradorName);
      value = this.removeTildes(value);
      if (colaboradorName.search(value) !== -1 && this.findInArray(this.selectedColaboradors, this.rolesColaboradores[i].id) === -1) {
        results.push(this.rolesColaboradores[i]);
      }
    }
    return results;
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

  removeTildes(word: string): string {
    const tildes = [
      ['á', 'a'],
      ['é', 'e'],
      ['í', 'i'],
      ['ó', 'o'],
      ['ú', 'u']
    ];
    for (let i = 0; i < tildes.length; i++) {
      word = word.replace(tildes[i][0], tildes[i][1]);
    }
    return word;
  }

  // PARA CHIPS ANGULAR MATERIAL

  // COMIENZA CODE DE CHIPS ANGULAR MATERIAL

  addTipo(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if (value) {
      this.listTiposModuloTest.push(value as IRolesColaboradores);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.moduleTypeCtrl.setValue(null);
  }

  removeTipo(fruit: IRolesColaboradores): void {
    const index = this.listTiposModuloTest.indexOf(fruit);

    if (index >= 0) {
      this.listTiposModuloTest.splice(index, 1);
    }
  }

  selectedTipo(event: MatAutocompleteSelectedEvent): void {
    this.listTiposModuloTest.push(event.option.value as IRolesColaboradores); //   viewValue
    this.moduleTypeInput.nativeElement.value = '';
    this.moduleTypeCtrl.setValue(null);
  }

  private _filterTipo(value: any): IRolesColaboradores[] {
    // const filterValue = value.toLowerCase();
    // let objTipo: ITipoModulo = value as ITipoModulo;
    // objTipo.nombre = objTipo.nombre?.toLocaleLowerCase();
    if (typeof value === 'string') {
      return this.listFullTiposModuloTest.filter(tipos => tipos.colaborador!.nombres!.toLowerCase().includes(value.toLowerCase())); //  { fruit.id === value.id && fruit.nombre === value.nombre });
    }
    return this.listFullTiposModuloTest.filter(tipos => {
      tipos.id === value.id && tipos.colaborador === value.colaborador;
    });
  }

  // TERMINA CODE DE CHIPS ANGULAR MATERIAL
}
