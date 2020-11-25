import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'jhi-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent {
  selectedContentBlockIndex = 0;
  @Output()
  selectedContentChange = new EventEmitter();

  constructor() {}

  selectedContentMethod(selectedContentBlockIndex: number): void {
    this.selectedContentBlockIndex = selectedContentBlockIndex;
    this.selectedContentChange.emit(this.selectedContentBlockIndex);
  }
}
