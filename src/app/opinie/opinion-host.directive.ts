import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[opinionHost]' })
export class OpinionHostDirective {
  constructor(public viewContainerRef : ViewContainerRef) { }
}

@Directive({ selector: '[opinionCreatorHost]' })
export class OpinionCreatorHostDirective {
  constructor(public viewContainerRef : ViewContainerRef) { }
}

@Directive({ selector: '[ratingsHost]' })
export class RatingsHostDirective {
  constructor(public viewContainerRef : ViewContainerRef) { }
}

@Directive({ selector: '[reviewHost]' })
export class ReviewHostDirective {
  constructor(public viewContainerRef : ViewContainerRef) { }
}

@Directive({ selector: '[opinionRatingHost]' })
export class OpinionRatingHostDirective {
  constructor(public viewContainerRef : ViewContainerRef) { }
}
