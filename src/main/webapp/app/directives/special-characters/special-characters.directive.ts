import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[jhiSpecialCharacters]'
})
export class SpecialCharactersDirective {
  regexStr = '^[a-zA-Z0-9_ºª!"$%&/()=?¿;:_><,.+ \'¡@“”≠~-]*$';
  @Input() isAlphaNumeric?: boolean;

  constructor(private el: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(event: any): boolean {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent): void {
    this.validateFields(event);
  }

  validateFields(event: any): void {
    setTimeout(() => {
      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
      event.preventDefault();
    }, 100);
  }
}
