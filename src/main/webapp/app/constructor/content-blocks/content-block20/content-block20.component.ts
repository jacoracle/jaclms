import { Component, OnInit, Input } from '@angular/core';
import { BloquesCurso } from 'app/shared/model/bloques-curso.model';

@Component({
  selector: 'jhi-content-block20',
  templateUrl: './content-block20.component.html',
  styleUrls: ['./content-block20.component.scss']
})
export class ContentBlock20Component implements OnInit {
  @Input() contentBlock?: BloquesCurso;

  constructor() {}

  ngOnInit(): void {}
}
