import { Component, OnInit, Input } from '@angular/core';
import { BloquesCurso } from 'app/shared/model/bloques-curso.model';

@Component({
  selector: 'jhi-content-block19',
  templateUrl: './content-block19.component.html',
  styleUrls: ['./content-block19.component.scss']
})
export class ContentBlock19Component implements OnInit {
  @Input() contentBlock?: BloquesCurso;

  constructor() {}

  ngOnInit(): void {}
}
