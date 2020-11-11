import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
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

  private allowFreeTextAddCoworkerRol = false;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  colaboradorCtrl = new FormControl();

  @Input()
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
      map((coworker: string | null) => (coworker ? this._filterColaborador(coworker) : this.listFullRolesColaboradores.slice()))
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

  public setColaboradores(colaboradoresList: IRolesColaboradores[]): void {
    this.listRolesColaboradores = [...colaboradoresList];
  }

  // COMIENZA CODE DE CHIPS ANGULAR MATERIAL

  addColaborador(event: MatChipInputEvent): void {
    if (!this.allowFreeTextAddCoworkerRol) {
      // only allowed to select from the filtered autocomplete list
      console.error('allowFreeTextAddCoworkerRol is false');
      return;
    }
    // Add our module type
    const value = event.value;
    if ((value || '').trim()) {
      this.selectCoworkerRoleByName(value.trim());
    }

    this.resetInputs();
  }

  private resetInputs(): void {
    // clear input element
    this.colaboradorInput.nativeElement.value = '';
    // clear control value and trigger colaboradorCtrl.valueChanges event
    this.colaboradorCtrl.setValue(null);
  }

  removeColaborador(coworker: IRolesColaboradores): void {
    const index = this.listRolesColaboradores.indexOf(coworker);

    if (index >= 0) {
      this.listRolesColaboradores.splice(index, 1);
    }
  }

  selectedColaborador(event: MatAutocompleteSelectedEvent): void {
    if (
      this.listRolesColaboradores.filter(rol => {
        return rol.id === event.option.value.id;
      }).length === 0
    ) {
      this.listRolesColaboradores.push(event.option.value as IRolesColaboradores); //   viewValue
    }
    this.colaboradorInput.nativeElement.value = '';
    this.colaboradorCtrl.setValue(null);
  }

  private _filterColaborador(value: any): IRolesColaboradores[] {
    if (typeof value === 'string') {
      // return this.listFullRolesColaboradores.filter(rc => rc.colaborador!.nombres!.toLowerCase().includes(value.toLowerCase())); //  { rc.id === value.id && rc.nombre === value.nombre });
      return this.filterCowerkerRoles(this.listFullRolesColaboradores, value);
    }
    return this.listFullRolesColaboradores.filter(rc => {
      rc.id === value.id && rc.colaborador === value.colaborador;
    });
  }

  private filterCowerkerRoles(coworkersRoleList: IRolesColaboradores[], coworkerValue: String): IRolesColaboradores[] {
    let filteredCoworkersRolList: IRolesColaboradores[] = [];
    const typedValue = coworkerValue.toLowerCase();
    const coworkersRoleMatchingCoworkerRolName = coworkersRoleList.filter(t => t.colaborador!.nombres!.toLowerCase().includes(typedValue));
    if (coworkersRoleMatchingCoworkerRolName.length || this.allowFreeTextAddCoworkerRol) {
      filteredCoworkersRolList = coworkersRoleMatchingCoworkerRolName;
      this.allowFreeTextAddCoworkerRol = true;
    } else {
      filteredCoworkersRolList = coworkersRoleMatchingCoworkerRolName;
    }

    return filteredCoworkersRolList;
  }

  private selectCoworkerRoleByName(coworkerRole: string): void {
    const foundCoworker = this.listFullRolesColaboradores.filter(t => t.colaborador!.nombres!.toLowerCase() === coworkerRole.toLowerCase());
    if (foundCoworker.length) {
      this.listRolesColaboradores.push(foundCoworker[0]);
      this.allowFreeTextAddCoworkerRol = true;
    } else {
      this.allowFreeTextAddCoworkerRol = false;
      console.error('Colaborador y Rol inexistente, no puede agregarse.');
    }
  }

  // TERMINA CODE DE CHIPS ANGULAR MATERIAL
}
