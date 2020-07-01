import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IBloqueComponentes } from 'app/shared/model/bloque-componentes.model';
import { ITipoBloqueComponentes } from 'app/shared/model/tipo-bloque-componentes.model';

@Injectable({
  providedIn: 'root'
})
export class ContentBlocksService {
  selectedBlock = new Subject<ITipoBloqueComponentes>();
  contentBlocks = new Subject<IBloqueComponentes[]>();
  indexBlockToDelete = new Subject<number>();
  templates = new Subject<ITipoBloqueComponentes[]>();
  selectedBlockIndex = new Subject<number>();

  constructor() {}

  getSelectedBlock(): Observable<ITipoBloqueComponentes> {
    return this.selectedBlock.asObservable();
  }

  setSelectedBlock(selectedBlock: IBloqueComponentes): void {
    this.selectedBlock.next(selectedBlock);
  }

  getContentBlocks(): Observable<IBloqueComponentes[]> {
    return this.contentBlocks.asObservable();
  }

  setContentBlocks(contentBlocks: IBloqueComponentes[]): void {
    this.contentBlocks.next(contentBlocks);
  }

  getIndexBlockToDelete(): Observable<number> {
    return this.indexBlockToDelete.asObservable();
  }

  setIndexBlockToDelete(index: number): void {
    this.indexBlockToDelete.next(index);
  }

  getTempaltes(): Observable<ITipoBloqueComponentes[]> {
    return this.templates.asObservable();
  }

  setTemplates(templates: IBloqueComponentes[]): void {
    this.templates.next(templates);
  }

  getSelectedBlockIndex(): Observable<number> {
    return this.selectedBlockIndex;
  }

  setSelectedBlockIndex(index: number): void {
    this.selectedBlockIndex.next(index);
  }
}
