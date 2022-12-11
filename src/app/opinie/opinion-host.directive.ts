import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[opinionHost]'
})
export class OpinionHostDirective {
  constructor(public viewContainerRef : ViewContainerRef) { }

}
