import { Directive, ElementRef, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[notifyTitle]'
})
export class TitleDirective implements AfterContentInit{

  constructor(private elem: ElementRef) {
  }

  ngAfterContentInit(){
    let titleLength = this.elem.nativeElement.innerText.length
    let title = this.elem.nativeElement.innerText.substr(0, 100);
    if (titleLength > 100) {
      this.elem.nativeElement.innerText = `${title} ...`;
    }
  }
}
