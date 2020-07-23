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
  colaboradorCtrl = new FormControl();

  listRolesColaboradores: IRolesColaboradores[] = [];
  listFullRolesColaboradores: IRolesColaboradores[] = [];
  filteredRolesColaboradores: Observable<IRolesColaboradores[]>;

  @ViewChild('colaboradorInput', { static: false }) colaboradorInput!: ElementRef<HTMLInputElement>;
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
        this.listFullRolesColaboradores = resBody;
      });

    this.filteredRolesColaboradores = this.colaboradorCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filterColaborador(fruit) : this.listFullRolesColaboradores.slice()))
    );
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
    return this.listRolesColaboradores; //  this.selectedColaboradors;
  }

  // COMIENZA CODE DE CHIPS ANGULAR MATERIAL

  addColaborador(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if (value) {
      this.listRolesColaboradores.push(value as IRolesColaboradores);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.colaboradorCtrl.setValue(null);
  }

  removeColaborador(fruit: IRolesColaboradores): void {
    const index = this.listRolesColaboradores.indexOf(fruit);

    if (index >= 0) {
      this.listRolesColaboradores.splice(index, 1);
    }
  }

  selectedColaborador(event: MatAutocompleteSelectedEvent): void {
    if (!this.listRolesColaboradores.includes(event.option.value)) {
      this.listRolesColaboradores.push(event.option.value as IRolesColaboradores); //   viewValue
    }
    this.colaboradorInput.nativeElement.value = '';
    this.colaboradorCtrl.setValue(null);
  }

  private _filterColaborador(value: any): IRolesColaboradores[] {
    if (typeof value === 'string') {
      return this.listFullRolesColaboradores.filter(rc => rc.colaborador!.nombres!.toLowerCase().includes(value.toLowerCase())); //  { fruit.id === value.id && fruit.nombre === value.nombre });
    }
    return this.listFullRolesColaboradores.filter(rc => {
      rc.id === value.id && rc.colaborador === value.colaborador;
    });
  }

  // TERMINA CODE DE CHIPS ANGULAR MATERIAL
}
