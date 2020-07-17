import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ITema } from 'app/shared/model/tema.model';
import { TemaService } from './tema.service';

// imports Angular Material Chips
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'jhi-temas-modulo',
  templateUrl: './temas-modulo.component.html',
  styleUrls: ['./temas-modulo.component.scss']
})
export class TopicModuleComponent implements OnInit {
  // Chips Angular Material

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  themeCtrl = new FormControl();

  listThemes: ITema[] = [];
  listFullThemes: ITema[] = [];
  filteredThemes: Observable<ITema[]>;

  @ViewChild('themeInput', { static: false }) themeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete!: MatAutocomplete;

  // Termina Chips Angular Material

  selectedTopics: ITema[] = [];
  topicsModule: ITema[] = [];
  foundTopics: ITema[] = [];

  @ViewChild('inputstring', { static: false }) searchElement: ElementRef | undefined;

  constructor(protected temaService: TemaService) {
    this.temaService
      .query()
      .pipe(
        map((res: HttpResponse<ITema[]>) => {
          return res.body ? res.body : [];
        })
      )
      .subscribe((resBody: ITema[]) => {
        this.listFullThemes = resBody;
      });

    this.filteredThemes = this.themeCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filterTheme(fruit) : this.listFullThemes.slice()))
    );
    console.error(this.filteredThemes);
  }

  ngOnInit(): void {
    this.temaService
      .query()
      .pipe(
        map((res: HttpResponse<ITema[]>) => {
          return res.body ? res.body : [];
        })
      )
      .subscribe((resBody: ITema[]) => {
        this.topicsModule = resBody;
      });
  }

  public getTopics(): ITema[] {
    return this.listThemes; //  this.selectedTopics;
  }

  // COMIENZA CODE DE CHIPS ANGULAR MATERIAL

  addTheme(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if (value) {
      this.listThemes.push(value as ITema);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.themeCtrl.setValue(null);
  }

  removeTheme(fruit: ITema): void {
    const index = this.listThemes.indexOf(fruit);

    if (index >= 0) {
      this.listThemes.splice(index, 1);
    }
  }

  selectedTheme(event: MatAutocompleteSelectedEvent): void {
    if (!this.listThemes.includes(event.option.value)) {
      this.listThemes.push(event.option.value as ITema); //   viewValue
    }
    this.themeInput.nativeElement.value = '';
    this.themeCtrl.setValue(null);
  }

  private _filterTheme(value: any): ITema[] {
    if (typeof value === 'string') {
      return this.listFullThemes.filter(th => th.nombre!.toLowerCase().includes(value.toLowerCase())); //  { fruit.id === value.id && fruit.nombre === value.nombre });
    }
    return this.listFullThemes.filter(th => {
      th.id === value.id && th.nombre === value.nombre;
    });
  }

  // TERMINA CODE DE CHIPS ANGULAR MATERIAL
}
