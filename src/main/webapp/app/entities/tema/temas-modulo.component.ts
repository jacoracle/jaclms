import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
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

  private allowFreeTextAddModuleTopic = false;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  topicCtrl = new FormControl();

  @Input()
  listThemes: ITema[] = [];
  listFullThemes: ITema[] = [];
  filteredThemes: Observable<ITema[]>;

  @ViewChild('topicInput', { static: false }) topicInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete!: MatAutocomplete;

  // Termina Chips Angular Material

  selectedTopics: ITema[] = [];
  topicsModule: ITema[] = [];
  foundTopics: ITema[] = [];

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

    this.filteredThemes = this.topicCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filterTheme(fruit) : this.listFullThemes.slice()))
    );
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

  public setTopics(topicsList: ITema[]): void {
    this.listThemes = [...topicsList];
  }

  // COMIENZA CODE DE CHIPS ANGULAR MATERIAL

  addTopic(event: MatChipInputEvent): void {
    if (!this.allowFreeTextAddModuleTopic) {
      // only allowed to select from the filtered autocomplete list
      console.error('allowFreeTextAddModuleTopic is false');
      return;
    }

    // Add our topic
    const value = event.value;
    if ((value || '').trim()) {
      this.selectTopicByName(value.trim());
    }

    this.resetInputs();
  }

  private resetInputs(): void {
    // clear input element
    this.topicInput.nativeElement.value = '';
    // clear control value and trigger topicCtrl.valueChanges event
    this.topicCtrl.setValue(null);
  }

  removeTopic(topic: ITema): void {
    const index = this.listThemes.indexOf(topic);

    if (index >= 0) {
      this.listThemes.splice(index, 1);
    }
  }

  selectedTheme(event: MatAutocompleteSelectedEvent): void {
    if (
      this.listThemes.filter(tema => {
        return tema.id === event.option.value.id;
      }).length === 0
    ) {
      this.listThemes.push(event.option.value as ITema); //   viewValue
    }
    this.topicInput.nativeElement.value = '';
    this.topicCtrl.setValue(null);
  }

  private _filterTheme(value: any): ITema[] {
    if (typeof value === 'string') {
      // return this.listFullThemes.filter(th => th.nombre!.toLowerCase().includes(value.toLowerCase()));
      return this.filterTopics(this.listFullThemes, value);
    }
    return this.listFullThemes.filter(th => {
      th.id === value.id && th.nombre === value.nombre;
    });
  }

  private filterTopics(topicsList: ITema[], topicValue: String): ITema[] {
    let filteredTopicsList: ITema[] = [];
    const typedValue = topicValue.toLowerCase();
    const topicsMatchingTopicsName = topicsList.filter(t => t.nombre!.toLowerCase().includes(typedValue));
    if (topicsMatchingTopicsName.length || this.allowFreeTextAddModuleTopic) {
      filteredTopicsList = topicsMatchingTopicsName;
      this.allowFreeTextAddModuleTopic = true;
    } else {
      filteredTopicsList = topicsMatchingTopicsName;
    }

    return filteredTopicsList;
  }

  private selectTopicByName(tipoModulo: string): void {
    const foundTopic = this.listFullThemes.filter(t => t.nombre!.toLocaleLowerCase() === tipoModulo.toLowerCase());
    if (foundTopic.length) {
      this.listThemes.push(foundTopic[0]);
      this.allowFreeTextAddModuleTopic = true;
    } else {
      this.allowFreeTextAddModuleTopic = false;
      console.error('Tema inexistente, no puede agregarse.');
    }
  }

  // TERMINA CODE DE CHIPS ANGULAR MATERIAL
}
