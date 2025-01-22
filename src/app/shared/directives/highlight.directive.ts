import { Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: false
})
export class HighlightDirective {

  constructor(private elementRef: ElementRef) {

    this.elementRef.nativeElement,'fontSize', '20px'
   }

}
