import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'jhi-learning-path-hierarchical-add-level',
  templateUrl: './learning-path-hierarchical-add-level.component.html',
  styleUrls: ['./learning-path-hierarchical-add-level.component.scss']
})
export class LearningPathHierarchicalAddLevelComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<LearningPathHierarchicalAddLevelComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
export interface DialogData {
  newLevelName: string;
}
