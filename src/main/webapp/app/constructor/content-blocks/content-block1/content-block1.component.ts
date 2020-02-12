import { Component } from '@angular/core';

@Component({
  selector: 'jhi-content-block1',
  templateUrl: './content-block1.component.html',
  styleUrls: ['./content-block1.component.scss']
})
export class ContentBlock1Component {
  imgSrc = './../../../../content/images/img3.png';

  constructor() {}

  editText(): void {
    alert('Editar texto');
  }

  editImage(): void {
    alert('Editar imagen');
  }
}
