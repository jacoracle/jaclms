import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialCharactersDirective } from './special-characters.directive';

@NgModule({
  declarations: [SpecialCharactersDirective],
  imports: [CommonModule],
  exports: [SpecialCharactersDirective]
})
export class SpecialCharactersModule {}
